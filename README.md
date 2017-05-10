[![Build Status](https://travis-ci.org/ndchristie/vueport.svg?branch=master)](https://travis-ci.org/ndchristie/vueport)
[![Code Climate](https://codeclimate.com/github/ndchristie/vueport/badges/gpa.svg)](https://codeclimate.com/github/ndchristie/vueport)
[![Test Coverage](https://codeclimate.com/github/ndchristie/vueport/badges/coverage.svg)](https://codeclimate.com/github/ndchristie/vueport/coverage)
# Vueport

> A multidisciplinary portfolio template powered by Vue.js

## Core Dependencies & Frameworks

Vueport is built on Vue.js.  Vue.js is in turn reliant on Babel and Webpack.

Vueport contains as little hard-coded information as possible, and relies on a MongoDB connection to store individual configurations and content.

Vueport uses the Bui CSS library for the majority of its layouts, and is being developed concurrently with that project.

Testing is managed through Karma and is integrated with Travis and Code Climate coverage tools.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [docs for vue-loader](http://vuejs.github.io/vue-loader).
