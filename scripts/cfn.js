const cfn = require('cfn');
const minimist = require('minimist');
const _ = require('lodash');

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

var environment = checkArgs('e', 'env', 'dev', options);
var region = checkArgs('r', 'region', 'us-east-1', options);
let profile = checkArgs('p', 'profile', undefined, options);

if (profile) {
  process.env.AWS_PROFILE = profile;
}

var urlPrefix = (environment === 'prod' || environment === 'master') ? '' : `${environment}-`;

// create or update stack
cfn({
  name: `adventuresnb-${environment}`,
  cfParams: {
    Aliases: `${urlPrefix}demo.adventuresnb.ca`
  },
  awsConfig: {
    region: region
  }
}, __dirname + '/cloudformation/cloudfront_s3.yaml')
.then(function() {
  console.log('Stack has been deployed');
});
