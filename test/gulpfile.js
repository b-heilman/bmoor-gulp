
const gulp = require('gulp');
const methods = require('../src/index.js');

methods.config.assign({
	test: {
		bootstrap: './boot.js',
		files: [
			'./test.js'
		]
	},
	lint: {
		files: [
			'../src/*.js',
			'./lint.js'
		]
	},
	docs: {
		bootstrap: './doc.md',
		files: [
			'./doc.js'
		],
		output: './doc-out'
	}
});

gulp.task('lint', methods.lint);
gulp.task('test', methods.test);
gulp.task('docs', methods.docs);
