/*jshint strict:true */
/*jshint browser:true, jquery:true, devel:true */
/*global google:false, _:false */


// ロード時に自動でカーソルを合わせる
(function() {
    "use strict";
    
    $(document).ready( function() {
        $("#comment_textarea").focus();

        $("#picture-button").on('click', function () {
            alert('写真をとりました');
            $(".memo-stock").append('<li><img src="img/daruma.jpg" /></li>');
        });

        $("#stock_form").submit( function () {
            alert('メモを保存しました');
        });
    });
})();
