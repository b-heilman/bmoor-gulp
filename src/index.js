
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const mochaRun = require('gulp-mocha');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

const {Config} = require('bmoor/src/lib/config.js');
const config = new Config({
	test: {
		bootstrap: './test/bootstrap.js',
		files: [
			'./src/*.spec.js',
			'./src/**/*.spec.js'
		]
	},
	lint: {
		files: [
			'./src/*.js',
			'./src/**/*.js'
		]
	},
	docs: {
		bootstrap: './README.md',
		files: [
			'./src/*.js',
			'./src/**/*.js'
		],
		output: './docs/gen',
		options: {}
	}
});

function loadFiles(type, options) {
	let fname = require('yargs').argv.file;

	const files = config.get(type+'.files');
	const bootstrap = config.get(type+'.bootstrap');

	let loading = bootstrap ? [bootstrap] : [];

	if (fname) {
		return gulp.src(loading.concat([fname]), options);
	} else {
		return gulp.src(loading.concat(files), options);
	}
}

function runTests(files, onError) {
	let argv = require('yargs').argv;
	let handler = onError || function(ex){
		console.log('error?');
		console.log(ex);
	};

	return files.pipe(
		mochaRun({
			reporter: 'list',
			verbose: argv.verbose
		})
	).on('error', handler);
}

function test() {
	return runTests(loadFiles('test', {read: false}));
}

function runLint(files) {
	return files.pipe(
		jshint()
	).pipe(jshint.reporter(stylish));
}

function lint(){
	return runLint(loadFiles('lint', {read: true}));
}

function runDocs(files, cb){
	const options = config.get('docs.options') || {};
	const output = config.get('docs.output');

	return files.pipe(
		jsdoc(Object.assign({}, options, {
			opts: {
				destination: output
			}
		}, cb))
	);
}

function docs(cb){
	return runDocs(loadFiles('docs', {read: false}), cb);
}

module.exports = {
	config,
	docs,
	lint,
	test
};
