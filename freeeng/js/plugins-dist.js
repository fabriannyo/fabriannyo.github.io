"use strict";

var FreeEng = FreeEng || {};

FreeEng.UIComponents = function(t) {
    function e() {
        !n.mobile && $(".plans-component").height($(".plan.active").outerHeight());
    }
    var n = $.extend({
        tabletBreakpoint: 1199,
        mobileBreakpoint: 767,
        tablet: !1,
        mobile: !1
    }, t || {});
    $(window).width() <= n.tabletBreakpoint && $(window).width() > n.mobileBreakpoint && (n.tablet = !0), 
    $(window).width() <= n.mobileBreakpoint && (n.mobile = !0), $.fn.smartResize = function(t) {
        return t ? this.bind("resize", d(t)) : this.trigger(smartResize);
    }, $.fn.smartScroll = function(t) {
        return t ? this.bind("scroll touchmove", d(t)) : this.trigger(smartScroll);
    }, String.prototype.trimToLength = function(t) {
        return this.length > t ? jQuery.trim(this).substring(0, t).split(" ").slice(0, -1).join(" ") + "..." : this;
    }, this.init = function() {
        a(), s(), c(), l(), r(), o(), i();
    };
    var i = function() {
        $(".nav-item-level2").length && ($(".has-sub").on("click", function(t) {
            t.preventDefault(), $(this).siblings(".opened").toggleClass("opened closed"), $(this).toggleClass("opened closed");
        }), $("body").on("click", function(t) {
            $(".has-sub").is(t.target) || 0 !== $(".has-sub").has(t.target).length || $(".has-sub").removeClass("opened").addClass("closed");
        }));
    }, o = function() {
        $("header").length && ($(".nav-logo a").clone().appendTo(".header-revamp").addClass("logo-mobile"), 
        $(".mobile-trigger").on("click", function() {
            $(this).toggleClass("opened closed"), $(".navigation-component").toggleClass("opened closed"), 
            $("body").toggleClass("static");
        }), $("body").on("click", function(t) {
            $(".navigation-component").is(t.target) || 0 !== $(".navigation-component").has(t.target).length || $(".mobile-trigger").is(t.target) || 0 !== $(".mobile-trigger").has(t.target).length || $(".mobile-trigger").hasClass("opened") && $(".mobile-trigger").trigger("click");
        }));
    }, a = function() {
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
    }, s = function() {
        if ($(".slider-component").length && !n.tablet && !n.mobile) {
            var t = $(".navigation-component").outerHeight();
            $(".slider-component").css("margin-top", -1 * t);
        }
        if ($(".steps-component").length && !n.tablet && !n.mobile) {
            var e = $(".steps-component").outerHeight();
            $(".steps-component").css("bottom", e / -2);
        }
    }, l = function() {
        $(".plans-component").length && ($(".plan").on("mouseenter mouseleave", function() {
            $(this).siblings(".plan").removeClass("active"), $(this).addClass("active");
        }), e(), $(".plans-component").on("mouseleave", function(t) {
            t.target != $(".plan") && ($(".plan").removeClass("active"), $(".plan:nth-child(2)").addClass("active"));
        }));
    }, r = function() {
        if ($(".tabs-component").length) {
            var i = $(".tabs-component");
            i.find(".tab-head").first().addClass("active"), i.find(".tab-body").first().addClass("active"), 
            n.mobile ? $(".tab-b").height(i.find(".tab-body").first().outerHeight()) : i.height(i.find(".tab-body").first().outerHeight()), 
            i.find(".tab-head").each(function(t, e) {
                $(this).text($(this).text().trimToLength("40")), $(this).attr("data-id", "#tabs-" + t);
            }), i.find(".tab-body").each(function(t, e) {
                $(this).attr("id", "tabs-" + t);
            }), i.on("click", ".tab-head", function(t) {
                i.find(".active").removeClass("active"), $(this).addClass("active");
                var e = $($(this).data("id"));
                e.addClass("active"), n.mobile ? $(".tab-b").height(e.outerHeight()) : i.height(e.outerHeight());
            });
        }
    }, c = function() {
        $(window).smartResize(function() {
            var t;
            $(window).width() <= n.tabletBreakpoint ? n.tablet = !0 : n.tablet = !1, $(window).width() <= n.mobileBreakpoint ? n.mobile = !0 : n.mobile = !1, 
            e(), t = $(".tabs-component"), n.mobile ? $(".tab-b").height(t.find(".tab-body.active").outerHeight()) : t.height(t.find(".tab-body.active").outerHeight()), 
            s();
        });
    }, d = function(i, n, o) {
        var a = void 0;
        return function() {
            var t = this, e = arguments;
            a ? clearTimeout(a) : o && i.apply(t, e), a = setTimeout(function() {
                o || i.apply(t, e), a = null;
            }, n || 150);
        };
    };
};
