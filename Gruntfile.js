module.exports = function(grunt){
	grunt.initConfig({
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'public/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'public/css/',
					ext: '.min.css'
				}]
			}
		},
		jshint: {
			all: ["public/js/script.js"]
		},
		uglify: {
			all: {
				files: {
					"public/js/script.min.js": ["public/js/script.js"]
				}
			}
		},
		watch: {
			css: {
				files: ["public/css/style.css"],
				tasks: ["cssmin"]
			},
			js: {
				files: ["public/js/script.js"],
				tasks: ["jshint", "uglify"]
			}
		}
	});

	// grunt.loadNpmTasks();
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	// grunt.registerTask();
};
