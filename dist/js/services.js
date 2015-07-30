/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('trucktrackerAPP.services',[]).factory('Truck',function($resource){
    return $resource('/api/trucks/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        },
        save : {
        	method : 'POST'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});