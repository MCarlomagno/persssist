const DFiles = artifacts.require("Persssist");

module.exports = function(_deployer) {
  _deployer.deploy(DFiles); 
};
