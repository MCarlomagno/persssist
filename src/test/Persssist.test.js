const Persssist = artifacts.require("Persssist");

contract(Persssist, accounts => {
  let contractInstance;
  it("runs persssist tests", () => {
    assert.equal("test", "test", "run persssist tests")
  });

  it("initializes with the correct values", () => {
    return Persssist.deployed()
      .then(instance => {
        contractInstance = instance;
        return contractInstance.name();
      })
      .then(name => {
        assert.equal(name, "Persssist", "has the correct name");;
      });
  });
});