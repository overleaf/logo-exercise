const assert = require('assert')
const fetch = require('node-fetch')

const app = require('../src/app')

before(function (done) {
  // Zero means to start the test server on a random free port.
  this.testServer = app.listen(0, () => {
    this.testUrl = `http://localhost:${this.testServer.address().port}`
    done()
  })
})

after(function (done) {
  this.testServer.close(done)
})

describe('app', function () {
  it('runs', async function () {
    const response = await fetch(this.testUrl)
    assert(response.ok)
    const body = await response.text()
    assert(/<svg/.test(body))
  })
})
