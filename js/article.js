/*jshint strict:true */
/*jshint browser:true, jquery:true */
/*global _:false, google:false */

(function () {
    "use strict";

    $(function() {
        var route;
        var spots = [];
        $(window).on('mapinitialized', function () {
            var map = window.map;

            route = map.render_route($(".article_main").data("route"));

            _.each($(".article_spot"), function (e) {
                var p = $(e).data('spot');
                var lat = p[0];
                var lng = p[1];

                var latlng = new google.maps.LatLng(lat, lng);
                spots.push(new google.maps.Marker({
                    position: latlng,
                    map: map.app,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: "red",
                        fillOpacity: 1,
                        scale: 4,
                        strokeWeight: 1
                    }
                }));
            });
        });

        var overlay = null;
        $(".article_spot").on('click', function () {
            var map = window.map;

            if (overlay) { overlay.setMap(null); overlay = null; }

            var pos = $(this).data('spot');
            var latlng = new google.maps.LatLng(pos[0], pos[1]);
            overlay = new google.maps.Marker({
                position: latlng,
                map: map.app
            });
        });
    });
})();
