"use strict";

var FreeEng = FreeEng || {};

FreeEng.UIComponents = function(t) {
    var e = $.extend({
        tabletBreakpoint: 1199,
        mobileBreakpoint: 767,
        tablet: !1,
        mobile: !1
    }, t || {});
    $(window).width() <= e.tabletBreakpoint && $(window).width() > e.mobileBreakpoint && (e.tablet = !0), 
    $(window).width() <= e.mobileBreakpoint && (e.mobile = !0), $.fn.smartResize = function(t) {
        return t ? this.bind("resize", r(t)) : this.trigger(smartResize);
    }, $.fn.smartScroll = function(t) {
        return t ? this.bind("scroll touchmove", r(t)) : this.trigger(smartScroll);
    }, this.init = function() {
        i(), n(), o();
    };
    var i = function() {
        $(".slider-component").length && !$(".slider-component").hasClass("slick-initialized") && $(".slider-component").slick({
            dots: !0,
            infinite: !0,
            lazyLoad: "ondemand",
            arrows: !1,
            speed: 1e3,
            fade: !0,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: !1,
            autoplaySpeed: 3e3
        });
    }, n = function() {
        if ($(".slider-component").length) {
            var t = $(".navigation-component").outerHeight();
            console.log(-1 * t), $(".slider-component").css("margin-top", -1 * t);
        }
        if ($(".steps-component").length) {
            var e = $(".steps-component").outerHeight();
            $(".steps-component").css("bottom", e / -2);
        }
    }, o = function() {
        $(window).smartResize(function() {
            $(window).width() <= e.tabletBreakpoint ? e.tablet = !0 : e.tablet = !1, $(window).width() <= e.mobileBreakpoint ? e.mobile = !0 : e.mobile = !1, 
            initSliderTop();
        });
    }, r = function(i, n, o) {
        var r = void 0;
        return function() {
            var t = this, e = arguments;
            r ? clearTimeout(r) : o && i.apply(t, e), r = setTimeout(function() {
                o || i.apply(t, e), r = null;
            }, n || 150);
        };
    };
};
