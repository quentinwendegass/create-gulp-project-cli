const gulp = require("gulp");
const plumber = require("gulp-plumber");
const livereload = require("gulp-livereload");
const logger = require("../logger");

module.exports = function () {

    let stream = gulp.src(this.config.rootDir + "/" + this.config.jsDir + '/**/*.+(js|ts)').pipe(plumber({
        errorHandler: (err) => {
            logger.error(err);
        }
    }));

    for (let i = 0; i < this.commands.length; i++) {
        stream = stream.pipe(this.commands[i].cmd());
    }

    stream = stream.pipe(gulp.dest(this.config.rootDir + "/" + this.config.distDir + "/" + this.config.jsDir)).pipe(livereload());
    return stream;
};
