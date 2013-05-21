/*jshint strict:true */
/*jshint browser:true, jquery:true, devel:true */
/*global google:false, _:false */

(function () {
    "use strict";

    $(function () {
        // Carousel
        var carousel = (function () {
            var list = $('.carousel > ul');
            var active = $('.carousel > ul > li:first');
            var prev = null;
            var next = active.next();

            return {
                active: function() { return active; },
                resize: function() {
                    var width = 0;
                    _.each($('.carousel > ul > li'), function(e) {
                        var w = $(e).children('img').width();
                        $(e).width(w + 30);
                        $(e).children('.title').width(w);
                        width += $(e).outerWidth(true);
                    }, 0);

                    var shift = ($(window).width() - active.outerWidth()) / 2;

                    list.css({
                        width:         width + "px",
                        'margin-left': shift + 'px'
                    });
                    $(window).trigger('carouselupdate', active);
                },
                right: function () {
                    if (next.length === 0) { return 0; }

                    var shift = (active.outerWidth() + next.outerWidth()) / 2;

                    active = next;
                    next = active.next();
                    prev = active.prev();

                    return -shift;
                },
                left: function () {
                    if (prev.length === 0) { return 0; }

                    var shift = (prev.outerWidth() + active.outerWidth()) / 2;

                    active = prev;
                    next = active.next();
                    prev = active.prev();

                    return shift;
                },
                shift: function (shift) {
                    var margin = (shift < 0) ? '-='+(-shift)+'px' : '+='+shift+'px';

                    list.animate({
                        'margin-left': margin
                    }, 200, function () {
                        $(window).trigger('carouselupdate', active);
                    });
                }
            };
        })();

        // $('.carousel > ul > li:last')
        //     .after('<div style="clear: both"></div>');

        var target = $('.carousel');

        carousel.resize();
        $('.carousel > ul > li > img').on('load', function() {
            carousel.resize();
        });

        target.on('swipeleft', function(e) {
            var shift = carousel.right();
            if (shift !== 0) { carousel.shift(shift); }
        });
        target.on('swiperight', function(e) {
            var shift = carousel.left();
            if (shift !== 0) { carousel.shift(shift); }
        });

        $(window).on('click', function(e) {
            target.trigger('swipeleft');
        });

        // disable scroll
        target.on('touchmove', function(e) {
            e.preventDefault();
        });

        // Map
        (function() {
            var overlay;

            $(window).on('carouselupdate', function(e, article) {
                var latlngs = _.map($(article).data('latlng'), function(latlng) {
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

                // Clear path
                if (overlay) { overlay.setMap(null); }
                
                var map = window.map.app;
                path.setMap(map);
                overlay = path;
            });

            $(window).on('mapinitialized', function(e, map) {
                $(window).trigger('carouselupdate', $('.carousel > ul > li:first'));
            });
        })();
    });
})();
