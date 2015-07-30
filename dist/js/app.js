/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('trucktrackerAPP',['ui.router','ngResource','trucktrackerAPP.controllers','trucktrackerAPP.services']);

angular.module('trucktrackerAPP').config(function($stateProvider,$httpProvider){
    $stateProvider.state('trucks',{
        url:'/trucks',
        templateUrl:'partials/trucks.html',
        controller:'TruckListController'
    }).state('viewTruck',{
       url:'/trucks/:id/view',
       templateUrl:'/partials/truck-view.html',
       controller:'TruckViewController'
    }).state('newTruck',{
        url:'/trucks/new',
        templateUrl:'/partials/truck-add.html',
        controller:'TruckCreateController'
    }).state('editTruck',{
        url:'/trucks/:id/edit',
        templateUrl:'/partials/truck-edit.html',
        controller:'TruckEditController'
    });
})
  .filter('urlDencode', [function() {  
    return window.decodeURIComponent;
  }])
  .directive('errSrc', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          if (attrs.src != attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
      }
    }
  })
  .run(function($state){
    $state.go('trucks');
  });