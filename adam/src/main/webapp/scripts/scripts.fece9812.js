"use strict";!function(){function a(a,b){a.when("/projects",{templateUrl:"project/project.html",controller:"ProjectsCtrl",controllerAs:"projVm"}).when("/plates",{templateUrl:"plate/plate.html",controller:"PlateCtrl",controllerAs:"plateVm"}).when("/plateeditor",{templateUrl:"plateeditor/plateeditor.html",controller:"PlateeditorCtrl",controllerAs:"pleditVm"}).when("/plateresults",{templateUrl:"plateresult/plateresult.html",controller:"PlateResultsCtrl",controllerAs:"plresVm"}).when("/qc",{templateUrl:"qc/qc.html",controller:"QcCtrl",controllerAs:"qcVm"}).otherwise({redirectTo:"/projects"})}angular.module("adamApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","smart-table","mgcrea.ngStrap","ngSlider","adamServices","navbarAdam","project","projectpanel","project.data.model","plate","plate.data.model","platepanel","collaborator.data.model","plateeditor","resetsel","plotlabels","singlewell","wellstable","wellattrfilter"]).config(a),a.$inject=["$routeProvider","$resourceProvider"]}(),function(){function a(a,b,c,d,e,f,g){function h(a,b){e["delete"]({id:b.id});var c=a.indexOf(b);a.splice(c,1)}function i(){p.projectAction="new",p.newproject={name:"",description:"",label:"",tags:[],collaborators:[]}}function j(a){p.projectAction="edit",p.newproject=JSON.parse(JSON.stringify(a))}function k(a,b){if("new"==a){var c=e.save(p.newproject);p.projects=p.projects.concat(c)}else e.update({id:p.newproject.id},p.newproject),b.name=p.newproject.name,b.description=p.newproject.description,b.label=p.newproject.label,b.tags=p.newproject.tags,b.collaborators=p.newproject.collaborators}function l(b){a.ActiveProject.project=b,a.ActivePlate.plate="",a.activePlateResult.plate=""}function m(a,b){a.push({description:b})}function n(a){p.filterowner=a?"ivan":""}function o(a,b){a.push(b)}var p=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,p.filterowner="",p.editProject=j,p.addNewProject=i,p.saveChangesProject=k,p.setActiveProject=l,p.addTag=m,p.checkedOwner=n,p.addCollaborator=o,p.deletePr=h,p.projects=e.query(),p.projectsDisplay=[].concat(p.projects),p.collaborators=f.query({id:"others"})}angular.module("project",["smart-table","mgcrea.ngStrap"]).controller("ProjectsCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Project","Collaborator","$filter"]}(),function(){function a(a,b,c,d,e){function f(b){a.ActiveProject.project=b,a.ActivePlate.plate="",a.activePlateResult.plate=""}var g=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,g.setActiveProject=f,g.projects=e.query(),g.projectsDisplay=[].concat(g.projects)}angular.module("projectpanel",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("admahesProjectpanel",function(){return{restrict:"E",scope:{asideind:"="},controller:"ProjectsPanelCtrl",controllerAs:"projpanVm",templateUrl:"project/project.panel.html"}}).controller("ProjectsPanelCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Project"]}(),function(){function a(a,b,c,d,e,f){function g(b){c.plate=b,c.plate.wellsDisplay=[].concat(c.plate.wells),a.activePlateResult.plate=""}function h(a){o.plateAction="new",o.newplate={name:"",label:"",numberOfRows:"",numberOfColumns:"",barcode:"",protocolId:"",wellLabels:[],controlTypes:[{name:"positive",displayChar:"p"},{name:"negative",displayChar:"n"}]},o.newplate.projectId=a.id}function i(a){o.plateAction="edit",o.newplate=JSON.parse(JSON.stringify(a))}function j(a,b){if("new"==a){var c=e.save(o.newplate);o.plates=o.plates.concat(c)}else e.update({id:o.newplate.id},o.newplate),b.project=o.newplate.project,b.name=o.newplate.name,b.label=o.newplate.label,b.numberOfRows=o.newplate.numberOfRows,b.numberOfColumns=o.newplate.numberOfColumns,b.barcode=o.newplate.barcode,b.protocolId=o.newplate.protocolId,b.wellLabels=o.newplate.wellLabels}function k(a,b){a.push({name:b})}function l(a,b,c){a.push({name:b,displayChar:c})}function m(a){e["delete"]({id:a.id});var b=o.plates.indexOf(a);o.plates.splice(b,1)}function n(){a.ActiveProject.project="",a.ActivePlate.plate="",a.activePlateResult.plate=""}var o=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,o.aside=!0,o.setActivePlate=g,o.addNewPlate=h,o.editPlate=i,o.saveChangesPlate=j,o.addLabel=k,o.addControlType=l,o.deletePlate=m,o.clearActiveProject=n,o.plates=e.query(),o.platesDisplay=[].concat(o.plates)}angular.module("plate",["smart-table","mgcrea.ngStrap"]).controller("PlateCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Plate","$filter"]}(),function(){function a(a,b,c,d,e){function f(b){c.plate=b,c.plate.wellsDisplay=[].concat(c.plate.wells),a.activePlateResult.plateresult=""}var g=this;a.ActiveProject=b,a.ActivePlate=c,a.activePlateResult=d,g.setActivePlate=f,g.plates=e.query(),g.platesDisplay=[].concat(g.plates)}angular.module("platepanel",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("admahesPlatepanel",function(){return{restrict:"E",scope:{asideind:"="},controller:"PlatesPanelCtrl",controllerAs:"platepanVm",templateUrl:"plate/plate.panel.html"}}).controller("PlatesPanelCtrl",a),a.$inject=["$scope","activeProject","activePlate","activePlateResult","Plate"]}(),function(){function a(a,b,c,d,e,f,g,h,i){function j(){n.multiselectWell.mode&&(n.multiselectWell.secondwell_row="",n.multiselectWell.secondwell_column=""),n.multiselectWell.mode=!1}function k(a,b){n.multiselectWell.mode=!0,n.multiselectWell.firstwell_row=a.row,n.multiselectWell.firstwell_column=a.col}function l(a,b){n.multiselectWell.mode&&(n.multiselectWell.secondwell_row="",n.multiselectWell.secondwell_column=""),n.multiselectWell.mode=!1}function m(a,b){if(n.multiselectWell.mode){""===n.multiselectWell.secondwell_row&&d(b,n.dropWellGroup),n.multiselectWell.secondwell_row=a.row,n.multiselectWell.secondwell_column=a.col;var c,e,f,g;n.multiselectWell.firstwell_row>=n.multiselectWell.secondwell_row?(c=n.multiselectWell.firstwell_row,e=n.multiselectWell.secondwell_row):(c=n.multiselectWell.secondwell_row,e=n.multiselectWell.firstwell_row),n.multiselectWell.firstwell_column>=n.multiselectWell.secondwell_column?(f=n.multiselectWell.firstwell_column,g=n.multiselectWell.secondwell_column):(f=n.multiselectWell.secondwell_column,g=n.multiselectWell.firstwell_column);for(var h=0;h<b.length;h++)b[h].condSelected=!1,b[h].row>=e&&b[h].row<=c&&b[h].col>=g&&b[h].col<=f&&(b[h].condSelected=!0)}}var n=this;n.leftTable=j,n.mouseDownWell=k,n.mouseUpWell=l,n.mouseOverWell=m,n.boxsz="30",n.tooltipdel="500",n.dropWellGroup={checked:"true"},n.filterPlateEditor={},n.uniqueLabelValues=[],n.uniqueLabelValuesColors=[],n.selectedLabel={},n.selectedUniqValue={},n.selectedLabelColor={color:"#FFFFFF"},n.itemsByPage=10,n.aside=!1,n.multiselectWell={firstwell_row:"",firstwell_column:"",secondwell_row:"",secondwell_column:"",mode:!1},a.ActiveProject=b.project,a.ActivePlate=c,n.filterPlateEditor.plotLabelName="",n.filterPlateEditor.labelValueColors={},n.filterPlateEditor.wellgroup=[],n.filterPlateEditor.labels={}}angular.module("plateeditor",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).controller("PlateeditorCtrl",a),a.$inject=["$scope","activeProject","activePlate","resetSelection","filterColorFilter","filterBorder3Filter","filterHoverFilter","filterControlFilter","rangeFilter"]}(),function(){angular.module("resetsel",[]).factory("resetSelection",function(){return function(a,b){for(var c=0;c<a.length;c++)a[c].isSelected=!1,a[c].condSelected=!1;b.checked="true"}})}(),function(){function a(a){function b(a,b,f,g){var h,j,k,l={},m={};if(f.checked="true",i.uniqueLabelValues=[],i.uniqueLabelValuesColors=[],null!=a&&null!=b){var n=e(a,b);if(0!=n.length&&null!=n){j=300/n.length,console.log(JSON.stringify(j,null,4)),m={};for(var o=0;o<n.length;o++){k=d((o*j+20)/360,1,.5),console.log(JSON.stringify(n[o].name,null,4)),console.log(JSON.stringify((o*j+20)/360,null,4));var p=0!=k[0].toString(16)?c(k[0].toString(16),2):"00",q=0!=k[1].toString(16)?c(k[1].toString(16),2):"00",r=0!=k[2].toString(16)?c(k[2].toString(16),2):"00";h="#"+p+q+r,console.log(JSON.stringify(h,null,4)),l={},l.name=n[o].name,l.description=n[o].name+'&nbsp;&nbsp;<label style="background-color:'+h+';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>',l.color=h,i.uniqueLabelValues.push(l),m[n[o].name]=h}}i.uniqueLabelValuesDisplay=[].concat(i.uniqueLabelValues),i.uniqueLabelValuesColors=m,g.plotLabelName=b,g.labelValueColors=i.uniqueLabelValuesColors}}function c(a,b){for(var c=a+"";c.length<b;)c="0"+c;return c}function d(a,b,c){var d,e,f;if(0==b)d=e=f=c;else{var g=function(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a},h=.5>c?c*(1+b):c+b-c*b,i=2*c-h;d=g(i,h,a+1/3),e=g(i,h,a),f=g(i,h,a-1/3)}return[Math.round(255*d),Math.round(255*e),Math.round(255*f)]}function e(a,b){for(var c=[],d=[],e=0;e<a.length;e++)null==a[e][b]||f(c,a[e][b])||(c.push(a[e][b]),d.push({name:a[e][b]}));return d}function f(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1}function g(a,b,c){c.copyLabel=a,b.checked=""}function h(a,b,c){i.uniqueLabelValuesColors[a]=b,c.labelValueColors=i.uniqueLabelValuesColors}var i=this;i.setUniqLabelValues=b,i.setModeCopyLabelValue=g,i.updateUniqLabelValues=h,i.uniqueLabelValues=[],i.uniqueLabelValuesDisplay=[],i.uniqueLabelValuesColors=[]}angular.module("plotlabels",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("adamhesPlotlabels",function(){return{restrict:"E",scope:{asideind:"=",labelsdisplay:"=",dropwellgroup:"=",rows:"=",filterplateeditor:"="},templateUrl:"plateeditor/plotlabels/plotlabels.html",controller:a,controllerAs:"plotlbVm"}}),a.$inject=["resetSelection"]}(),function(){function a(a,b,c,d,e){function f(a,b,c,d){if(null!=b.plotLabelName&&null!=a&&null!=b.copyLabel&&(a.color=b.copyLabel.color,a[b.plotLabelName]=b.copyLabel.name,a.condSelected))for(var f=0;f<c.length;f++)c[f].condSelected&&(c[f].color=b.copyLabel.color,c[f][b.plotLabelName]=b.copyLabel.name);e.update({id:d.id},d)}var g=this;g.updateWell=f}angular.module("singlewell",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("adamhesSinglewell",function(){return{restrict:"E",scope:{well:"=",boxsize:"@",tooltipdelay:"@",filterarg:"=",dropgroup:"=",labels:"=",rows:"=",controltypes:"=",plate:"="},templateUrl:"plateeditor/singlewell/singlewell.html",controller:a,controllerAs:"singlewellVm"}}),a.$inject=["filterColorFilter","filterBorder3Filter","filterHoverFilter","filterControlFilter","Plate"]}(),function(){angular.module("wellattrfilter",[]).filter("filterBorder3",function(){return function(a,b){return a.condSelected?"border:2px dashed red;":"border:2px solid black;"}}).filter("filterColor",function(){return function(a,b){var c;if(null!=b&&null!=a){var d=a[b.plotLabelName];if(null!=d&&""!=d){var e=b.labelValueColors[d];return null!=e?(a.color=e,c=""===a.controlType?e:"black","color:"+c+";background-color:"+e):""===a.controlType?"color:#FF0000;background-color:#FF0000":"color:black;background-color:#FF0000"}return""===a.controlType?"color:#FFFFFF;background-color:#FFFFFF":"color:black;background-color:#FFFFFF"}return"color:#FFFFFF;background-color:#FFFFFF"}}).filter("filterHover",function(){return function(a,b){var c="";if(null!=b&&null!=a){for(var d=0;d<b.length;d++)c+=null!=a[b[d].name]?" "+a[b[d].name]:" n/a";c+=" "+a.controlType}return c}}).filter("filterControl",function(){return function(a,b){var c=".";if(null===a.controlType||""===a.controlType)c=".";else for(var d=0;d<b.length;d++)a.controlType===b[d].name&&(c=b[d].displayChar);return c}}).filter("range",function(){return function(a,b,c){b=parseInt(b),c=parseInt(c);for(var d=b;c>=d;d++)a.push(d);return a}})}(),function(){function a(a){function b(a,b,c,d){d.checked="true";for(var e,f=0;f<c.length;f++){e="true";for(var g=0;g<b.length&&e;g++)a[b[g].name]!=c[f][b[g].name]&&(e=!1);a.controltype!=c[f].controltype&&(e=!1),e&&(c[f].condSelected=a.isSelected?!0:!1)}}function c(a,b){}var d=this;d.resetSelection=a,d.toogleRowSelection=b,d.updateWellUniqLabelValues=c}angular.module("wellstable",["ngAnimate","ngSanitize","smart-table","mgcrea.ngStrap"]).directive("adamhesWellstable",function(){return{restrict:"E",scope:{rowsonedimw:"=",rowsonedimdisplayw:"=",labelsdisplayw:"=",dropwellgroup:"="},templateUrl:"plateeditor/wellstable/wells.table.html",controller:a,controllerAs:"wellstabVm"}}),a.$inject=["resetSelection"]}(),angular.module("adamServices",["ngResource"]).service("activeProject",function(){var a=this;a.project=""}).service("activePlate",function(){var a=this;a.plate=""}).service("activePlateResult",function(){var a=this;a.name=""}),function(){angular.module("navbarAdam",[]).directive("admahesNavbar",function(){return{restrict:"E",scope:{},templateUrl:"layout/navbaradam.html"}})}(),function(){angular.module("project.data.model",[]).factory("Project",["$resource",function(a){return a("http://54.149.197.234/adam/rest/project/:id",{},{update:{method:"PUT"}})}])}(),function(){angular.module("plate.data.model",[]).factory("Plate",["$resource",function(a){return a("http://54.149.197.234/adam/rest/plate/:id",{},{update:{method:"PUT"}})}])}(),function(){angular.module("collaborator.data.model",[]).factory("Collaborator",["$resource",function(a){return a("http://54.149.197.234/adam/rest/user/:id",{},{update:{method:"PUT"}})}])}();