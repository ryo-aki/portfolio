var gulp = require('gulp');
    sass = require('gulp-sass');
    rename = require('gulp-rename');
    ejs = require('gulp-ejs');
    auto = require('gulp-autoprefixer');
    watch = require('gulp-watch');
    plumber = require('gulp-plumber');
    watch = require('gulp-watch');
    webserver = require('gulp-webserver');
    webServerOptions = {
        host : '0.0.0.0',
        port : '8000',
        open : 'false',
        fallback : 'index.html'
    }

gulp.task('sass',function(){
    gulp.src(['src/scss/**/*.scss','!'+'src/**/仮/*.scss','!'+'src/**/'+'_'+'*.scss']).pipe(plumber()).pipe(sass({outputStyle:'expanded'})).pipe(auto()).pipe(gulp.dest('build/css'));
});

gulp.task('ejs',function(){
    gulp.src(['src/**/*.ejs','!'+'src/**/_parts/*.ejs','!'+'src/**/'+'_'+'*.ejs']).pipe(plumber()).pipe(ejs()).pipe(rename({extname:'.html'})).pipe(gulp.dest('build'));
});

gulp.task('copy',function(){
    gulp.src([
        'src/**/*.jpg',
        'src/**/*.png',
        'src/**/*.svg',
        'src/**/*.css',
        'src/**/*.js',
        '!'+'src/**/仮/*.jpg',
        '!'+'src/**/仮/*.png',
        '!'+'src/**/仮/*.svg',
        '!'+'src/**/仮/*.css',
        '!'+'src/**/仮/*.js'
    ]).pipe(gulp.dest('build'));
});

gulp.task('default',function(){
    //一回目
    gulp.src(['src/scss/**/*.scss','!'+'src/**/仮/*.scss','!'+'src/**/'+'_'+'*.scss']).pipe(sass({outputStyle:'expanded'})).pipe(auto()).pipe(gulp.dest('build/css'));
    gulp.src(['src/**/*.ejs','!'+'src/**/_parts/*.ejs','!'+'src/**/'+'_'+'*.ejs']).pipe(plumber()).pipe(ejs()).pipe(rename({extname:'.html'})).pipe(gulp.dest('build'));
    gulp.src([
            'src/**/*.jpg',
            'src/**/*.png',
            'src/**/*.svg',
            'src/**/*.css',
            'src/**/*.js',
            '!'+'src/**/仮/*.jpg',
            '!'+'src/**/仮/*.png',
            '!'+'src/**/仮/*.svg',
            '!'+'src/**/仮/*.css',
            '!'+'src/**/仮/*.js'
    ]).pipe(gulp.dest('build'));

    //変更分
    gulp.watch('src/**/*.scss',['sass']);
    gulp.watch('src/**/*.ejs',['ejs']);
    gulp.watch([
        'src/**/*.jpg',
        'src/**/*.png',
        'src/**/*.svg',
        'src/**/*.css',
        'src/**/*.js',
    ],['copy']);
})
