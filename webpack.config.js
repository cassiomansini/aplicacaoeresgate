module.exports = function (env) {
  return require(`./webpack.${env.ambiente}.js`)(env)
}