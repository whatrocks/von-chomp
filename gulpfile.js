var gulp = require("gulp");
var typescript = require("gulp-typescript");

var tsProject = typescript.createProject("tsconfig.json");

gulp.task("tsc", function() {
  var tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task("dev", ["tsc"], function() {
  gulp.watch(["src/**/*"], ["tsc"]);
})
