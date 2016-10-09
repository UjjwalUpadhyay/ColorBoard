var app = angular.module('app',[]);
app.controller("gameController", ['$scope', '$interval', function($scope, $interval) {
  $scope.level = 5;
  $scope.count = 0;
  $scope.gameCount = 1;
  $scope.maxGames = 3;
  $scope.disableBtns = false;
  $scope.gridCells = [{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false},{colored: false}];
  //Initialize the gameCount, count and set all colors back to uncolored
  $scope.initCells = function () {
    $scope.gameCount = 1;
    $scope.count = 0;
    for (var i=0; i<$scope.gridCells.length; i++) {
        $scope.gridCells[i].colored=false;
    }
  }
  //Function to call start of the game
  $scope.startGame = function() {
    $scope.disableBtns = true;
    //Uncolor all the cells on the start
    $scope.initCells();
    $scope.colorElements($scope.level);
    $scope.interval();
  }
  //Interval wherein the game continues for the number of chances given by user
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
  //Function to set the color of the cell as white on clicking any colored cell
  $scope.unColor = function(cell) {
     if (cell.colored) {
        cell.colored = false;
        $scope.count++;
        if($scope.count===$scope.level) {
          alert ("You won the game");
          $scope.disableBtns = false;
        }
    }
  }
  //Color the cells randomly in the grid
  $scope.colorElements = function(toColor) {
    for (var i=0; i<toColor;) {
      var index = Math.floor(Math.random()*1000)%16;
      if ($scope.gridCells[index].colored===false){
          $scope.gridCells[index].colored=true;
          i++;
        }
    }
  }
}]);
