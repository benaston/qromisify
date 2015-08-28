module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				preserveComments: false
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		jasmine: {
			customTemplate: {
				src: 'src/**/*.js',
				options: {
					specs: 'spec/**/*.js'
				}
			}
		},
		replace: {
			injectConstructorFunctionsIntoMainJs: {
				options: {
					patterns: [{
						match: 'qromisify',
						replacement: '<%= grunt.file.read("src/qromisify.js") %>'
					}]
				},
				files: [{
					src: ['src/main.js'],
					dest: 'dist/<%= pkg.name %>.js'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('jasmine-node');
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask('test', ['replace', 'jasmine']);
	grunt.registerTask('default', ['replace', 'uglify']);
};