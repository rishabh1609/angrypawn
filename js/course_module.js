Parse.initialize("qc3ZW7dP2SN3eOzO6fmruWeu4t8IFMCeixHPT63I", "7CqN2NfFitXg6TQWwTkphWZUJrxvlXfiwq6VNrGX");
var myApp = angular.module('myApp', ['infinite-scroll']);
myApp.controller("coursecontroller", function ($scope, $http) {
    var i = 0;
    $scope.number = 1;
    $scope.end = true;
    $scope.coursemodal={}
    $scope.names = [];
    $scope.start = 0;
    $scope.openmodal = function(course){
        $scope.coursemodal=course;
        Parse.Cloud.run('getCourseInformation',{
                courseid: course.CourseID
            },{
                success: function(success){
                     document.getElementById("Description").innerHTML=success[0].toJSON().Description;
                    $('#portfolioModal').modal();
                },
                error :  function(error){
                    $('#portfolioModal').modal();
                }
            });
        
    }
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        for (i = 0; i < $scope.names.length; i = i + 1) {
            $("#" + $scope.names[i].CourseID).rating("refresh", {
                disabled: true,
                showCaption: false,
                showClear: false,
                size: "xs"
            });
            $("#" + $scope.names[i].CourseID).rating("update", $scope.names[i].Rating);
            
        }
        $scope.start = $scope.names.length;
    });
    $scope.fetchnext = function () {

        if (!$scope.end) {
            $scope.end = true;
            Parse.Cloud.run('exportCourse1', {
                skip: $scope.number * 20
            }, {
                success: function (success) {

                    $scope.number = $scope.number + 1;
                    for (i = 0; i < success.length; i = i + 1) {
                        $scope.names.push(success[i].toJSON());
                    }

                    if (success.length === 0) {
                        $scope.end = true;
                    } else {
                        $scope.end = false;
                    }
                    $http.get("https://www.angrypawn.com/file.html")
                    //$http.get("http://127.0.0.1:54862/file.html")
                        .success(function (response) {});
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    };
    $scope.onPageLoad = function () {
        $scope.names.length = 0;
        Parse.Cloud.run('exportCourse1', {
            skip: 0
        }, {
            success: function (success) {

                //$scope.number = $scope.number + 1;
                for (i = 0; i < success.length; i = i + 1) {
                    $scope.names.push(success[i].toJSON());
                }
                if (!$('#loader').is(':hidden')) {
                    $('#loader').hide();
                }

                if (success.length == 0)
                    $scope.end = true;
                else
                    $scope.end = false;
                $http.get("https://www.angrypawn.com/file.html")
                //$http.get("http://127.0.0.1:54862/file.html")
                    .success(function (response) {});
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    $scope.searchCourse = function () {
        document.getElementById("loader").innerHTML="Searching"
        $('#loader').show();
        document.getElementById("searchButton").disabled=true;
        $scope.names.length = 0;
        $scope.end=true;

        Parse.Cloud.run('searchCourse',{search: document.getElementById("srch-term").value}, {
            success: function (success) {
                console.log(success);
                for (i = 0; i < success.length; i = i + 1) {
                    $('#loader').hide();
                    $scope.names.push(success[i].toJSON());
                }
                if($scope.names.length==0){
                    document.getElementById("loader").innerHTML="No Courses found :-("
                    $('#loader').show();
                }
                document.getElementById("searchButton").disabled=false;

                $http.get("https://www.angrypawn.com/file.html")
                //$http.get("http://127.0.0.1:54862/file.html")
                    .success(function (response) {});
            },
            error: function (error) {
                console.log(error);
            }
        });  
    }
    $scope.onPageLoad();
});
myApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
}); 

