'use strict';

/**
 * @ngdoc directive
 * @name plateresult.directive:PlateResultsCtrl
 * @description
 * # PlateResultsCtrl
 * Controller for plate result page
 *
 */

(function() {


  angular.module('plateresults', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap', 'ngFileUpload'])

    .controller('PlateResultsCtrl',PlateResultsCtrl)


  PlateResultsCtrl.$inject = ["$scope", "activeProject", "activePlate", "activePlateResult" , "Upload", "classgridFilter", "Qc", "transformActiveResult" ];

  function PlateResultsCtrl($scope, activeProject, activePlate, activePlateResult, Upload, classgrid, Qc, transformActiveResult) {
    var plresVm = this;

    $scope.ActiveProject = activeProject.project;
    $scope.ActivePlate = activePlate;
    $scope.ActivePlateResult = activePlateResult;
    //$scope.ActivePlateResult.plateResult.displayMeasurements = [].concat($scope.ActivePlateResult.plateResult.measurements);

    plresVm.aside = false;

    plresVm.upload = upload;
    plresVm.deleteResult = deleteResult;

    plresVm.log = '';

    /**
     * @ngdoc function
     * @name upload
     * @description
     * Uploads result file into server
     *
     */
    function upload(files, plateid) {
      console.log(JSON.stringify(files, null, 4));
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          // calls ngFileUpload Upload object to upload file to server adam/upload_result
          Upload.upload({
            url: '/adam/upload_result',
            fields: {
              'plate_id': plateid
            },
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            plresVm.log = 'progress: ' + progressPercentage + '% ' +
            evt.config.file.name + '\n' + plresVm.log;
          }).success(function (data, status, headers, config) {
            //plresVm.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + plresVm.log;
            transformActiveResult(data);
            //$scope.$apply();
          });
        }
      }
    }

    /**
     * @ngdoc function
     * @name deleteResult
     * @description
     * Delete plate result from database
     *
     */
    function deleteResult(plateResult){
      // Call web service
      Qc.delete({"id":plateResult.plateId});
      plateResult.measurements = null;
      plateResult = null;
    }

  }

})();
