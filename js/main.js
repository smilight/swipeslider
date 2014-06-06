(function() {
    $('.slider li').height($(window).height());
    $('.slider').swipeslider({
        nextBtnText: '<i class="glyphicon glyphicon-forward"/>',
        prevBtnText: '<i class="glyphicon glyphicon-backward"/>',
        connNextText: '<i class="glyphicon glyphicon-forward"/>',
        connPrevText: '<i class="glyphicon glyphicon-backward"/>'
    });
})();