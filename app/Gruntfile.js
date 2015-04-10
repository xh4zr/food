module.exports = function(grunt) {

	grunt.initConfig({
		clean:{
			all: ['../backend/pages/*.*'],
			options: {
				force: true
			}
		},
		concat: {
			js: {
				src:['app.js','src/**/*.js'],
				dest:'../backend/pages/app.js'
			},
			css: {
				src:['src/**/*.css'],
				dest:'../backend/pages/app.css'
			},
			html: {
				src:'index.html',
				dest:'../backend/pages/index.html'
			}
		},
		ngtemplates:  {
			app:{
				src:'src/**/*.html',
				dest:'../backend/pages/templates.js'
			}
		},
		watch: {
			scripts: {
				files: ['src/**/*.*'],
				tasks: ['clean','concat','ngtemplates'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean','concat','ngtemplates','watch']);

};