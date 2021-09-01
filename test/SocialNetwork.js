const { assert } = require("chai");

const SocialNetwork = artifacts.require("./SocialNetwork.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

// eslint-disable-next-line no-undef
contract("SocialNetwork", ([deployer, author, tipper]) => {
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

  describe("posts", async () => {
    let result, postCount;
    it("creates posts", async () => {
      result = await socialNetwork.createPost("First Post", { from: author });
      postCount = await socialNetwork.postCount();

      assert.equal(postCount, 1);
      const event = result.logs[0].args;
      console.log(postCount, event);
      assert.equal(event.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(event.content, "First Post", "content is correct");
      assert.equal(event.tipAmount, 0, "tip amount is correct");
      assert.equal(event.author, author, "author is correct");
      //Failure test
      await socialNetwork.createPost("", { from: author }).should.be.rejected;
    });

    // it("lists posts", async () => {});

    // it("allows users to tip posts", async () => {});
  });
});
