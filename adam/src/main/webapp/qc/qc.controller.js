'use strict';
/**
 * @ngdoc function
 * @name qc.controller:QcCtrl
 * @description
 * # QcCtrl
 * Controller for Qc page
 *
 */

(function() {


  angular.module('qc', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap','ngSlider'])

    .controller('QcCtrl',QcCtrl)


  QcCtrl.$inject = ["$scope", "activeProject", "activePlate", "activePlateResult", "rangeFilter", "classgridFilter", "wellBoxSize", "setActiveMeasurement" ];

  function QcCtrl($scope, activeProject, activePlate, activePlateResult, range, classgrid, wellBoxSize, setActiveMeasurement) {
    var qcVm = this;

    $scope.ActiveProject = activeProject.project;
    $scope.ActivePlate = activePlate;
    $scope.ActivePlateResult = activePlateResult;
    $scope.WellBoxSize = wellBoxSize;
    qcVm.aside = false;

    if($scope.ActivePlateResult != null && $scope.ActivePlateResult.plateResult != null && $scope.ActivePlateResult.plateResult != "" &&
      $scope.ActivePlateResult.resultExists === true) {
      if($scope.ActivePlateResult.plateResult.valueslider === null)
        $scope.ActivePlateResult.plateResult.valueslider = 1;
      $scope.ActivePlateResult.resultExists = true;
    }
    else
      $scope.ActivePlateResult.resultExists = false;

    // set colors in wells in plate map
    qcVm.wellcollors = {bckgColorH:"0",colorText:"#FFFF00"};

    qcVm.callSetActiveMeasurement = callSetActiveMeasurement;

    // object used for slider to control the size of plate map
    qcVm.boxsizerange = {
      from: 25,
      to: 100,
      floor: true,
      step: 1,
      dimension: " px",
      vertical: false,
      callback: function(value, elt) {
        //console.log(value);
      }
    };

    /**
     * @ngdoc function
     * @name callSetActiveMeasurement
     * @description
     * Set active measurement object shared between pages
     *
     */

    function callSetActiveMeasurement(type, sliderIndex, plateres) {
      setActiveMeasurement(type, sliderIndex, plateres);
    }


  }

})();
