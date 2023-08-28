const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const media = require('gulp-group-css-media-queries')

gulp.task('clean', function(done){
    if (fs.existsSync('./dist/')){
        return gulp.src('./dist/', {read: false}).pipe(clean())
    }

    done();
})


const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file'
}

const serverOptions = {
    
        livereload: true,
        open: true
    
}
    


gulp.task('html', function(){
    return gulp
        .src('./src/*.html')
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(gulp.dest('./dist/'));
})

gulp.task('sass', function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(groupMedia())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('images', function(){
    return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('server', function(){
    return gulp.src('./dist/').pipe(server(serverOptions))
})

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/images/**/*', gulp.parallel('images'));
})


gulp.task('default', gulp.series(
    'clean', 
    gulp.parallel('html', 'sass', 'images'),
    gulp.parallel('server', 'watch')
    ))