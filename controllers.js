const deploy = (req, res) => {
  const { ref } = req.body
  const master = ref === 'refs/heads/master'
  res.json({ master })
}

const index = (req, res) => {
  res.json('eosui-deployer')
}

module.exports = {
  deploy,
  index,
}
