// init Namespace
const FreeEng = FreeEng || {};

// module namespace
FreeEng.UIComponents = function( customSetting ) {
	
	// overwrite default settings
	let settings = $.extend( {
		tabletBreakpoint: 1199,
		mobileBreakpoint: 767,
		tablet: false,
		mobile: false
	},
	customSetting || {});
	
	// vars
	const self = this;
	
	// check tablet
	if( $( window ).width() <= settings.tabletBreakpoint && $( window ).width() > settings.mobileBreakpoint ) {
		
		// mobile view
		settings.tablet = true;
	}
	
	// check mobile
	if( $( window ).width() <= settings.mobileBreakpoint ) {
		
		// mobile view
		settings.mobile = true;
	}
	
	$.fn.smartResize = function( fn ) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(smartResize);
	}
	
	$.fn.smartScroll = function( fn ) {
		return fn ? this.bind( 'scroll touchmove', debounce(fn)) : this.trigger(smartScroll);
	}
	
	this.init = function() {

		initSlick();

		initHero();

		initSmartResize();
	}
	
	// const initHeader = function() {
		
	// 	if ( $( 'header').length ) {
	// 		$( document ).scrollTop() > 40 ? $( 'header' ).addClass( 'minimize' ) : '';
	// 	}
	// }
	
	// slick initiate helper
	function SlickHelper( elements ) {
		
		$( elements ).slick({
			dots: true,
			infinite: true,
			lazyLoad: 'ondemand',
			arrows: false,
			speed: 1000,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 3000
		})
	}
	
	// method to initialize slick js
	const initSlick = function() {
		
		// check homepage card
		if ( $( '.slider-component' ).length ) {
				
			!$( '.slider-component' ).hasClass( 'slick-initialized' ) ? SlickHelper( '.slider-component' ) : '';
		}
	}

	const initHero = function() {

		// check sliderTop margin
		if ( $( '.slider-component' ).length ) {

			const getTop = $( '.navigation-component' ).outerHeight();

			console.log( getTop*-1 );
			
			$( '.slider-component' ).css('margin-top', -1*getTop);
		}

		if ( $( '.steps-component' ).length ) {

			const getTop = $( '.steps-component' ).outerHeight();
			
			$( '.steps-component' ).css('bottom', getTop/-2);
		}
	}
	
	// method to re-init function when browser is resized
	const initSmartResize = function(){
		
		// on resize or drag
		$( window ).smartResize( function(){
			
			$( window ).width() <= settings.tabletBreakpoint ? settings.tablet = true : settings.tablet = false;
			// check mobile
			$( window ).width() <= settings.mobileBreakpoint ? settings.mobile = true : settings.mobile = false;
			
			// initMinimizeHeader();
			
			// initSlick();

			initSliderTop();
			
		});
	}
	
	const initSmartScroll = function() {
		
		$( window ).smartScroll( function() {
			
			// initMinimizeHeader();
		})
	}
	
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	const debounce = function (func, threshold, execAsap) {
		let timeout;
		
		return function debounced () {
			let obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				func.apply(obj, args);
				timeout = null;
			};
			
			if (timeout)
			clearTimeout(timeout);
			else if (execAsap)
			func.apply(obj, args);
			
			timeout = setTimeout(delayed, threshold || 150);
		};
	};
	
}