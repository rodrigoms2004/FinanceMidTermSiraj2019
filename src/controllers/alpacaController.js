const alpacaModel = require('../models/alpacaModel')
const { log } = require('../util/loggerTool')

const alpacaController = {

  asset: async (req, res) => {
    try {
      const asset = req.params.id

      const login = await alpacaModel.authOn()
      const data = await alpacaModel.getAssetInfo(asset, login)

      return res.status(200).send(data)
    } catch(error) {
      log("alpacaController", "error", `Error message ${error}`)
      return res.status(400).send({ message: error })
    }
  }

}

module.exports = alpacaController
