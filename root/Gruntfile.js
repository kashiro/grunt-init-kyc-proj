'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        // configurable paths
        pathConfig: {
            src: 'src',
            dist: 'dist',
            test: 'test'
        },
        watch: {
            coffee: {
                files: ['<%= pathConfig.src %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['<%= pathConfig.test %>/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= pathConfig.src %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                files: [
                    '<%= pathConfig.src %>/*.html',
                    '{.tmp,<%= pathConfig.src %>}/styles/{,*/}*.css',
                    '{.tmp,<%= pathConfig.src %>}/scripts/{,*/}*.js',
                    '<%= pathConfig.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'src')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= pathConfig.dist %>/*',
                        '!<%= pathConfig.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= pathConfig.src %>/scripts/{,*/}*.js',
                '!<%= pathConfig.src %>/scripts/vendor/*',
                '<%= pathConfig.test %>/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pathConfig.src %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= pathConfig.test %>/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= pathConfig.src %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= pathConfig.src %>/images',
                javascriptsDir: '<%= pathConfig.src %>/scripts',
                fontsDir: '<%= pathConfig.src %>/styles/fonts',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= pathConfig.dist %>/scripts/{,*/}*.js',
                        '<%= pathConfig.dist %>/styles/{,*/}*.css',
                        '<%= pathConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= pathConfig.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= pathConfig.src %>/index.html',
            options: {
                dest: '<%= pathConfig.dist %>'
            }
        },
        usemin: {
            html: ['<%= pathConfig.dist %>/{,*/}*.html'],
            css: ['<%= pathConfig.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= pathConfig.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pathConfig.src %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= pathConfig.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pathConfig.src %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= pathConfig.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= pathConfig.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= pathConfig.src %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= pathConfig.src %>',
                    src: '*.html',
                    dest: '<%= pathConfig.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pathConfig.src %>',
                    dest: '<%= pathConfig.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/*'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server'
            ],
            test: [
                'coffee',
                'compass'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'cssmin',
        'concat',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
