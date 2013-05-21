/*jshint strict:true */
/*jshint browser:true, jquery:true */
/*global google:false, _:false */

(function () {
    "use strict";

    var map = {};
    map.initialize = function () {
        var myLatlng = new google.maps.LatLng(35.657941,139.708586);
        var mapOptions = {
            zoom: 14,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
        var image = 'img/gps.png';
        document.body.onload = function () {
            map.app = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map.app,
                icon: image,
                title:"Hello World!"
            });
            $(window).trigger('mapinitialized', this);
        };
    };

    map.render_route = function(route) {
        var latlngs = _.map(route, function(latlng) {
            var lat = latlng[0];
            var lng = latlng[1];

            return new google.maps.LatLng(lat, lng);
        });

        var path = new google.maps.Polyline({
            path: latlngs,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        path.setMap(map.app);

        return path;
    };

    window.map = map;
})();
