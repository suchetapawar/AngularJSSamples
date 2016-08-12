var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function($routeProvider) {
	$routeProvider
		.when('/welcome', {
			templateUrl: "partials/welcome.html",
			controller: 'WelcomeCtrl'
		})
		.when('/scheduletour', {
			templateUrl: "partials/scheduletour.html",
			controller: 'TourCtrl'
		})
		.when("/progs", {
			templateUrl: "partials/progs.html",
			//controller: "KartListCtrl"
		})
		.when("/contactus", {
			templateUrl: "partials/contactus.html",
			//controller: "KartListCtrl"
		})
		.when("/getadmission", {
			templateUrl: "partials/admission.html",
			controller: "AdmissionCtrl"
		})
		.when("/selectclass", {
			templateUrl: "partials/classes.html",
			controller: "ClassCtrl"
		})
		.otherwise({
			redirectTo: "/welcome"
		});
});

myApp.factory("classService", function() {
	var classes = [
	{
			
			number: 1,
			rating: 5,
			strength: 4,
			teacher: "Rachel",
			
			details: "This is highest rated class",
			students: [{childname: 'Alexandre',age:'3', parentname:'Cathy', email:'cathy@gmail.com', contactnumber:'123-456-7890'},
				    {childname: 'Monica',age:'4', parentname:'Natali', email:'natali@gmail.com', contactnumber:'123-456-7890'},
				{childname: 'John',age:'4', parentname:'Peter', email:'peter@hotmail.com', contactnumber:'123-456-7890'},
				{childname: 'Andrew',age:'4', parentname:'Linda', email:'linda@yahoo.com', contactnumber:'123-456-7890'}
			]
			
	},
	
	{
			
			number: 2,
			rating: 4.5,
			strength: 2,
			teacher: "Sarah",
			
			details: "This is very good class",
			students: [{childname: 'Mike',age:'3', parentname:'Helen', email:'helen@hotmail.com', contactnumber:'123-456-7890'},
				    {childname: 'Amy',age:'4', parentname:'Frank', email:'frank@gmail.com', contactnumber:'123-456-7890'}
			]
			
	}
	];
	return {
		getClasses: function() {
			return classes;
		},
		assignClass: function(student, classid) {
			classes[classid].students.push(student);
			alert("Congratulations!!"  + student.childname + " has got an admission in Class " + (classid + 1));
		}
		
	}
});


myApp.factory("studentService", function() {
	var student = [];
	return {
		getCurrentStudent: function() {
			return student;
		},
		setCurrentStudent: function(inputStudent) {
			student = inputStudent;	
		}
	}
});

myApp.controller("ClassCtrl", function($scope, classService, studentService) {
	$scope.classes= classService.getClasses();
	$scope.student= studentService.getCurrentStudent();
	$scope.assignClass = function(student, classid) {
		classService.assignClass(student, classid-1);
	}

});

myApp.controller("AdmissionCtrl", function($scope, $location,  studentService) {
	$scope.setCurrentStudent = function(student) {

		studentService.setCurrentStudent(student);
		$location.path('/selectclass');
	};
 
});


myApp.controller("WelcomeCtrl", function($scope, $location) {
	
	$scope.changeView = function(view){
            $location.path(view); // path not hash
        }
});

myApp.controller("TourCtrl", function($scope, $location) {
	
	$scope.changeView = function(view){
            $location.path(view); // path not hash
        }
});

myApp.controller("HeaderCtrl", function($scope, $location) {

	$scope.appDetails = {};
	$scope.appDetails.title = "ABC Preschool";
	$scope.appDetails.tagline = "We nurture the childhood";
	
	$scope.nav = {};
	$scope.nav.isActive = function(path) {
		if (path === $location.path()) {
			return true;
		}
		
		return false;
	}

});
