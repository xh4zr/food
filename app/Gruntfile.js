module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
			js: {
				src:['app.js','src/**/*.js'],
				dest:'www/app.js'
			},
			css: {
				src:['src/**/*.css'],
				dest:'www/app.css'
			},
			html: {
				src:'index.html',
				dest:'www/index.html'
			}
		},
		ngtemplates:  {
			app:{
				src:'src/**/*.html',
				dest:'www/templates.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat','ngtemplates']);

};