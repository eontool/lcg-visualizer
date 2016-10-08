var app = angular.module('mainApp', []);

app.controller('mainCtrl', ['$scope', function(scope){

  //equation variables
  scope._x = null;
  scope._s = 1;
  scope._a = 2;
  scope._c = 3;
  scope._m = 5;

  scope.generateSequence = function(){
    scope._sequence = [];
    let n = lcg(null, scope._s, scope._a, scope._c, scope._m);
    for (let i = 0; i < scope._m-1; i++) {
      scope._sequence.push(n.next().value);
    }
    console.log(scope._sequence);
    if(myChart){
      console.log('update chart.');
      myChart.data.labels = [...Array(scope._sequence.length).keys()];
      myChart.data.datasets[0].data = scope._sequence;
      myChart.update();
    }
  }

  scope.sequence = [];

  scope.generateSequence();

  //lcg generator
  function *lcg(x, seed, a , c , m ){
    if( x + seed == m){
      yield (a * x + c) % m;
    }
    if(x == null){
      x = (a * seed + c) % m;
    }
    else{
      x = (a * x + c) % m;
    }
    yield x;
    yield *lcg(x, seed, a, c, m);
  }

  //chart configuration
  var ctx = $("#sequenceChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [...Array(scope._sequence.length).keys()],
        datasets: [{
          label: "LCG Value",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#000000",
            borderColor: "#000000",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#000000",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#666666",
            pointHoverBorderColor: "#333333",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: scope._sequence,
            borderWidth: 1,
        }]
    },
    options: {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero:true
          }
        }],
        xAxes: [{
          display: false,
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
});

}]);
