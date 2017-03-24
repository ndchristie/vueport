require('dotenv').config();
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const baseWebpackConfig = require('./build/webpack.config');

gulp.task('default', ['webpack']);

gulp.task('clean:dist', () => del(['dist/**/*']));

gulp.task('webpack', (cb) => {
  // run webpack
  webpack(baseWebpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('netlify', () => {
  gulp
    .src('build/netlify/**/*')
    .pipe(gulp.dest('dist'));
});
