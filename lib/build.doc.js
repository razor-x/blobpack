/**
 * Build Benthos artifacts for AWS Lambda.
 * @function build
 * @param {Object} parameters
 * @param {string} [parameters.pkg=package.json] Path to JSON file with a benthos config key.
 * @param {string} [parameters.tmpRoot=s3] Temporary directory to download artifacts.
 * @param {string} [parameters.configRoot=config] Path where configs are located.
 * @param {string} [parameters.resourcesRoot=resources] Path where resources are located.
 * @param {string} [parameters.distRoot=dist] Path to output artifacts.
 * @param {string} [parameters.logger=console] Console compatible logger.
 * @returns {string[]} Generated artifacts paths.
 */
