/**
* jQuery scroroller Plugin 1.0
*
* http://www.tinywall.net/
* 
* Developers: Arun David, Boobalan
* Copyright (c) 2014 
*/
(function($){
    $(document).ready(function(){
        $(document).scrollzipInit();
        $(document).rollerInit();
    });

    $(window).on("load scroll resize", function(){
        $('.numscroller').scrollzip({
            showFunction    :   function() {
                                    numberRoller($(this).attr('data-slno'));
                                },
            wholeVisible    :     false,
        });
    });

    $.fn.scrollzipInit = function() {
        // Ensure that scrollzipPoint is added only if it doesn't exist already
        if (!$('#scrollzipPoint').length) {
            $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
        }
    };

    $.fn.rollerInit = function() {
        var i = 0;
        $('.numscroller').each(function() {
            i++;
            $(this).attr('data-slno', i); 
            $(this).addClass("roller-title-number-" + i);
        });
    };

    $.fn.scrollzip = function(options) {
        var settings = $.extend({
            showFunction    : null,
            hideFunction    : null,
            showShift       : 0,
            wholeVisible    : false,
            hideShift       : 0,
        }, options);

        return this.each(function(i, obj) {
            $(this).addClass('scrollzip');
            var $scrollzipPoint = $('#scrollzipPoint');
            if ($scrollzipPoint.length === 0) {
                console.error("scrollzipPoint element is missing.");
                return;
            }
            
            var zipPointOffset = $scrollzipPoint.offset();
            if (!zipPointOffset) {
                console.error("Unable to get the offset of scrollzipPoint.");
                return;
            }

            var zipPointTop = zipPointOffset.top;

            if ($.isFunction(settings.showFunction)) {
                if (
                    !$(this).hasClass('isShown') &&
                    ($(window).outerHeight() + zipPointTop - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
                    (zipPointTop + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
                ) {
                    $(this).addClass('isShown');
                    settings.showFunction.call(this);
                }
            }

            if ($.isFunction(settings.hideFunction)) {
                if (
                    $(this).hasClass('isShown') &&
                    (($(window).outerHeight() + zipPointTop - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
                    (zipPointTop + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
                ) {
                    $(this).removeClass('isShown');
                    settings.hideFunction.call(this);
                }
            }
            return this;
        });
    };

    function numberRoller(slno) {
        var min = $('.roller-title-number-' + slno).attr('data-min');
        var max = $('.roller-title-number-' + slno).attr('data-max');
        var timediff = $('.roller-title-number-' + slno).attr('data-delay');
        var increment = $('.roller-title-number-' + slno).attr('data-increment');
        var numdiff = max - min;
        var timeout = (timediff * 1000) / numdiff;
        numberRoll(slno, min, max, increment, timeout);
    }

    function numberRoll(slno, min, max, increment, timeout) {
        if (min <= max) {
            $('.roller-title-number-' + slno).html(min);
            min = parseInt(min) + parseInt(increment);
            setTimeout(function() { 
                numberRoll(slno, min, max, increment, timeout);
            }, timeout);
        } else {
            $('.roller-title-number-' + slno).html(max);
        }
    }
})(jQuery);
