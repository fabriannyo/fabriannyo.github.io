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
	
	String.prototype.trimToLength = function(m) {
		return (this.length > m) 
			? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
			: this;
	};
	
	this.init = function() {
		
		initSlick();
		
		initHero();
		
		initSmartResize();
		
		initPlans();
		
		initTab();
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
			autoplay: true,
			autoplaySpeed: 3000
		})
	}
	
	// method to initialize slick.js
	// dependency with vendor/slick.js
	const initSlick = function() {
		
		// check object
		if ( $( '.slider-component' ).length ) {
			
			// check if this el is initialized by slick already, if it hasn't been initialized then initialize it
			!$( '.slider-component' ).hasClass( 'slick-initialized' ) ? SlickHelper( '.slider-component' ) : '';
		}
	}
	
	// method to initalize hero element init value
	const initHero = function() {
		
		// check object
		if ( $( '.slider-component' ).length ) {
			
			const getTop = $( '.navigation-component' ).outerHeight();
			
			// set default margin-top value for this el
			$( '.slider-component' ).css('margin-top', -1*getTop);
		}
		
		// check object
		if ( $( '.steps-component' ).length ) {
			
			const getTop = $( '.steps-component' ).outerHeight();
			
			// set default bottom value for this el
			$( '.steps-component' ).css('bottom', getTop/-2);
		}
	}
	
	const initPlans = function() {
		
		// check object
		if ( $( '.plans-component' ).length ) {
			
			// on hover 
			$( '.plan' ).on('mouseenter mouseleave', function(){
				
				// remove active class
				$(this).siblings('.plan').removeClass('active');
				
				// add active class to hovered el
				$(this).addClass('active');
			});
			
			// set default height value for plans-component to avoid weird transition effect
			$( '.plans-component' ).height( $('.plan.active').outerHeight());
			
			// on leave, set active plan to plan at the middle
			$( '.plans-component' ).on('mouseleave', function(e){
				
				// if target isn't plan, then execute
				if (e.target != $('.plan') ){
					
					$('.plan').removeClass('active');
					$('.plan:nth-child(2)').addClass('active');
				}
				
			})
		}
	}
	
	// method to initialize tab-component
	const initTab = function() {
		
		// check object
		if ( $( '.tabs-component' ).length ) {
			
			const el  = $('.tabs-component');
			
			el.find('.tab-head').first().addClass('active');
			el.find('.tab-body').first().addClass('active');
			el.height( el.find('.tab-body').first().outerHeight());
			
			el.find('.tab-head').each(function(i,e){

				$(this).text( $(this).text().trimToLength('40'));
				
				$(this).attr('data-id',`#tabs-${i}`);
			})
			
			el.find('.tab-body').each(function(i,e){
				
				$(this).attr('id',`tabs-${i}`);

				// $(this).outerHeight() > el.outerHeight() ? el.height( $(this).height() ) : '';
			})
			
			el.on('click', '.tab-head' ,function(e){
				el.find('.active').removeClass('active');
				$(this).addClass('active');
				
				$( $(this).data('id') ).addClass('active');

				el.height( $( $(this).data('id') ).outerHeight() );
			})
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
			
			initHero();
			
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