'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  BASE_API: '"http://10.110.148.57:8085"',
  NODE_ENV: '"development"',
  ENV_CONFIG: "'dev'"
})
