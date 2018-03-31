const AWS = require('aws-sdk');
const _ = require('lodash');
const childProcess = require('child_process');
const fs = require('fs');
const minimist = require('minimist');

const cloudfront = new AWS.CloudFront();

// get input arguments
let inputArray = process.argv.slice(2);
const argv = minimist(inputArray);
const options = _.omit(argv, ['_']);

// input validation
function checkArgs(switch_, name, default_, options) {
  if (name in options) {
    return options[name];
  } else if (switch_ in options) {
    return options[switch_];
  } else {
    return default_;
  }
}

let environment = checkArgs('e', 'env', 'dev', options);
let profile = checkArgs('p', 'profile', undefined, options);
let dryrun = ('dryrun' in options && options['dryrun']);

if (environment === 'master') {
  environment = 'prod';
}

if (profile) {
  process.env.AWS_PROFILE = profile
}

// Set S3 location
let s3BucketName = `adventuresnb-${environment}`

// check that build directory exists
let buildPath = 'build';
let runScript = 'npm run build';

if (fs.existsSync(buildPath) && fs.lstatSync(buildPath).isDirectory()) {
  let awsArgs = [
    's3',
    'sync',
    '--delete',
    `${buildPath}/`,
    `s3://${s3BucketName}/`,
  ];

  if (dryrun) { awsArgs.push('--dryrun'); }

  // run aws s3 sync
  console.log('Executing aws s3 sync...');
  console.log(`aws ${awsArgs.join(' ')}`)
  let processOutput = childProcess.spawnSync('aws', awsArgs);

  // display output in console
  console.log(processOutput.stdout.toString());
  console.log(processOutput.stderr.toString());

  // create cloudfront cache invalidation
  cloudfront.listDistributions({}, function(err, data) {
    if (err) {
      console.log(`Failed to get cloudfront distributions: ${err}`, err.stack);
      process.exit(1);
    } else {
      // find item with comment matching env name
      let distribution = data['DistributionList']['Items'].find(function(item) {
        return item['Comment'] === s3BucketName;
      });
      const distribution_id = distribution['Id'];

      // call create-invalidation on returned id
      cloudfront.createInvalidation({
        DistributionId: distribution_id,
        InvalidationBatch: {
          CallerReference: Date.now().toString(),
          Paths: {
            Quantity: 1,
            Items: [
              '/*'
            ]
          }
        }
      }, function(err, data) {
        if (err) {
          console.log(`Failed to create cloudfront invalidation: ${err}`, err.stack);
          process.exit(1);
        } else {
          console.log('Successfully created cloudfront invalidation request');
          console.log('Invalidation request returned data: ' + JSON.stringify(data));
        }
      });
    }
  });
} else {
  console.log(`Build directory does not exist, please run '${runScript}' ` +
    'before deploying.');
  process.exit(1);
}
