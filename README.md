# JavaScript Module Package Skeleton

[![npm](https://img.shields.io/npm/v/@makenew/jsmodule.svg)](https://www.npmjs.com/package/@makenew/jsmodule)
[![Codecov](https://img.shields.io/codecov/c/github/makenew/jsmodule.svg)](https://codecov.io/gh/makenew/jsmodule)
[![CircleCI](https://img.shields.io/circleci/project/github/makenew/jsmodule.svg)](https://circleci.com/gh/makenew/jsmodule)

Package skeleton for an JavaScript module.

## Description

Bootstrap a new JavaScript module in five minutes or less.

### Features

- [Node.js]'s [npm] package structure.
- Fast, reliable, and secure dependency management with [Yarn].
- Next generation JavaScript with [Babel].
- Examples with configurable options and arguments powered by [examplr].
- Linting with the [JavaScript Standard Style] and [JSON Lint].
- Automatically lint on changes with [gulp].
- Futuristic debuggable unit testing with [AVA].
- Code coverage reporting with [Istanbul], [nyc], and [Codecov].
- Continuous testing and automated package publishing with [CircleCI].
- [Keep a CHANGELOG].
- Consistent coding with [EditorConfig].
- Badges from [Shields.io].

[AVA]: https://github.com/avajs/ava
[Babel]: https://babeljs.io/
[CircleCI]: https://circleci.com/
[Codecov]: https://codecov.io/
[EditorConfig]: https://editorconfig.org/
[Istanbul]: https://istanbul.js.org/
[JSON Lint]: https://github.com/zaach/jsonlint
[JavaScript Standard Style]: https://standardjs.com/
[Keep a CHANGELOG]: https://keepachangelog.com/
[Node.js]: https://nodejs.org/
[Shields.io]: https://shields.io/
[examplr]: https://github.com/meltwater/node-examplr
[gulp]: https://gulpjs.com/
[npm]: https://www.npmjs.com/
[nyc]: https://github.com/istanbuljs/nyc
[Yarn]: https://yarnpkg.com/

### Bootstrapping a new project

1. Create an empty (**non-initialized**) repository on GitHub.
2. Clone the master branch of this repository with
   ```
   $ git clone --single-branch git@github.com:makenew/jsmodule.git <new-node-lib>
   $ cd <new-node-lib>
   ```
   Optionally, reset to the latest version with
   ```
   $ git reset --hard <version-tag>
   ```
3. Run
   ```
   $ ./makenew.sh
   ```
   This will replace the boilerplate, delete itself,
   remove the git remote, remove upstream tags,
   and stage changes for commit.
4. Create the required CircleCI environment variables with
   ```
   $ .circleci/envvars.sh
   ```
5. Review, commit, and push the changes to GitHub with
   ```
   $ git diff --cached
   $ git commit -m "Replace makenew boilerplate"
   $ git remote add origin git@github.com:<user>/<new-node-lib>.git
   $ git push -u origin master
   ```
6. Ensure the CircleCI build passes,
   then publish the initial version of the package with
   ```
   $ nvm install
   $ yarn install
   $ npm version patch
   ```

### Updating from this skeleton

If you want to pull in future updates from this skeleton,
you can fetch and merge in changes from this repository.

Add this as a new remote with

```
$ git remote add upstream git@github.com:makenew/jsmodule.git
```

You can then fetch and merge changes with

```
$ git fetch --no-tags upstream
$ git merge upstream/master
```

#### Changelog for this skeleton

Note that `CHANGELOG.md` is just a template for this skeleton.
The actual changes for this project are documented in the commit history
and summarized under [Releases].

[Releases]: https://github.com/makenew/jsmodule/releases

## Installation

Add this as a dependency to your project using [npm] with

```
$ npm install @makenew/jsmodule
```

or using [Yarn] with

```
$ yarn add @makenew/jsmodule
```

[npm]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/

## Development and Testing

### Quickstart

```
$ git clone https://github.com/makenew/jsmodule.git
$ cd jsmodule
$ nvm install
$ yarn install
```

Run each command below in a separate terminal window:

```
$ yarn run lint:watch
$ yarn run test:watch
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `yarn run`.
View them with

```
$ yarn run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:makenew/jsmodule.git
```

[source code]: https://github.com/makenew/jsmodule

### Requirements

You will need [Node.js] with [npm], [Yarn], and a [Node.js debugging] client.

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
$ yarn install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

## CircleCI

_CircleCI should already be configured: this section is for reference only._

The following environment variables must be set on [CircleCI]:

- `NPM_TOKEN`: npm token for installing and publishing packages.
- `CODECOV_TOKEN`: Codecov token for uploading coverage reports (optional).

These may be set manually or by running the script `./circleci/envvars.sh`.

[CircleCI]: https://circleci.com/

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/makenew/jsmodule/fork).
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
