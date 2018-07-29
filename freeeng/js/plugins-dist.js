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
        return t ? this.bind("resize", l(t)) : this.trigger(smartResize);
    }, $.fn.smartScroll = function(t) {
        return t ? this.bind("scroll touchmove", l(t)) : this.trigger(smartScroll);
    }, String.prototype.trimToLength = function(t) {
        return this.length > t ? jQuery.trim(this).substring(0, t).split(" ").slice(0, -1).join(" ") + "..." : this;
    }, this.init = function() {
        i(), n(), s(), o(), a();
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
            autoplay: !0,
            autoplaySpeed: 3e3
        });
    }, n = function() {
        if ($(".slider-component").length) {
            var t = $(".navigation-component").outerHeight();
            $(".slider-component").css("margin-top", -1 * t);
        }
        if ($(".steps-component").length) {
            var e = $(".steps-component").outerHeight();
            $(".steps-component").css("bottom", e / -2);
        }
    }, o = function() {
        $(".plans-component").length && ($(".plan").on("mouseenter mouseleave", function() {
            $(this).siblings(".plan").removeClass("active"), $(this).addClass("active");
        }), $(".plans-component").height($(".plan.active").outerHeight()), $(".plans-component").on("mouseleave", function(t) {
            t.target != $(".plan") && ($(".plan").removeClass("active"), $(".plan:nth-child(2)").addClass("active"));
        }));
    }, a = function() {
        if ($(".tabs-component").length) {
            var e = $(".tabs-component");
            e.find(".tab-head").first().addClass("active"), e.find(".tab-body").first().addClass("active"), 
            e.height(e.find(".tab-body").first().outerHeight()), e.find(".tab-head").each(function(t, e) {
                $(this).text($(this).text().trimToLength("40")), $(this).attr("data-id", "#tabs-" + t);
            }), e.find(".tab-body").each(function(t, e) {
                $(this).attr("id", "tabs-" + t);
            }), e.on("click", ".tab-head", function(t) {
                e.find(".active").removeClass("active"), $(this).addClass("active"), $($(this).data("id")).addClass("active"), 
                e.height($($(this).data("id")).outerHeight());
            });
        }
    }, s = function() {
        $(window).smartResize(function() {
            $(window).width() <= e.tabletBreakpoint ? e.tablet = !0 : e.tablet = !1, $(window).width() <= e.mobileBreakpoint ? e.mobile = !0 : e.mobile = !1, 
            n();
        });
    }, l = function(i, n, o) {
        var a = void 0;
        return function() {
            var t = this, e = arguments;
            a ? clearTimeout(a) : o && i.apply(t, e), a = setTimeout(function() {
                o || i.apply(t, e), a = null;
            }, n || 150);
        };
    };
};
