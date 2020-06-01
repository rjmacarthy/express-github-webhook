const sinon = require('sinon')
const { beforeEach, afterEach, describe, it } = require('mocha')
const { expect } = require('chai')
const { createRequest, createResponse } = require('node-mocks-http')
const cp = require('child_process')
const fs = require('fs')

const { index, deploy } = require('../lib/controllers')
const logger = require('../lib/logger')
const utils = require('../lib/utils')

describe('controllers suite', () => {
  let req
  let res
  let exec

  before(() => {
    fs.unlinkSync(logger.logPath)
    fs.rmdirSync(logger.logFolder)
  })

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

  it('can render the index page', async () => {
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

describe('logger', () => {
  it('can init the logger', () => {
    const mkdirSync = sinon.stub(fs, 'mkdirSync')
    const existsSync = sinon.stub(fs, 'existsSync')
    const writeFileSync = sinon.stub(fs, 'writeFileSync')
    logger.init()
    expect(mkdirSync.calledOnce).to.equal(false)
    expect(existsSync.calledOnce).to.equal(false)
    expect(writeFileSync.calledOnce).to.equal(false)
  })
})

describe('utils', () => {
  it('can execute and write a log', () => {
    utils.handler(null, 'test', null)
  })
  
  it('can execute and write an error', () => {
    utils.handler(null, null, 'error')
  })
})