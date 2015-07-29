module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			build: ['GruntFile.js','src/**/*.js','!src/js/1jquery.min.js','!src/js/2idangerous.swiper.min.js']
		},
		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/'
			},
			build: {
				files: {
					'dist/js/app.min.js': 'src/**/*.js'
				}
			}
		},
		less: {
			build: {
				files: {
				  'src/css/pretty.css': 'src/css/pretty.less'
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/'
			},
			build: {
				files: {
				  'dist/css/style.min.css': ['src/css/pretty.css','src/css/idangerous.swiper.css','src/css/magnific-popup.css','src/css/fontello/css/*.css']
				}
			}
	    },
	    clean : {
	    	js : ["dist/js/*.js"],
	    	css : ["dist/css/*.css"]
	    },
	    watch: {
	    	stylesheets:{
				files: ['src/**/*.less'], 
				tasks: ['clean:css','less', 'cssmin']
			},
			scripts: { 
				files: 'src/**/*.js',
				tasks: ['clean:js','jshint', 'uglify'] 
			} 
		},
		default: grunt.registerTask('default', ['clean','jshint', 'uglify','less','cssmin'])
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
};