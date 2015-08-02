var gulp = require('gulp'),
	clean = require('gulp-clean'),
	tsc = require('gulp-typescript'),
	tsProject = tsc.createProject('tsconfig.json', { sortOutput: true }),
	mocha = require('gulp-mocha'),
	istanbul = require('gulp-istanbul'),
	sourcemaps = require('gulp-sourcemaps'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify');

gulp.task('default',['dev:browserify', 'dev:coverage'], function() {});

gulp.task('clean',[], cleanTask);
gulp.task('typescript',[], typescriptTask);
gulp.task('test',[], testTask);
gulp.task('coverage',[], coverageTask);
gulp.task('browserify',[], browserifyTask);

gulp.task('dev:clean',[], cleanTask);
gulp.task('dev:typescript',['dev:clean'], typescriptTask);
gulp.task('dev:coverage',['dev:typescript'], coverageTask);
gulp.task('dev:browserify',['dev:typescript'], browserifyTask);

function cleanTask() {
	return gulp.src('src/js', {read: false})
		.pipe(clean());
}

function typescriptTask() {
	return gulp.src('src/ts/**/*.ts', {base: 'src/ts'})
		.pipe(sourcemaps.init({debug: true}))
		.pipe(tsc(tsProject))
		.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: 'src/ts'}))
		.pipe(gulp.dest('src/js'));   
}

function testTask() {
	return gulp.src(['src/js/**/*.spec.js'], { read: false })
		.pipe(mocha({
			reporter: 'spec',
			globals: {
				chai: require('chai'),
				should: require('chai').should,
				sinon: require('sinon')
			}
	}));
}

function coverageTask(cb) {	
	gulp.src(['src/js/**/*.js', '!src/js/**/*.spec.js', 'index.js'])
		.pipe(istanbul({
			includeUntested: true
		}))
		.pipe(istanbul.hookRequire()) 
		.on('finish', function () {
			gulp.src(['src/js/**/*.spec.js'])
			.pipe(mocha())
			// Creating the reports after tests ran
			.pipe(istanbul.writeReports({
				dir: 'build/coverage',
				reporters: ['html']	
			}))
			// Enforce a coverage of at least x%
			.pipe(istanbul.enforceThresholds({
				thresholds: { global: 80 }
			})) 
			.on('end', cb);
		});
}

function browserifyTask() {
	var b = browserify({
		entries: 'src/js/index.js',
		debug: true
	});
	
	return b.bundle()
		.pipe(source('hello-world.min.js'))
	    .pipe(buffer())
	    .pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(uglify())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('build'));
}
