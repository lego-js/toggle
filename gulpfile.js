var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');

function compile(entry, watch) {
    var bundler = browserify({ entries: [entry], debug: true }).transform('babelify', { presets: ['es2015'] });

    var name = entry.split('/').pop();

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source(name))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        watchify(bundler).on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function compileAll(watch) {
    glob('./src/es5-*.js', function(err, files) {
        if(err) return;

        files.map(function(entry) {
            compile(entry, watch)
        });
    })
}

gulp.task('default', function() {
    compileAll();
});

gulp.task('watch', function() {
    compileAll(true);
});
