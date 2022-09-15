# ![Blobpack](./blobpack.svg) Blobpack

[![npm](https://img.shields.io/npm/v/blobpack.svg)](https://www.npmjs.com/package/blobpack)
[![GitHub Actions](https://github.com/razor-x/blobpack/workflows/main/badge.svg)](https://github.com/razor-x/blobpack/actions)

Packaging [Benthos] configs for [AWS Lambda] was too exciting, now it's acceptably boring.

_If all this still sounds too exciting and you just want to deploy Benthos on AWS Lambda,
jump over to the [Serverless Benthos Project Skeleton] or the [Benthos Plugin Project Skeleton]._

[Benthos]: https://www.benthos.dev/
[AWS Lambda]: https://aws.amazon.com/lambda/
[Serverless Benthos Project Skeleton]: https://github.com/makenew/serverless-benthos
[Benthos Plugin Project Skeleton]: https://github.com/makenew/benthos-plugin

## Description

Benthos on AWS Lambda requires either a single config.yaml file inside its
deployed .zip artifact or the config passed as an environment variable.
Since AWS Lambda limits its environment variable size to 4 KB,
even simple Benthos configs are too large to deploy.

This tool allows you to write and test Benthos configs as you normally would,
i.e., splitting and sharing resources across multiple files.
For each config you want to deploy, Blobpack merges
the selected Benthos YAML files into a single config.yaml and
packages it into a .zip file with Benthos for deployment to AWS Lambda.

This can be used with any tool that can deploy .zip artifacts to AWS Lambda.
Since [Serverless] and the [AWS CDK] are both popular deployment
solutions that support Node.js, this tool is distributed as an npm package.

This package exposes the CLI command blobpack
and its [underlying JavaScript API](http://io.evansosenko.com/blobpack/).

[Serverless]: https://serverless.com/
[AWS CDK]: https://aws.amazon.com/cdk/

## Installation

Add this as a dependency to your project using [npm] with

```
$ npm install --save-dev blobpack
```

[npm]: https://www.npmjs.com/

### Usage

#### Download the Benthos Lambda Archive

In order to create Benthos artifact to deploy to AWS Lambda,
the upstream Benthos lambda archive must be downloaded locally to `tmp`.

To have this happen automatically after `npm install`,
add this to your `package.json`,

```json
{
  "scripts": {
    "postinstall": "blobpack install"
  },
  "blobpack": {
    "name": "benthos-lambda",
    "version": "3.54.1",
    "platform": "linux_amd64",
    "src": "https://github.com/jeffail/benthos/releases/download"
  }
}
```

#### Create Serverless Artifacts

First, add a new build step and ensure it runs before deployment,

```json
{
  "scripts": {
    "blobpack": "blobpack"
  }
}
```

Assuming you want to deploy the below Serverless function,
you will need to generate the `boring.zip` artifact to deploy.

_Tip: you can reuse the same artifact for multiple functions._

```yaml
boring:
  handler: benthos-lambda
  package:
    artifact: dist/boring.zip
    individually: true
    exclude: ['*/**']
    include: []
```

First, add the `artifacts` section to the `blobpack` config.
This will generate a new artifact to `dist/boring.zip` which uses
`config/boring.yaml` and intelligently merges resources in both
`resources/outputs.yaml` and `node_modules/@my-org/blobd/resources/logger.yaml`.

_Tip: any top level keys which are not of type `*_resources` will still be included.
If two files have the same key, the last one wins._

```json
{
  "blobpack": {
    "artifacts": [
      {
        "name": "boring",
        "resources": ["outputs"],
        "node_modules/@my-org/blobd/resources": ["logger"]
      }
    ]
  }
}
```

_Tip: put your common resources in an npm package like @my-org/blobd._

If you only need to package a single config file into the artifact,
you can use this shorthand,

```json
{
  "blobpack": {
    "artifacts": [
      "boring"
    ]
  }
}
```

If you want to merge a common set of resources into every config,
you can use the `include` property,

```json
{
  "blobpack": {
    "include": {
      "resources": ["logger"]
    },
    "artifacts": [
      "boring"
    ]
  }
}
```

### CLI

```

  Usage: blobpack [command] [options]


  Commands:

    install        Download Benthos .zip
    build          Build .zip artifacts
    help           Display help

  Options:

    --version         Output the version number
    --config-path     Path to the JSON file containing the blobpack config
    --tmp-root        Path to a temporary working directory
    --config-root     Path to the directory containing the artifact configs
    --resources-root  Path to the directory all resources are relative to
    --dist-root       Path to the directory to output artifacts

```

## Development and Testing

### Quickstart

```
$ git clone https://github.com/razor-x/blobpack.git
$ cd blobpack
$ nvm install
$ npm install
```

Run the command below in a separate terminal window:

```
$ npm run test:watch
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `npm run`.
View them with

```
$ npm run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:razor-x/blobpack.git
```

[source code]: https://github.com/razor-x/blobpack

### Requirements

You will need [Node.js] with [npm] and a [Node.js debugging] client.

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Install the development dependencies with

```
$ npm install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

### Publishing

Use the [`npm version`][npm-version] command to release a new version.
This will push a new git tag which will trigger a GitHub action.

Publishing may be triggered using on the web
using a [workflow_dispatch on GitHub Actions].

[npm-version]: https://docs.npmjs.com/cli/version
[workflow_dispatch on GitHub Actions]: https://github.com/razor-x/blobpack/actions?query=workflow%3Aversion

## GitHub Actions

_GitHub Actions should already be configured: this section is for reference only._

The following repository secrets must be set on [GitHub Actions]:

- `NPM_TOKEN`: npm token for installing and publishing packages.
- `GH_USER`: The GitHub user's username.
- `GH_TOKEN`: A personal access token for the user.
- `GIT_USER_NAME`: The GitHub user's real name.
- `GIT_USER_EMAIL`: The GitHub user's email.
- `GPG_PRIVATE_KEY`: The GitHub user's [GPG private key].
- `GPG_PASSPHRASE`: The GitHub user's GPG passphrase.

These must be set manually.

[GitHub Actions]: https://github.com/features/actions
[GPG private key]: https://github.com/marketplace/actions/import-gpg#prerequisites

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/razor-x/blobpack/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This npm package is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
