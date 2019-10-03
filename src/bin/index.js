'use strict'

const debug = require('debug')('nodejs:bin:www')
const app = require('../app')
const { serverPort } = require('../config/general')
const port = process.env.PORT || serverPort

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
    debug('Server running')
})


