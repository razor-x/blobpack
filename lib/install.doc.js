/**
 * Download and install a Benthos binary.
 * @function install
 * @param {Object} parameters
 * @param {string} [parameters.configPath=package.json] Path to JSON file with a benthos config key.
 * @param {string} [parameters.tmpRoot=s3] Temporary directory to download artifacts.
 * @param {string} [parameters.logger=console] Console compatible logger.
 * @returns {string} Path to the saved binary.
 */
