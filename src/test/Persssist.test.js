const Persssist = artifacts.require("Persssist");

contract(Persssist, accounts => {

  let contractInstance;
  const notEmptyString = 'any';
  const zeroSize = 0;
  const negativeSize = -1;
  const notZeroSyze = 1;
  const emptyString = '';

  before(async () => {
    this.contract = await Persssist.deployed()
  })

  it('deployed successfully', async () => {
    const address = await this.contract.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it("fails if type invalid", () => {
    const path = notEmptyString;
    const size = notZeroSyze;
    var type = emptyString;
    const name = notEmptyString;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })
    
    type = null;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })
  });

  it("fails if path invalid", () => {
    var path = emptyString;
    const size = notZeroSyze;
    const type = notEmptyString;
    const name = notEmptyString;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })
    
    path = null;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })
  });

  it("fails if size invalid", () => {
    const path = notEmptyString;
    var size = zeroSize;
    const type = notEmptyString;
    const name = notEmptyString;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })

    size = negativeSize;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })
  });

  it("fails if name invalid", () => {
    const path = notEmptyString;
    const size = notZeroSyze;
    const type = notEmptyString;
    var name = emptyString;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })
    
    name = null;
    this.contract.uploadFile(path, size, type, name)
      .then(result => {
        assert.equal(true, false, "succeeds when upload null type")
      })
      .catch(err => {
          assert.equal(true, true, "fails when upload null type")
      })
  });

  it("uploads a valid file", async () => {

    const countBeforeUpload = await this.contract.fileCount();

    await this.contract.uploadFile('path', 1, 'type', 'name');
    assert.equal(true, true, "succeeds when upload a valid file");

    const countAfterUpload = await this.contract.fileCount();
    assert.equal(Number(countAfterUpload), Number(countBeforeUpload) + 1, "count increased to 1 after upload")

    const lastFile = await this.contract.files(countAfterUpload);
    assert.equal(lastFile.fileName, 'name', "last file has the filename of the previous uploaded file")
    assert.equal(lastFile.filePath, 'path', "last file has the path of the previous uploaded file")
    assert.equal(lastFile.fileSize, 1, "last file has the size of the previous uploaded file")
    assert.equal(lastFile.fileType, 'type', "last file has the type of the previous uploaded file")

  })
});