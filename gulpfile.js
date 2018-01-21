var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('start', function() {
    browserSync.init({
        proxy: "localhost:3000",
		port: 3001
    });
    gulp.watch(["routes/*.html", "views/*.ejs"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers

gulp.task('default', ['start']);
