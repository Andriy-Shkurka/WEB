const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/css/**/*.css',
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images'
    }
};

// Конвертує CSS в SCSS
gulp.task('cssToScss', function() {
    return gulp.src(paths.styles.src)
        .pipe(rename({ extname: '.scss' }))
        .pipe(gulp.dest('src/scss'));
});

// Компілює SCSS у CSS, додає префікси та мінімізує CSS
gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
});

// Мінімізує та конкатенує JS
gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src)
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
});

// Оптимізує зображення
gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
});

// Запускає сервер і слідкує за змінами
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('src/css/**/*.css', gulp.series('cssToScss', 'styles'));
    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
    gulp.watch(paths.images.src, gulp.series('images'));
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Запуск всіх завдань за замовчуванням
gulp.task('default', gulp.series('cssToScss', 'styles', 'scripts', 'images', 'serve'));
