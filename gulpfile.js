const gulp = require('gulp');
const fileInclude = require('gulp-file-include');

const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file'
}
    


gulp.task('includeFiles', function(){
    return gulp
        .src('./src/*.html')
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(gulp.dest('./dist/'));
})