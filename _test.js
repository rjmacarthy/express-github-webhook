const sinon = require('sinon')
const { beforeEach, afterEach, describe, it } = require('mocha')
const { expect } = require('chai')
const { createRequest, createResponse } = require('node-mocks-http')
const { index, deploy } = require('./controllers')
const cp = require('child_process')

describe('controllers', () => {
  let req
  let res
  let exec

  beforeEach(() => {
    res = createResponse()
    req = createRequest()
    exec = sinon.stub(cp, 'exec')
    res.sendFile = sinon.spy()
    res.end = sinon.spy()
  })

  afterEach(() => {
    exec.restore()
  })

  it('Can render the index page', async () => {
    index(req, res)
    expect(res.sendFile.calledOnce).to.equal(true)
  })

  it('can deploy something', async () => {
    req.body = { ref: 'refs/head/master' }
    deploy(req, res)
    expect(res.statusCode).to.equal(200)
    expect(res.end.calledOnce).to.equal(true)
    expect(exec.calledOnce).to.equal(true)
  })

  it('will not deploy when branch does not match', async () => {
    req.body = { ref: 'refs/head/staging' }
    deploy(req, res)
    expect(res.end.calledOnce).to.equal(true)
    expect(exec.calledOnce).to.equal(false)
  })
})
