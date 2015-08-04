'use strict';

angular.module('<%= resourceNameLower %>ServiceApp')
  .controller('MainCtrl', function ($scope, Api) {
    $scope.<%= pluralResourceNameLower %> = [];
    $scope.<%= resourceNameLower %>Name = '';

    Api.get<%= pluralResourceName %>().then(function (<%= pluralResourceNameLower %>) {
      $scope.<%= pluralResourceNameLower %> = <%= pluralResourceNameLower %>;
    });

    $scope.change = function (<%= resourceNameLower %>) {
      Api.update<%= resourceName %>(<%= resourceNameLower %>);
    };

    $scope.showFeedback = false;

    $scope.createNew = function () {
      Api.create<%= resourceName %>({name: $scope.<%= resourceNameLower %>Name}).then(function (<%= resourceNameLower %>) {
        console.log(<%= resourceNameLower %>);
        $scope.<%= pluralResourceNameLower %>.push(<%= resourceNameLower %>);
        $scope.<%= resourceNameLower %>Name = '';
        //$scope.showFeedback = false;
      });
    };

    $scope.delete<%= resourceName %> = function (<%= resourceNameLower %>) {
      Api.get<%= pluralResourceName %>(<%= resourceNameLower %>.id).then(function () {
        $scope.<%= pluralResourceNameLower %>.splice($scope.<%= pluralResourceNameLower %>.indexOf(<%= resourceNameLower %>), 1);
        Api.delete<%= resourceName %>(<%= resourceNameLower %>);
      });

    };

  });
