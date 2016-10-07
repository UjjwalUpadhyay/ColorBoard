var app = angular.module('app',[]);
app.controller("gameController", ['$scope', '$interval', function($scope, $interval) {
  $scope.level = 5;
  $scope.count = 0;
  $scope.gameCount = 1;
  $scope.maxGames = 3;
  $scope.disableBtns = false;
  $scope.initCells = function () {
    $scope.gameCount = 1;
    $scope.count = 0;

    var el = document.querySelectorAll('.cell');
    for (var i=0;i<16;i++) {
      if (el[i].style.backgroundColor==='red') {
        el[i].style.backgroundColor="#fff";
      }
    }
  }
  $scope.startGame = function() {
    $scope.disableBtns = true;
    //Uncolor all the cells on the start
    $scope.initCells();
    $scope.colorElements($scope.level);
    $scope.interval();
  }
  $scope.interval = function () {
    var promise = $interval(function () {
      if($scope.count===$scope.level) {
        $interval.cancel(promise);
      }else if($scope.gameCount === $scope.maxGames) {
        $scope.disableBtns = false;
        $scope.gameCount = 1;
        alert("You Lost the game! Start again.");
        $scope.initCells();
        $interval.cancel(promise);
      } else {
        $scope.gameCount++;
        $scope.colorElements($scope.count);
        $scope.count = 0;
      }
    }, 4000);
  }
  $scope.unColor = function($event) {
    if ($event.target.style.backgroundColor === "red") {
        $event.target.style.backgroundColor = "#fff";
        $scope.count++;
        if($scope.count===$scope.level) {
          alert ("You won the game");
          $scope.disableBtns = false;
        }
    }
  }
  $scope.colorElements = function(toColor) {
    var el = document.querySelectorAll('.cell');
    for (var i=0; i<toColor;) {
      var index = Math.floor(Math.random()*1000)%16;
      if (el[index].style.backgroundColor!=='red'){
          el[index].style.backgroundColor = "red";
          i++;
        }
    }
  }
}]);
