/*jshint strict:true */
/*jshint browser:true, jquery:true, devel:true */
/*global google:false, _:false */


// ロード時に自動でカーソルを合わせる
(function() {
    "use strict";
    
    $(document).ready( function() {
        $("#comment_textarea").focus();

	var is_second = $.cookie("second_visit_flag") == "1";
	if (is_second) {
	    $.cookie("second_visit_flag", "0", {expires:5});
	    $(".memo-stock").append('<li><img src="article_img/pony.jpg" /></li>');
	} else {
	    $.cookie("second_visit_flag", "1", {expires:5});
	}

        $("#pop2").on('click', function () {
            alert('写真をとりました');
	    if (is_second){
		$(".memo-stock").append('<li><img src="article_img/sunset.png" /></li>');
	    } else {
		$(".memo-stock").append('<li><img src="article_img/pony.jpg" /></li>');
		
	    }
        });

        $("#stock_form").submit( function () {
            alert('メモを保存しました');
        });
    });
})();
