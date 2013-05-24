/*jshint strict:true */
/*jshint browser:true, jquery:true */
/*global _:false, google:false */

(function () {
    "use strict";

    $(function() {
	//現在表示中のスポット番号
	var current = -1;

        var route;
        var spots = [];
	var latlngs = [];
	var spotElms = [];
	var spotTops = [];
        $(window).on('mapinitialized', function () {
            var map = window.map;

            route = map.render_route($(".article_main").data("route"));

            _.each($(".article_spot"), function (e) {
                var p = $(e).data('spot');
                var lat = p[0];
                var lng = p[1];

                var latlng = new google.maps.LatLng(lat, lng);
		spotElms.push(e);
		spotTops.push($(e).offset().top);
		latlngs.push(latlng);
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

	    //スクロールイベント
	    $(".article_main").scroll(function () {
		    for (var i = spotTops.length-1; i>=0; i--) {
			if ($(".article_main").scrollTop() > spotTops[i] - 270) {
			    if (i != current){
				current = i;
				setPin(spotElms[i]);
                                			    }
			    break;
			}
		    }
		});
	    setPin(spotElms[0]);
           });

	//$(".article_spot").on('click', setPin(this));
	
	var overlay = null;
	function setPin(e) {
            var map = window.map;

            if (overlay) { overlay.setMap(null); overlay = null; }

            var pos = $(e).data('spot');
            var latlng = new google.maps.LatLng(pos[0], pos[1]);
            overlay = new google.maps.Marker({
                position: latlng,
                map: map.app
            });
         
            map.setCenter(laglng);

        }
    });
})();
