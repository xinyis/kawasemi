/*jshint strict:true */
/*jshint browser:true, jquery:true, devel:true */
/*global google:false, _:false */

(function () {
    "use strict";

    $(function() {
        var carousel = (function () {
            var list = $('.carousel > ul');
            var active = $('.carousel > ul > li:first');
            var prev = null;
            var next = active.next();

            return {
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
                    if (shift < 0) {
                        list.animate({
                            'margin-left': '-='+(-shift)+'px'
                        }, 200);
                    } else {
                        list.animate({
                            'margin-left': '+='+shift+'px'
                        }, 200);
                    }                            
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

        // disable scroll
        target.on('touchmove', function(e) {
            e.preventDefault();
        });
    });
})();
