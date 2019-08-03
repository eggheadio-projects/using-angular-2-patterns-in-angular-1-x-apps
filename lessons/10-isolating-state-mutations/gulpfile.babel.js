const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');

const reload = () => browserSync.reload();
const root = 'client';

// helper method for resolving paths
const resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob); // app/{glob}
};

// map of all paths
const paths = {
  js: resolveToApp('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(root, 'app/app.js'),
  output: root
};

gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('reload', gulp.series('webpack', (done) => {
  reload();
  done();
}));

gulp.task('serve', gulp.series('webpack', () => {
  browserSync({
    port: process.env.PORT || 3000,
    open: false,
    server: { baseDir: root }
  });
}));

gulp.task('watch', gulp.series('serve', () => {
  const allPaths = [].concat([paths.js], paths.html, [paths.styl]);
  gulp.watch(allPaths, ['reload']);
}));

gulp.task('default', gulp.series('watch'));
