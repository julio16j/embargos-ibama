#!/usr/bin/env node
var fs = require('fs');
var prependFile = require('prepend-file');

const [,, ...args] = process.argv

let defaultErrorCallback = function(err) { if ( err ) console.log('ERROR: ' + err); };

console.log('\n\n## Configurando Projeto\n')

console.log('Renomeando App.vue\n')
fs.unlinkSync('./src/App.vue', defaultErrorCallback)
fs.rename('./src/_App.vue', './src/App.vue', defaultErrorCallback);

console.log('Renomeando main.js\n')
fs.unlinkSync('./src/main.js', defaultErrorCallback)
fs.rename('./src/_main.js', './src/main.js', defaultErrorCallback);

console.log('Renomeando quasar.js\n')
fs.unlinkSync('./src/quasar.js', defaultErrorCallback)
fs.rename('./src/_quasar.js', './src/quasar.js', defaultErrorCallback);

console.log('Renomeando .router/index.js')
fs.unlinkSync('./src/router/index.js', defaultErrorCallback)
fs.rename('./src/router/_index.js', './src/router/index.js', defaultErrorCallback);

console.log('Renomeando quasar.styl\n')
fs.unlinkSync('./src/styles/quasar.styl', defaultErrorCallback)
fs.rename('./src/styles/_quasar.styl', './src/styles/quasar.styl', defaultErrorCallback);

console.log('Renomeando quasar.variables.styl\n')
fs.unlinkSync('./src/styles/quasar.variables.styl', defaultErrorCallback)
fs.rename('./src/styles/_quasar.variables.styl', './src/styles/quasar.variables.styl', defaultErrorCallback);

console.log('Renomeando favicon.ico\n')
fs.unlinkSync('./public/favicon.ico', defaultErrorCallback)
fs.rename('./public/_favicon.ico', './public/favicon.ico', defaultErrorCallback);

console.log('Renomeando ./.gitignore\n')
fs.unlinkSync('./.gitignore', defaultErrorCallback)
fs.rename('./_gitignore', './.gitignore', defaultErrorCallback);

console.log('Deletando arquivos adicionais\n')
fs.unlinkSync('./src/assets/logo.png', defaultErrorCallback)
fs.unlinkSync('./src/views/About.vue', defaultErrorCallback)
fs.unlinkSync('./src/views/Home.vue', defaultErrorCallback)

console.log('Adicionando configuração em vue.config.js\n')
prependFile('vue.config.js', "process.env.VUE_APP_VERSION = require('./package.json').version\n", function (err) {
  if (err) {
    console.log(err)
  }
  // Success
  console.log('vue.config.js configurado');
});
