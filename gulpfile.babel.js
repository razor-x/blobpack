import gulp from 'gulp'
import gulplog from 'gulplog'
import gulpJsonlint from 'gulp-jsonlint'
import gulpStandard from 'gulp-standard'
import gulpWatch from 'gulp-watch'

const paths = {
  json: [
    '*.json',
    'data/**/*.json',
    'examples/**/*.json',
    'fixtures/**/*.json'
  ],
  scripts: [
    '*.js',
    'examples/**/*.js',
    'lib/**/*.js',
    'test/**/*.js'
  ]
}

export const standard = () => (
  gulp.src(paths.scripts)
    .pipe(gulpStandard())
    .pipe(gulpStandard.reporter('default', {
      breakOnError: true
    }))
)

export const jsonlint = () => (
  gulp.src(paths.json)
    .pipe(gulpJsonlint())
    .pipe(gulpJsonlint.failAfterError())
    .pipe(gulpJsonlint.reporter())
)

export const watchScripts = () => (
  gulp.src(paths.scripts)
    .pipe(gulpWatch(paths.scripts, vinyl => {
      if (vinyl.event === 'change') {
        gulplog.info(`Linted ${vinyl.relative}`)
      }
    }))
    .pipe(gulpStandard())
    .pipe(gulpStandard.reporter('default', {}))
)

export const watchJson = () => (
  gulp.src(paths.json)
    .pipe(gulpWatch(paths.json, vinyl => {
      if (vinyl.event === 'change') {
        gulplog.info(`Linted ${vinyl.relative}`)
      }
    }))
    .pipe(gulpJsonlint())
    .pipe(gulpJsonlint.reporter())
)

export const lint = gulp.parallel(
  jsonlint,
  standard
)

export const watch = gulp.parallel(
  watchJson,
  watchScripts
)

export default gulp.series(
  lint,
  watch
)
