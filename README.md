# Adventures NB

Written in ReactJS and based on create-react-app.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the website in local development mode, opens the local development site in your browser.

Open [https://localhost:3000](https://localhost:3000) to view in the browser.

The page will hot reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the deployment artifacts for production in the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run cfn`

Deploys cloudformation changes to the production environment.
The cloudformation template can be found in the `cloudformation` folder.

This script uses the following arguments:

- `--env`|`-e`: Environment name, defaults to `dev`
- `--region`|`-r`: AWS region to deploy cloudformation into, defaults to `us-east-1`
- `--profile`|`-p`: Configured awscli profile name to use

### `npm run lint`

Runs eslint against JavaScript files in the `src` folder to enforce code standards.
