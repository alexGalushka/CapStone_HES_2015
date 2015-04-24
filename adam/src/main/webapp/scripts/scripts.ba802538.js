"use strict";!function(){function a(a,b){a.when("/projects",{templateUrl:"project/project.html",controller:"ProjectsCtrl",controllerAs:"projVm"}).when("/plates",{templateUrl:"plate/plate.html",controller:"PlateCtrl",controllerAs:"plateVm"}).when("/plateeditor",{templateUrl:"plateeditor/plateeditor.html",controller:"PlateeditorCtrl",controllerAs:"pleditVm"}).when("/plateresults",{templateUrl:"plateresult/plateresult.html",controller:"PlateResultsCtrl",controllerAs:"plresVm"}).when("/qc",{templateUrl:"qc/qc.html",controller:"QcCtrl",controllerAs:"qcVm"}).otherwise({redirectTo:"/projects"})}angular.module("adamApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","smart-table","mgcrea.ngStrap","ngSlider","adamServices","navbarAdam","project","projectpanel","project.data.model","plate","plate.data.model","platepanel","collaborator.data.model","plateeditor","resetsel","plotlabels","singlewell","wellstable","wellattrfilter"]).config(a),a.$inject=["$routeProvider","$resourceProvider"]}(),function(){function a(a,b,c,d,e,f,g){function h(a,b){e["delete"]({id:b.id});var c=a.indexOf(b);a.splice(c,1)}function i(){p.projectAction="new",p.newproject={name:"",description:"",label:"",tags:[],collaborators:[]}}function j(a){p.projectAction="edit",p.newproject=JSON.parse(JSON.stringify(a))}function k(a,b){if("new"==a){var c=e.save(p.newproject);p.projects=p.projects.concat(c)}else e.update({id:p.newproject.id},p.newproject),b.name=p.newproject.name,b.description=p.newproject.description,b.label=p.newproject.label,b.tags=p.newproject.tags,b.collaborators=p.newproject.collaborators}function l(b){a.ActiveProject.project=b,a.ActivePlate.plate="",a.activePlateResult.plate=""}function m(a,b){a.push({description:b})}function n(a){p.filterowner=a?"ivan":""}function o(a,b){a.push(b)}var p=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,p.filterowner="",p.editProject=j,p.addNewProject=i,p.saveChangesProject=k,p.setActiveProject=l,p.addTag=m,p.checkedOwner=n,p.addCollaborator=o,p.deletePr=h,p.projects=e.query(),p.projectsDisplay=[].concat(p.projects),p.collaborators=f.query({id:"others"})}angular.module("project",["smart-table","mgcrea.ngStrap"]).controller("ProjectsCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Project","Collaborator","$filter"]}(),function(){function a(a,b,c,d,e){function f(b){a.ActiveProject.project=b,a.ActivePlate.plate="",a.activePlateResult.plate=""}var g=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,g.setActiveProject=f,g.projects=e.query(),g.projectsDisplay=[].concat(g.projects)}angular.module("projectpanel",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("admahesProjectpanel",function(){return{restrict:"E",scope:{asideind:"="},controller:"ProjectsPanelCtrl",controllerAs:"projpanVm",templateUrl:"project/project.panel.html"}}).controller("ProjectsPanelCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Project"]}(),function(){function a(a,b,c,d,e,f){function g(b){a.ActivePlate.plate=b,a.activePlateResult.plate=""}function h(a){n.plateAction="new",n.newplate={name:"",label:"",numberOfRows:"",numberOfColumns:"",barcode:"",protocolId:"",wellLabels:[]},n.newplate.projectId=a.id}function i(a){n.plateAction="edit",n.newplate=JSON.parse(JSON.stringify(a))}function j(a,b){if("new"==a){var c=e.save(n.newplate);n.plates=n.plates.concat(c)}else e.update({id:n.newplate.id},n.newplate),b.project=n.newplate.project,b.name=n.newplate.name,b.label=n.newplate.label,b.numberOfRows=n.newplate.numberOfRows,b.numberOfColumns=n.newplate.numberOfColumns,b.barcode=n.newplate.barcode,b.protocolId=n.newplate.protocolId,b.wellLabels=n.newplate.wellLabels}function k(a,b){a.push({name:b})}function l(a){e["delete"]({id:a.id});var b=n.plates.indexOf(a);n.plates.splice(b,1)}function m(){a.ActiveProject.project="",a.ActivePlate.plate="",a.activePlateResult.plate=""}var n=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,n.aside=!0,n.setActivePlate=g,n.addNewPlate=h,n.editPlate=i,n.saveChangesPlate=j,n.addLabel=k,n.deletePlate=l,n.clearActiveProject=m,n.plates=e.query(),n.platesDisplay=[].concat(n.plates)}angular.module("plate",["smart-table","mgcrea.ngStrap"]).controller("PlateCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Plate","$filter"]}(),function(){function a(a,b,c,d,e){function f(b){a.ActivePlate.plate=b,a.activePlateResult.plate=""}var g=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,g.setActivePlate=f,g.plates=e.query(),g.platesDisplay=[].concat(g.plates)}angular.module("platepanel",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("admahesPlatepanel",function(){return{restrict:"E",scope:{asideind:"="},controller:"PlatesPanelCtrl",controllerAs:"platepanVm",templateUrl:"plate/plate.panel.html"}}).controller("PlatesPanelCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Plate"]}(),function(){function a(a,b,c,d,e,f,g){function h(){l.multiselectWell.mode&&(l.multiselectWell.secondwell_row="",l.multiselectWell.secondwell_column=""),l.multiselectWell.mode=!1}function i(a,b){l.multiselectWell.mode=!0,l.multiselectWell.firstwell_row=a.row,l.multiselectWell.firstwell_column=a.column}function j(a,b){l.multiselectWell.mode&&(l.multiselectWell.secondwell_row="",l.multiselectWell.secondwell_column=""),l.multiselectWell.mode=!1}function k(a,b){if(l.multiselectWell.mode){""===l.multiselectWell.secondwell_row&&c(l.rowsOneDim,l.dropWellGroup),l.multiselectWell.secondwell_row=a.row,l.multiselectWell.secondwell_column=a.column;var d,e,f,g;l.multiselectWell.firstwell_row>=l.multiselectWell.secondwell_row?(d=l.multiselectWell.firstwell_row,e=l.multiselectWell.secondwell_row):(d=l.multiselectWell.secondwell_row,e=l.multiselectWell.firstwell_row),l.multiselectWell.firstwell_column>=l.multiselectWell.secondwell_column?(f=l.multiselectWell.firstwell_column,g=l.multiselectWell.secondwell_column):(f=l.multiselectWell.secondwell_column,g=l.multiselectWell.firstwell_column);for(var h=0;h<b.length;h++)b[h].condSelected=!1,b[h].row>=e&&b[h].row<=d&&b[h].column>=g&&b[h].column<=f&&(b[h].condSelected=!0)}}var l=this;l.leftTable=h,l.mouseDownWell=i,l.mouseUpWell=j,l.mouseOverWell=k,l.boxsz="30",l.tooltipdel="500",l.dropWellGroup={checked:"true"},l.filterPlateEditor={},l.uniqueLabelValues=[],l.uniqueLabelValuesColors=[],l.selectedLabel={},l.selectedUniqValue={},l.selectedLabelColor={color:"#FFFFFF"},l.itemsByPage=10,l.aside=!1,a.ActiveProject=b.activeId,l.filterPlateEditor.plotLabelName="",l.filterPlateEditor.labelValueColors={},l.filterPlateEditor.wellgroup=[],l.filterPlateEditor.labels={},l.rows=[],l.rowsDisplay=[].concat(l.rows),l.labels=[],l.labelsDisplay=[].concat(l.labels),l.filterPlateEditor.labels=l.labels}angular.module("plateeditor",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).controller("PlateeditorCtrl",a),a.$inject=["$scope","activeProject","resetSelection","filterColorFilter","filterBorder3Filter","filterHoverFilter","filterControlFilter"]}(),function(){angular.module("resetsel",[]).factory("resetSelection",function(){return function(a,b){for(var c=0;c<a.length;c++)a[c].isSelected=!1,a[c].condSelected=!1;b.checked="true"}})}(),function(){function a(a){function b(a,b,f,g){var h,j,k,l={},m={};if(f.checked="true",i.uniqueLabelValues=[],i.uniqueLabelValuesColors=[],null!=a&&null!=b){var n=e(a,b);if(0!=n.length&&null!=n){j=300/n.length,console.log(JSON.stringify(j,null,4)),m={};for(var o=0;o<n.length;o++){k=d((o*j+20)/360,1,.5),console.log(JSON.stringify(n[o].name,null,4)),console.log(JSON.stringify((o*j+20)/360,null,4));var p=0!=k[0].toString(16)?c(k[0].toString(16),2):"00",q=0!=k[1].toString(16)?c(k[1].toString(16),2):"00",r=0!=k[2].toString(16)?c(k[2].toString(16),2):"00";h="#"+p+q+r,console.log(JSON.stringify(h,null,4)),l={},l.name=n[o].name,l.description=n[o].name+'&nbsp;&nbsp;<label style="background-color:'+h+';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>',l.color=h,i.uniqueLabelValues.push(l),m[n[o].name]=h}}i.uniqueLabelValuesDisplay=[].concat(i.uniqueLabelValues),i.uniqueLabelValuesColors=m,g.plotLabelName=b,g.labelValueColors=i.uniqueLabelValuesColors}}function c(a,b){for(var c=a+"";c.length<b;)c="0"+c;return c}function d(a,b,c){var d,e,f;if(0==b)d=e=f=c;else{var g=function(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a},h=.5>c?c*(1+b):c+b-c*b,i=2*c-h;d=g(i,h,a+1/3),e=g(i,h,a),f=g(i,h,a-1/3)}return[Math.round(255*d),Math.round(255*e),Math.round(255*f)]}function e(a,b){for(var c=[],d=[],e=0;e<a.length;e++)for(var g=0;g<a[e].length;g++)null==a[e][g][b]||f(c,a[e][g][b])||(c.push(a[e][g][b]),d.push({name:a[e][g][b]}));return d}function f(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1}function g(a,b,c){c.copyLabel=a,b.checked=""}function h(a,b,c){i.uniqueLabelValuesColors[a]=b,c.labelValueColors=i.uniqueLabelValuesColors}var i=this;i.setUniqLabelValues=b,i.setModeCopyLabelValue=g,i.updateUniqLabelValues=h,i.uniqueLabelValues=[],i.uniqueLabelValuesDisplay=[],i.uniqueLabelValuesColors=[]}angular.module("plotlabels",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("adamhesPlotlabels",function(){return{restrict:"E",scope:{asideind:"=",labelsdisplay:"=",dropwellgroup:"=",rows:"=",filterplateeditor:"="},templateUrl:"plateeditor/plotlabels/plotlabels.html",controller:a,controllerAs:"plotlbVm"}}),a.$inject=["resetSelection"]}(),function(){function a(){function a(a,b,c){if(null!=b.plotLabelName&&null!=a&&null!=b.copyLabel&&(a.color=b.copyLabel.color,a[b.plotLabelName]=b.copyLabel.name,a.condSelected))for(var d=0;d<c.length;d++)c[d].condSelected&&(c[d].color=b.copyLabel.color,c[d][b.plotLabelName]=b.copyLabel.name)}var b=this;b.updateWell=a}angular.module("singlewell",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("adamhesSinglewell",function(){return{restrict:"E",scope:{well:"=",boxsize:"@",tooltipdelay:"@",filterarg:"=",dropgroup:"=",labels:"=",rows:"="},templateUrl:"plateeditor/singlewell/singlewell.html",controller:a,controllerAs:"singlewellVm"}})}(),function(){angular.module("wellattrfilter",[]).filter("filterBorder3",function(){return function(a,b){return a.condSelected?"border:2px dashed red;":"border:2px solid black;"}}).filter("filterColor",function(){return function(a,b){var c;if(null!=b&&null!=a){var d=a[b.plotLabelName];if(null!=d&&""!=d){var e=b.labelValueColors[d];return null!=e?(a.color=e,c="."===a.controltype?e:"black","color:"+c+";background-color:"+e):"."===a.controltype?"color:#FF0000;background-color:#FF0000":"color:black;background-color:#FF0000"}return"."===a.controltype?"color:#FFFFFF;background-color:#FFFFFF":"color:black;background-color:#FFFFFF"}return"color:#FFFFFF;background-color:#FFFFFF"}}).filter("filterHover",function(){return function(a,b){var c="";if(null!=b.labels&&null!=a){for(var d=0;d<b.labels.length;d++)c+=null!=a[b.labels[d].name]?" "+a[b.labels[d].name]:" n/a";c+=" "+a.controltype}return c}}).filter("filterControl",function(){return function(a,b){var c="";return c=a.controltype.substr(0,1)}})}(),function(){function a(a){function b(a,b,c,d){d.checked="true";for(var e,f=0;f<c.length;f++){e="true";for(var g=0;g<b.length&&e;g++)a[b[g].name]!=c[f][b[g].name]&&(e=!1);a.controltype!=c[f].controltype&&(e=!1),e&&(c[f].condSelected=a.isSelected?!0:!1)}}function c(a,b){$scope.uniqueLabelValuesColors[a[$scope.filterPlateEditor.plotLabelName]]=b;for(var c=0;c<$scope.uniqueLabelValues.length;c++)$scope.uniqueLabelValues[c].name===a[$scope.filterPlateEditor.plotLabelName]&&($scope.uniqueLabelValues[c].color=b)}var d=this;d.test1="test1",d.test2={name:"test2"},d.resetSelection=a,d.toogleRowSelection=b,d.updateWellUniqLabelValues=c}angular.module("wellstable",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("adamhesWellstable",function(){return{restrict:"E",scope:{rowsonedimw:"=",rowsonedimdisplayw:"=",labelsdisplayw:"=",dropwellgroup:"="},templateUrl:"plateeditor/wellstable/wells.table.html",controller:a,controllerAs:"wellstabVm"}}),a.$inject=["resetSelection"]}(),angular.module("adamServices",["ngResource"]).service("activeProject",function(){var a=this;a.project=""}).service("activePlate",function(){var a=this;a.plate=""}).service("activePlateResult",function(){var a=this;a.name=""}),function(){angular.module("navbarAdam",[]).directive("admahesNavbar",function(){return{restrict:"E",scope:{},templateUrl:"layout/navbaradam.html"}})}(),function(){angular.module("project.data.model",[]).factory("Project",["$resource",function(a){return a("http://54.149.197.234/adam/rest/project/:id",{},{update:{method:"PUT"}})}])}(),function(){angular.module("plate.data.model",[]).factory("Plate",["$resource",function(a){return a("http://54.149.197.234/adam/rest/plate/:id",{},{update:{method:"PUT"}})}])}(),function(){angular.module("collaborator.data.model",[]).factory("Collaborator",["$resource",function(a){return a("http://54.149.197.234/adam/rest/user/:id",{},{update:{method:"PUT"}})}])}();