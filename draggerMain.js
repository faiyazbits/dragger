/**
 * Created by faiyaz on 12/11/2015.
 */
var draggerDiv = document.getElementById("dragger");
var draggerDiv$ = $("#dragger");
var divToDrag = null;
$(".div1,.div2,.div3").click(function () {
    var self$ = $(this);
    var selfPosition = self$.position();
    draggerDiv$.css({
        "top": selfPosition.top + self$.height(),
        "left": selfPosition.left + self$.width()
    });
});

dragHandler(draggerDiv, {
    start: function () {

    },
    move: function (eventArgs) {

        switch (draggerDiv$.position().left) {
            case $(".div1").position().left + $(".div1").width():
                divToDrag = $(".div1");
                break;
            case $(".div2").position().left + $(".div2").width():
                divToDrag = $(".div2");
                break;
            case $(".div3").position().left + $(".div3").width():
                divToDrag = $(".div3");
                break;

        }
        divToDrag.css({
            "width": divToDrag.width() + eventArgs.dx,
            "height": divToDrag.height() + eventArgs.dy
        });
        draggerDiv$.css({
            "top": divToDrag.position().top + divToDrag.height(),
            "left": divToDrag.position().left + divToDrag.width()
        });
    },
    end: function () {

    }
});


$(document).on("mousemove", function (event) {
    var boundsDiv$ = $(".div1");
    var div1Offset = boundsDiv$.offset();
    var bounds = {
        leftX: div1Offset.left,
        rightX: div1Offset.left + boundsDiv$.width(),
        topY: div1Offset.top,
        bottomY: div1Offset.top + boundsDiv$.height()
    };

    function offsetAdd(value) {
        return value + 10
    }

    function offsetSub(value) {
        return value - 10
    }

    function isLeftBorder(pagex, pageY, bounds) {
        return pagex > offsetSub(bounds.leftX) && pagex < offsetAdd(bounds.leftX)
            && pageY > bounds.topY && pageY < bounds.bottomY
    }

    function isTopBorder(pagex, pagey, bounds) {
        return pagey > offsetSub(bounds.topY) && pagey < offsetAdd(bounds.topY) &&
            pagex > bounds.leftX && pagex < bounds.rightX
    }

    function isRightBorder(pagex, pageY, bounds) {
        return pagex > offsetSub(bounds.rightX) && pagex < offsetAdd(bounds.rightX)
            && pageY > bounds.topY && pageY < bounds.bottomY
    }

    function isBottomBorder(pagex, pagey, bounds) {
        return pagey > offsetSub(bounds.bottomY) && pagey < offsetAdd(bounds.bottomY)
            && pagex > bounds.leftX && pagex < bounds.rightX
    }

    if (event.pageX > bounds.leftX && event.pageX < bounds.rightX &&
        event.pageY > bounds.topY && event.pageY < bounds.bottomY) {
        $("body").css({
            cursor: "pointer"
        });
    }

    if (isLeftBorder(event.pageX, event.pageY, bounds) || isBottomBorder(event.pageX, event.pageY, bounds) ||
        isRightBorder(event.pageX, event.pageY, bounds) || isTopBorder(event.pageX, event.pageY, bounds)) {
        $("body").css({
            cursor: "se-resize"
        });
    }


});




