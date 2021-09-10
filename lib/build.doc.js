/**
 * Build Benthos artifacts for AWS Lambda.
 * @function build
 * @param {Object} parameters
 * @param {string} [parameters.configPath=package.json] Path to JSON file with a blobpack config key.
 * @param {string} [parameters.tmpRoot=tmp] Path to a temporary working directory.
 * @param {string} [parameters.configRoot=config] Path to the directory containing the artifact configs.

 * @param {string} [parameters.resourcesRoot=./] Path to the directory all resources are relative to
 * @param {string} [parameters.distRoot=dist] Path to the directory to output artifacts
 * @param {string} [parameters.logger=console] Console compatible logger.
 * @returns {string[]} Generated artifacts paths.
 */
