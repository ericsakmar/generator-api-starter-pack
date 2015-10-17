'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slugify = require("underscore.string/slugify");

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the prime ' + chalk.red('ApiStarterPack') + ' generator!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }];

    this.prompt(prompts, function (props) {
      props.projectName = slugify(props.name);
      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    project: function () {
      this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.props);
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
      this.fs.copyTpl(this.templatePath('readme.md'), this.destinationPath('readme.md'), this.props);
    },

    app: function () {
      this.fs.copy(this.templatePath('app.js'), this.destinationPath('app.js'));
      this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
      this.fs.copy(this.templatePath('bin/www'), this.destinationPath('bin/www'));
    }
  },

  install: function () {
    this.installDependencies();
  }
});
