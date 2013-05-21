/*jshint strict:true */
/*jshint browser:true, jquery:true */
/*global google:false */

(function () {
    "use strict";
    function initialize() {
        var myLatlng = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 8,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        document.body.onload = function () {
            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title:"Hello World!"
            });
        };
    }

    window.map = {
        initialize: initialize
    };

    
})();
