'use strict';

angular.module('<%= resourceNameLower %>ServiceApp')
  .factory('Api', function ($http, $q) {

    return {
      get<%= pluralResourceName  %>: get<%= pluralResourceName  %>,
      delete<%= resourceName  %>: delete<%= resourceName  %>,
      update<%= resourceName  %>: update<%= resourceName  %>,
      create<%= resourceName  %>: create<%= resourceName  %>
    };

    function get<%= pluralResourceName  %>() {
      var request = $http({
        method: "get",
        url: '/app_dev.php/<%= pluralResourceNameLower %>/'
      });

      return request.then(handleSuccess, handleError);
    }

    function delete<%= resourceName  %>(feature) {
      var request = $http({
        method: "delete",
        url: '/app_dev.php/<%= pluralResourceNameLower %>/'+ feature.id + '/'
      });

      return request.then(handleSuccess, handleError);
    }

    function update<%= resourceName  %>(feature) {
      var request = $http({
        method: "put",
        url: '/app_dev.php/<%= pluralResourceNameLower %>/'+ feature.id + '/',
        data: feature
      });

      return request.then(handleSuccess, handleError);
    }

    function create<%= resourceName  %>(feature) {
      var request = $http({
        method: "post",
        url: '/app_dev.php/<%= pluralResourceNameLower %>/',
        data: feature
      });

      return request.then(handleSuccess, handleError);
    }

    ////////////////////  private functions  //////////////////////

    function handleError(response) {
      return $q.reject(response);
    }

    function handleSuccess(response) {
      return response.data;
    }

  });
