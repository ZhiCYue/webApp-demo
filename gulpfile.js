const gulp = require('gulp');
const sass = require('gulp-sass');

var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var connect = require('gulp-connect');

gulp.task('sass', function () {
    return gulp.src(['./sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass'])
});

//使用postcss px2rem 得到rem
gulp.task('css', function() {
    var processors = [px2rem({remUnit: 75})];
    return gulp.src('./css/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});

//使用connect启动一个Web服务器
gulp.task('connect',function(){
	connect.server({
		root:'./',
		port:'8000',
		livereload: true
	})
});

//html任务
gulp.task('html',function(){
	gulp.src('./pages/*.html')
	.pipe(connect.reload());
});

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('html:watch', function () {
  gulp.watch(['./pages/*.html'], ['html']);
});

//运行gulp 默认的Task
gulp.task('default',['sass','connect','html', 'sass:watch', 'html:watch'])