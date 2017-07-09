var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Box=artifacts.require("./Box.sol")
var buyer=artifacts.require("./buyer.sol")
var toolsupplier=artifacts.require("./ToolSupplier.sol")


module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  deployer.deploy(Box);
  deployer.deploy(buyer);
  deployer.deploy(toolsupplier);
};

