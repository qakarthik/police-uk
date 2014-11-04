'use strict';

var NotifyController = function($scope, $rootScope) {
  $scope.notify_opts = {
    styling: 'bootstrap3',
    title: 'goGeo Performance',
    type: 'info',
    history: false,
    addclass: 'stack-bottomleft custom',
    hide: true,
    delay: 5000
  };

  $scope.pnotify = new PNotify($scope.notify_opts);

  $scope.updateText = function() {
    var text = [
      'Zoom level: ' + $scope.zoom,
      'Processed records: ' + $.number($scope.geoAggCount, 0, '.', '.'),
      'Response time: ' + $scope.geoAggTime + ' ms'
    ];

    if ($scope.drawnArea) {
      text.push('Area size analysis: ' + $scope.drawnArea + ' km2');
    }

    $scope.pnotify.update({text: text.join('\n')});

    if ($scope.pnotify.state === 'closed') {
      $scope.pnotify.open();
    }
  };

  $rootScope.$on('event:updateGeoAggCount',
    function(event, time, count) {
      $scope.geoAggCount = count;
      $scope.geoAggTime = time;

      $scope.updateText();
    }
  );

  $rootScope.$on('event:updateClusterCount',
    function(event, count) {
      $scope.clusterCount = count;
      $scope.updateText();
    }
  );

  $rootScope.$on('event:updateZoom',
    function(event, zoom) {
      $scope.zoom = zoom;
      $scope.updateText();
    }
  );

  $rootScope.$on('event:updateDrawnArea',
    function(event, drawnArea) {
      $scope.drawnArea = drawnArea;
      $scope.updateText();
    }
  );
};