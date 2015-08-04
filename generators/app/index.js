'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
//        this.pkg = require('../package.json');
//        var Jolicode = '\n        ' + chalk.yellow('##') + '       ##            ##  ##   #######                   ##                ' + chalk.yellow('##') + '  ' + chalk.yellow('##') + '  \n      ' + chalk.yellow('##') + '         ##            ##      ##     ##                  ##               ' + chalk.yellow('##') + '    ' + chalk.yellow('##') + '  \n     ' + chalk.yellow('##') + '          ##   ######   ##  ##  ##          ######    #######   ######     ' + chalk.yellow('##') + '      ' + chalk.yellow('##') + '  \n     ' + chalk.yellow('##') + '          ##  ##    ##  ##  ##  ##         ##    ##  ##    ##  ########   ' + chalk.yellow('##') + '       ' + chalk.yellow('##') + '  \n      ' + chalk.yellow('##') + '  ##    ###  ##    ##  ##  ##  ##     ##  ##    ##  ##    ##  ##        ' + chalk.yellow('##') + '       ' + chalk.yellow('##') + '  \n       ' + chalk.yellow('##') + '   #####     ######   ##  ##   #######    ######    #######   ######  ' + chalk.yellow('##') + '       ' + chalk.yellow('##');
//        var JolicodeDesc = '\n\n   A Yeoman generator for the Symfony2 framework\n\n   Created by ' + chalk.yellow('@JoliCode ') + ' & ' + chalk.blue('@lbrunet_com') + '\n   ' + chalk.cyan('http://jolicode.com/') + '\n';
//        this.log(Jolicode);
//        this.log(JolicodeDesc);
    },

    askSymfonyStandard: function () {
        var done = this.async();

        this.SymfonyStandardDistribution = {
            username: 'symfony',
            repository: 'symfony-standard',
            commit: '2.6'
        };

        var prompts = [{
            type: 'confirm',
            name: 'symfonyStandard',
            message: 'Would you like to use the Symfony "Standard Edition" distribution ' + this.SymfonyStandardDistribution.commit,
            default: true
        }];

        this.prompt(prompts, function(answers) {

            if (answers.symfonyStandard) {
                this.symfonyDistribution = this.SymfonyStandardDistribution;
            } else {
                this.symfonyDistribution = null;
            }

            done();
        }.bind(this));
    },

    askSymfonyCustom: function () {
        if (this.symfonyDistribution === null) {
            var done = this.async();

            console.log('Please provide GitHub details of the Symfony distribution you would like to use.');
            console.log('e.g. http://github.com/symfony/symfony-standard/tree/[commit].');

            var prompts = [{
                type: 'list',
                name: 'symfonyCommit',
                message: 'Commit (commit/branch/tag)',
                default: '2.6',
                choices: ['2.3', '2.5', '2.6']
            }];

            this.prompt(prompts, function(answers) {

                var repo = 'https://github.com/' + 'symfony' + '/' + 'symfony-standard' + '/tree/' + answers.symfonyCommit;
                console.log('Thanks! I\'ll use ' + repo);
                console.log('');

                this.symfonyDistribution = {
                    username: 'symfony',
                    repository: 'symfony-standard',
                    commit: answers.symfonyCommit
                };

                done();
            }.bind(this));
        }
    },

    askToolsExtension: function() {
        var done = this.async();
        var prompts = [{
            type: 'list',
            name: 'toolsExtension',
            message: 'Which tools would you like to use?',
            default: 'gulp',
            choices: ['grunt', 'gulp']
        }];
        this.prompt(prompts, function(answers) {
            this.toolsExtension = answers.toolsExtension;
            done();
        }.bind(this));
    },

    askGruntCustom: function () {
        if (this.toolsExtension === 'grunt') {
            var done = this.async();

            var prompts = [{
                type: 'checkbox',
                name: 'gruntCustom',
                message: 'Customize Gruntfile',
                choices: [
                    {
                        name: 'grunt-compass',
                        value: 'gruntCompass',
                        checked: true
                    },
                    {
                        name: 'grunt-coffee',
                        value: 'gruntCoffee',
                        checked: false
                    },
                    {
                        name: 'grunt-sass',
                        value: 'gruntSass',
                        checked: false
                    },
                    {
                        name: 'grunt-typescript',
                        value: 'gruntTypescript',
                        checked: true
                    },
                    {
                        name: 'grunt-copy',
                        value: 'gruntCopy',
                        checked: true
                    }
                ]
            }];

            this.prompt(prompts, function(answers) {
                function hasFeature(feat) {
                    return answers.gruntCustom.indexOf(feat) !== -1;
                }

                this.gruntcompass = hasFeature('gruntCompass');
                this.gruntcoffee = hasFeature('gruntCoffee');
                this.gruntSass = hasFeature('gruntSass');
                this.gruntTypescript = hasFeature('gruntTypescript');
                this.gruntCopy = hasFeature('gruntCopy');

                done();
            }.bind(this));
        }
    },

    askGulpCustom: function() {
        if (this.toolsExtension === 'gulp') {
            var done = this.async();

            var prompts = [{
                type: 'checkbox',
                name: 'gulpCustom',
                message: 'Customize Gulpfile',
                choices: [
                    {
                        name: 'gulp-ruby-sass',
                        value: 'gulpRubySass',
                        checked: true
                    },
                    {
                        name: 'gulp-copy',
                        value: 'gulpCopy',
                        checked: false
                    },
                    {
                        name: 'gulp-concat',
                        value: 'gulpConcat',
                        checked: false
                    }
                ]
            }];

            this.prompt(prompts, function (answers) {
                function hasFeature(feat) {
                    return answers.gulpCustom.indexOf(feat) !== -1;
                }

                this.gulpRubySass = hasFeature('gulpRubySass');
                this.gulpCopy = hasFeature('gulpCopy');
                this.gulpConcat = hasFeature('gulpConcat');

                done();
            }.bind(this));
        }
    },

    askBowerStandard: function() {
        var done = this.async();

        var prompts = [{
            type: 'confirm',
            name: 'bowerStandard',
            message: 'Would you like to use "BootStrap 3.3"?',
            default: true
        }];

        this.prompt(prompts, function (answers) {
            this.bowerStandard = answers.bowerStandard;
            done();
        }.bind(this));
    },

    symfonyBase: function() {
        var done = this.async();
        var appPath = this.destinationRoot();

        this.remote(
            this.symfonyDistribution.username,
            this.symfonyDistribution.repository,
            this.symfonyDistribution.commit,
            function (err, remote) {
                if (err) {
                    return done(err);
                }
                remote.directory('.', path.join(appPath, '.'));
                done();
            }
        );
    },

    askbundle: function() {
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'addBundle',
            message: 'Which bundle would you like to use?',
            choices: [
                {
                    name: 'DoctrineFixturesBundle',
                    value: 'fixturebundle',
                    checked: true
                },
                {
                    name: 'DoctrineMigrationsBundle',
                    value: 'migrationbundle',
                    checked: false
                },
                {
                    name: 'DoctrineMongoDBBundle',
                    value: 'mongoDBbundle',
                    checked: false
                }
            ]

        }];

        this.prompt(prompts, function(answers){
            function hasFeature(feat){
                return answers.addBundle.indexOf(feat) !== -1;
            }

            this.fixturebundle = hasFeature('fixturebundle');
            this.migrationbundle = hasFeature('migrationbundle');
            this.mongoDBbundle = hasFeature('mongoDBbundle');
            done();
        }.bind(this));

    },

    writing: {
        app: function () {
            if (this.toolsExtension === 'grunt') {
                this.template('_Gruntfile.js', 'Gruntfile.js');
            }
            if (this.toolsExtension === 'gulp') {
                this.template('_Gulpfile.js', 'Gulpfile.js');
            }
            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copy(
                this.templatePath('_bowerrc'),
                this.destinationPath('.bowerrc')
            );
            this.template('_bower.json', 'bower.json');
            this.template('_package.json', 'package.json');
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
        },

        buildParametersYml: function(){
            this.template('app/config/parameters.yml', 'app/config.parameters.yml');
        },

        buildComposerJson: function(){
            this.template('_composer.json', 'composer.json');
            this.template('_composer.lock', 'composer.lock');
        },

        buildConfig: function() {
            this.template('app/config/config.yml', 'app/config/config.yml');
        },

        buildAppKernel: function() {
            this.template('_AppKernel.php', 'app/AppKernel.php');
        },

        buildAppTest: function() {
          this.template('web/app_test.php', 'web/app_test.php');
        },

        copyGarden: function() {
          this.directory('garden', 'garden');
        }

    },

    install: function () {
        this.installDependencies({
            skipInstall: false
        });
    },

    end: {

        cleanComposer: function () {
            var done = this.async();

            var composerContents = this.readFileAsString('composer.json');
            var composerParse = JSON.parse(composerContents);
            delete composerParse.require['symfony/assetic-bundle'];
            var data = JSON.stringify(composerParse, null, 4);
            fs.writeFileSync('composer.json', data);

            done();
        },

        cleanConfig: function () {
            var done = this.async();

            var confDev = yaml.safeLoad(fs.readFileSync('app/config/config_dev.yml'));
            delete confDev.assetic;
            var newConfDev = yaml.dump(confDev, {indent: 4});
            fs.writeFileSync('app/config/config_dev.yml', newConfDev);

            var conf = yaml.safeLoad(fs.readFileSync('app/config/config.yml'));
            delete conf.assetic;
            var newConf = yaml.dump(conf, {indent: 4});
            fs.writeFileSync('app/config/config.yml', newConf);

            done();
        },

        updateAppKernel: function () {
            console.log('This will add the custom bundles to Symfony\'s AppKernel');
            var appKernelPath = 'app/AppKernel.php';
            var appKernelContents = this.readFileAsString(appKernelPath);

            var newAppKernelContents = appKernelContents.replace('new Symfony\\Bundle\\AsseticBundle\\AsseticBundle(),', '');
            fs.writeFileSync(appKernelPath, newAppKernelContents);
        },

        installGardenDependencies: function(){
          this.spawnCommand('npm', ['install'], { 'cwd': 'garden' });
        },

        addBundleComposer: function(){

            if (this.fixturebundle) {
                this.spawnCommand('composer', ['require', 'doctrine/doctrine-fixtures-bundle', '--no-update']);
            }
            if (this.migrationbundle) {
                this.spawnCommand('composer', ['require', 'doctrine/migrations', '@dev',  '--no-update']);
                this.spawnCommand('composer', ['require', 'doctrine/doctrine-migrations-bundle', '@dev',  '--no-update']);
            }
            if (this.mongoDBbundle) {
                this.spawnCommand('composer', ['require', 'doctrine/mongodb-odm', '@dev', '--no-update']);
                this.spawnCommand('composer', ['require', 'doctrine/mongodb-odm-bundle', '@dev', '--no-update']);
            }

            this.spawnCommand('composer', ['install', '--no-interaction']);
        }
    }
});