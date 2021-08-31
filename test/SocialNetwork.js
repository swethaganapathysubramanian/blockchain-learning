const { assert } = require("chai");

const SocialNetwork = artifacts.require("./SocialNetwork.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("SocialNetwork", (accounts) => {
  let socialNetwork;

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      socialNetwork = await SocialNetwork.deployed();
      const address = await SocialNetwork.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      socialNetwork = await SocialNetwork.deployed();
      const name = await socialNetwork.name();
      assert.equal(name, "Blockchain Test App");
    });
  });
});
