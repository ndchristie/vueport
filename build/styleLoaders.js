const cssSourceMap = process.env.NODE_ENV === 'production' ? '' : '?sourceMap';
const cssLoader = `css-loader${cssSourceMap}`;
const scssLoader = `sass-loader${cssSourceMap}`;

module.exports.vueStyleLoaders = [
  'vue-style-loader',
  cssLoader,
  scssLoader,
].join('!');

module.exports.cssStyleLoaders = [
  'v-style-loader',
  cssLoader,
].join('!');

module.exports.scssStyleLoaders = [
  'style-loader',
  cssLoader,
  scssLoader,
].join('!');
