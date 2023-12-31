(function($) {
    var selectors = [];

    var check_binded = false;
    var check_lock = false;
    var defaults = {
        interval: 250,
        force_process: false
    }
    var $window = $(window);

    var $prior_appeared;

    function process() {
        check_lock = false;
        for (var index = 0; index < selectors.length; index++) {
            var $appeared = $(selectors[index]).filter(function() {
                return $(this).is(':appeared');
            });

            $appeared.trigger('appear', [$appeared]);

            if ($prior_appeared) {
                var $disappeared = $prior_appeared.not($appeared);
                $disappeared.trigger('disappear', [$disappeared]);
            }
            $prior_appeared = $appeared;
        }
    }

    $.expr[':']['appeared'] = function(element) {
        var $element = $(element);
        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $window.scrollLeft();
        var window_top = $window.scrollTop();
        var offset = $element.offset();
        var left = offset.left;
        var top = offset.top;

        if (top + $element.height() >= window_top &&
            top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
            left + $element.width() >= window_left &&
            left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
            return true;
        } else {
            return false;
        }
    }

    $.fn.extend({
        appear: function(options) {
            var opts = $.extend({}, defaults, options || {});
            var selector = this.selector || this;
            if (!check_binded) {
                var on_check = function() {
                    if (check_lock) {
                        return;
                    }
                    check_lock = true;

                    setTimeout(process, opts.interval);
                };

                $(window).scroll(on_check).resize(on_check);
                check_binded = true;
            }

            if (opts.force_process) {
                setTimeout(process, opts.interval);
            }
            selectors.push(selector);
            return $(selector);
        }
    });

    $.extend({
        force_appear: function() {
            if (check_binded) {
                process();
                return true;
            };
            return false;
        }
    });
})(jQuery);

var isMobile = false;

(function( $ ) {
    "use strict";

    $(function() {
		if (navigator.userAgent.match(/Android/i) ||
		    navigator.userAgent.match(/webOS/i) ||
		    navigator.userAgent.match(/iPhone/i) ||
		    navigator.userAgent.match(/iPad/i)||
		    navigator.userAgent.match(/iPod/i) ||
		    navigator.userAgent.match(/IEMobile/i) ||
		    navigator.userAgent.match(/BlackBerry/i)) {
		    isMobile = true;
		}

        if (isMobile == true) {
            $('.animated').removeClass('animated');
            $('.op0').removeClass('op0');
        }

        if (isMobile == false) {
            $('*[data-animated]').addClass('animated');
        }

        function animated_contents() {
            $(".animated:appeared").each(function (i) {
                var $this    = $(this),
                    animated = $(this).data('animated');

                setTimeout(function () {
                    $this.addClass(animated);
                }, 100 * i);

            });
        }

        if (isMobile == false) {
            animated_contents();
            $(window).scroll(function () {
                animated_contents();
            });
        }
    });

}(jQuery));


$(function() {
	$(".show-login").click(function(){
		$(".overlay").fadeIn("300");
	});
	
    $('#loginbox').append('<i class="fa fa-times-circle overlay-close"></i>');  
    $(".overlay-close").click(function(){
		$(".overlay").fadeOut("300");
	});
	
	$(".serch .fa").click(function(){
		$("#search-form").fadeIn(300);
	});
	$(".search-close").click(function(){
		$("#search-form").fadeOut(300);
	});
	if (isMobile == false) {
        $("html").niceScroll();
    };
    if (isMobile == true) {
        $(".work > a").removeClass("ulightbox");
        $(".work a > span, .work a > i, .work a > h5").css("display", "none");
    };
    $("#go-top").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    $(".p-cats-left > span").click(function(){
        $(".p-cats-list").toggle(0);
    });
    $(".menu-icon .fa").click(function() {
    	$("#menu").toggle();
    });
	$("#menu .uMenuRoot > li.uWithSubmenu > a > span").append('<i class="fa fa-angle-down"></fa>');
	$("#menu .uMenuRoot > li.uWithSubmenu li.uWithSubmenu > a > span").append('<i class="fa fa-angle-right"></fa>');
});