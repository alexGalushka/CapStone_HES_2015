"use strict";!function(){function a(a,b){a.when("/projects",{templateUrl:"project/project.html",controller:"ProjectsCtrl",controllerAs:"projVm"}).when("/plates",{templateUrl:"plate/plate.html",controller:"PlatesCtrl"}).when("/plateeditor",{templateUrl:"plateeditor/plateeditor.html",controller:"PlateeditorCtrl"}).when("/plateresults",{templateUrl:"plateresult/plateresult.html",controller:"PlateResultsCtrl"}).when("/qc",{templateUrl:"qc/qc.html",controller:"QcCtrl"}).otherwise({redirectTo:"/projects"})}angular.module("adamApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","smart-table","mgcrea.ngStrap","ngSlider","project","adamServices","navbarAdam","project.data.model"]).config(a),a.$inject=["$routeProvider","$resourceProvider"]}(),function(){function a(a,b,c,d,e,f){function g(a,b){d["delete"](a[b]);var c=a.indexOf(b);a.splice(c,1)}function h(){o.projectAction="new",o.newproject={name:"",description:"",label:"",creationDate:""}}function i(a){o.projectAction="edit",o.newproject=JSON.parse(JSON.stringify(a))}function j(a,b){"new"==a?(d.save(o.newproject),o.projects=o.projects.concat(o.newproject)):(b.name=o.newproject.name,b.description=o.newproject.description,b.label=o.newproject.label,b.owner=o.newproject.owner,b.creationDate=o.newproject.creationDate,b.tags=o.newproject.tags,b.collaborators=o.newproject.collaborators)}function k(b){a.ActiveProject.project=b,a.ActivePlate.plate=""}function l(a,b){a.push({name:b})}function m(a){o.filterowner=a?"Ivan":""}function n(a,b){a.push(b)}var o=this;a.ActiveProject=b,a.ActivePlate=c,o.filterowner="",o.editProject=i,o.addNewProject=h,o.saveChangesProject=j,o.setActiveProject=k,o.addTag=l,o.checkedOwner=m,o.addCollaborator=n,o.deletePr=g,o.projects=d.query(),o.projects2=[{name:"Project b",description:"Cancer research in 2015",owner:"Cindy",tags:[{name:"multi projectadam"},{name:"mouse"}],collaborators:[{name:"Alex"},{name:"Ivan"},{name:"Gerson"}],label:"mouse",creationDate:"2/2/2015"},{name:"Project a",description:"Amazing new medicine",owner:"Nik",tags:[],collaborators:[{name:"Alex"},{name:"Ivan"},{name:"Cindy"}],label:"human",creationDate:"2/12/3015"},{name:"Aiv",description:"Painkiller medicine phase 3",owner:"Alex",tags:[],collaborators:[{name:"Alex"},{name:"Nik"},{name:"Cindy"}],label:"mouse",creationDate:"3/2/2015"},{name:"Zig medicine",description:"Building new research",owner:"Ivan",tags:[],collaborators:[{name:"Cindy"},{name:"Nik"},{name:"Gerson"}],label:"human",creationDate:"2/12/2015"}],o.projectsDisplay=[].concat(o.projects),o.collaborators=[{name:"Alex"},{name:"Cindy"},{name:"Gerson"},{name:"Nik"}]}angular.module("project",["smart-table","mgcrea.ngStrap"]).controller("ProjectsCtrl",a),a.$inject=["$scope","activeProject","activePlate","Project","$http","$filter"]}(),angular.module("adamServices",["ngResource"]).service("activeProject",function(){var a=this;a.project=""}).service("activePlate",function(){var a=this;a.plate=""}).service("activePlateResult",function(){var a=this;a.name=""}),function(){angular.module("navbarAdam",[]).directive("admahesNavbar",function(){return{restrict:"E",scope:{},templateUrl:"layout/navbaradam.html"}})}(),function(){angular.module("project.data.model",[]).factory("Project",["$resource",function(a){return a("http://54.149.197.234/adam/rest/project",{},{})}])}();