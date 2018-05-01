var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var $ = require( 'gulp-load-plugins' )( {lazy: true} )
 
function handleError (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task( 'browser-sync', ['sass', 'scripts'], function () {
	browserSync( {
		server: {
      baseDir: "dist",
      index: 'classic-apron.html',
			injectChanges: true
		}
	} );
} );

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(gulp.dest('dist/css'))
});

gulp.task('html', function () {
	return gulp
		.src( '*.html' )
		.pipe( gulp.dest( 'dist/' ) )
} );

gulp.task('scripts', function () {
    return gulp.src('es6/*.js')
        .pipe($.plumber())
        .pipe($.babel({ presets: ['es2015'] }))
        .pipe($.concat( 'app.js' ))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe( browserSync.reload( {stream: true} ));
});

gulp.task( 'images', function () {
	return gulp
		.src( 'images/**' )
		.pipe( $.changed( 'images/**' ) )
		.pipe( $.imagemin( {
			// Lossless conversion to progressive JPGs
			progressive: true,
			// Interlace GIFs for progressive rendering
			interlaced: true
		} ) )
		.pipe( gulp.dest( 'dist/images' ) )
		.pipe( $.size( {title: 'images'} ) );
});

gulp.task('watch', function(){
  gulp.watch('scss/**/*.scss', ['sass', browserSync.reload]);
  gulp.watch('*.html', ['html', browserSync.reload]);
  gulp.watch('dist/*.html').on('change', browserSync.reload)
  gulp.watch('es6/*.js', ['scripts', browserSync.reload]);
});

gulp.task('start', function() {
    gulp.start('sass', 'scripts', 'html', 'images', 'browser-sync', 'watch');
});