module.exports = function(grunt) {

	// plugin
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Compassビルド
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},

		// CSS圧縮
		cssmin: {
			minimize: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */'
				},
				files: {
					'htdocs/_DEVELOP/css/style.min.css': 'htdocs/_DEVELOP/css/style.css'
				}
			}
		},

		// JS結合
		concat: {
			head: {
				src: [
					'htdocs/_DEVELOP/js/head/mine/analytics.js'
				],
				dest: 'htdocs/_DEVELOP/js/head/all.js',
			},
			main: {
				src: [
					'htdocs/_DEVELOP/js/main/libs/jquery-1.11.1.min.js',
					'htdocs/_DEVELOP/js/main/mine/util.js'
				],
				dest: 'htdocs/_DEVELOP/js/main/all.js',
			}
		},

		// JS圧縮
		uglify: {
			head: {
				files: {
					'htdocs/_DEVELOP/js/head/all.min.js': 'htdocs/_DEVELOP/js/head/all.js'
				}
			},
			main: {
				files: {
					'htdocs/_DEVELOP/js/main/all.min.js': 'htdocs/_DEVELOP/js/main/all.js'
				}
			}
		},

		// _DEVELOPからassetsへファイルのコピー
		copy: {
			css_debug: {
				files: {
					'htdocs/assets/css/style.css': 'htdocs/_DEVELOP/css/style.css'
				}
			},
			css_release: {
				files: {
					'htdocs/assets/css/style.css': 'htdocs/_DEVELOP/css/style.min.css'
				}
			},
			js_debug: {
				files: {
					'htdocs/assets/js/head.js': 'htdocs/_DEVELOP/js/head/all.js',
					'htdocs/assets/js/main.js': 'htdocs/_DEVELOP/js/main/all.js'
				}
			},
			js_release: {
				files: {
					'htdocs/assets/js/head.js': 'htdocs/_DEVELOP/js/head/all.min.js',
					'htdocs/assets/js/main.js': 'htdocs/_DEVELOP/js/main/all.min.js'
				}
			}
		},

		// ファイルの更新監視
		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: 'htdocs/_DEVELOP/scss/**/*',
				tasks: ['compass','cssmin','copy:css_release']
			},
			js: {
				files: 'htdocs/_DEVELOP/js/**/mine/*',
				tasks: ['concat','uglify','copy:js_release']
			}
		},

		// ローカルサーバー接続
		connect: {
			server: {
				options: {
					port: 8080,
					hostname: 'localhost',
					base: 'htdocs'
				}
			}
		}

	});

	// tasks
	grunt.registerTask(
		'default',
		[
			'build:debug'
		]
	);

	grunt.registerTask(
		'build:debug',
		[
			'compass',
			'cssmin',
			'concat',
			'uglify',
			'copy:css_debug',
			'copy:js_debug',
			'watch',
			'connect'
		]
	);

	grunt.registerTask(
		'build:release',
		[
			'compass',
			'cssmin',
			'concat',
			'uglify',
			'copy:css_release',
			'copy:js_release',
			'watch',
			'connect'
		]
	);

}