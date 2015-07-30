/**
 * Created by Sandeep on 01/06/14.
 */
angular
    .module('trucktrackerAPP.controllers',[])
    .controller('TruckListController',function($scope,$state,popupService,$window,Truck){
    
    $scope.trucks=Truck.query();

    $scope.deleteTruck=function(truck){
        if(popupService.showPopup('Really delete this?')){
            truck.$delete({ id : truck.$loki }, function(){
                window.location.href="";
            });
        }
    }

}).controller('TruckViewController',function($scope,$stateParams,Truck){

    $scope.truck=Truck.get({id:$stateParams.id});

}).controller('TruckCreateController',function($scope,$state,$stateParams,Truck){

    $scope.truck=new Truck();
    $scope.addTruck=function(){        
        $scope.truck.$save(function(){
            $state.go('trucks');
        });
    }

}).controller('TruckEditController',function($scope,$state,$stateParams,Truck){

    $scope.updateTruck=function(){
        $scope.truck.$update(function(){
            $state.go('trucks');
        });
    };

    $scope.loadTruck=function(){
        $scope.truck=Truck.get({id:$stateParams.id});
    };

    $scope.loadTruck();
});