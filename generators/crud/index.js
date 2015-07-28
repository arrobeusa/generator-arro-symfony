'use strict';

var yeoman = require('yeoman-generator');


module.exports = yeoman.generators.Base.extend({

    /**
     *
     */
    prompting: {
        resourceName: function () {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'name',
                message : 'Resource name (EX: Widget):',
                default : this.appname, // Default to current folder name
                store   : true
            }, function (answers) {
                this.log(answers.name);
                this.resourceName = answers.name;
                done();
            }.bind(this));
        },
        pluralResourceName: function () {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'pluralResourceName',
                message : 'Plural resource name (EX: Widgets):',
                default : this.resourceName + "s", // Default to current folder name
                store   : true
            }, function (answers) {
                this.log(answers.pluralResourceName);
                this.pluralResourceName = answers.pluralResourceName;
                done();
            }.bind(this));
        }
    },

    /**
     *
     */
    configuring: {
        buildNames: function(){
            console.log('>>>>> configuring can be so boring');

            this.names = {
                "resourceName"             : this.resourceName,
                "resourceNameLower"        : this.resourceName.toLowerCase(),
                "pluralResourceName"       : this.pluralResourceName,
                "pluralResourceNameLower"  : this.pluralResourceName.toLowerCase()
            }
        }
    },

    /**
     *
     */
    default: {
        default: function(){
            console.log('>>>>> this is the default... almost to the end');
      }
    },

    /**
     *
     */
    install: {
        default: function(){
            console.log('>>>>> installing...');
      }
    },

    /**
     *
     */
    writing: {
        buildRoutingYml: function(){
            this.template('_routing.yml', 'app/config/routing.yml', this.names);
        },

        buildController: function(){
            this.template('_controller.php', 'src/AppBundle/Controller/' + this.pluralResourceName + 'Controller.php', this.names);
        },

        buildDocument: function(){
            this.template('_document.php', 'src/AppBundle/Document/' + this.resourceName + '.php', this.names);
        },

        buildFormType: function(){
            this.template('_formType.php', 'src/AppBundle/Form/' + this.resourceName + 'Type.php', this.names);
        },

        buildFixtures: function(){
            this.template('fixtures.js', 'garden/fixtures/mongo/' + this.resourceName + '.js', this.names);
        },

        buildApp: function(){
          this.directory('web/app', 'web/app');
          this.directory('web/components', 'web/components');

          this.template('web/index.html', 'web/index.html', this.names);
          this.template('web/app/app.js', 'web/app/app.js', this.names);
          this.template('web/app/Api.js', 'web/app/Api.js', this.names);
          this.template('web/app/app.css', 'web/app/app.css', this.names);
          this.template('web/app/app.js', 'web/app/app.js', this.names);
          this.template('web/app/main/main.controller.js', 'web/app/main/main.controller.js', this.names);
          this.template('web/app/main/main.css', 'web/app/main/main.css', this.names);
          this.template('web/app/main/main.html', 'web/app/main/main.html', this.names);
          this.template('web/app/main/main.js', 'web/app/main/main.js', this.names);
          this.template('web/components/navbar/navbar.controller.js', 'web/components/navbar/navbar.controller.js', this.names);
          this.template('web/components/navbar/navbar.html', 'web/components/navbar/navbar.html', this.names);
        }
    },

    /**
     *
     */
    end: {
        default: function(){
           console.log('>>>>> the end is hear');
        }
    }
});
