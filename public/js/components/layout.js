var layout = (function(window, document, $) {

    'use strict';

    var init = function() {

            stickOnScroll();
            navigation();

            var height = $(window).height() - $('.project-header').outerHeight() - $('.copyright').outerHeight();
            $('.project-content').css('min-height', height);

        },

        stickOnScroll = function() {

            window.setTimeout(function() {
                var ele = $('.project-content-navigation');
                ele.css('height', ele.outerHeight()).stickOnScroll({
                    topOffset: 10
                });
            }, 100);

        },

        navigation = function() {

            var $el,
                element;
            $('.project-content-left').append('<nav class="project-content-navigation"><ol></ol></nav>');
            $('.project-content-right').find('h1, h2, h3').each(function(index, el) {
                $el = $(el);
                $el.attr('id', $el.text().replace(' ', '-').toLowerCase());
                element = '<li><a href="#' + $el.attr('id') + '">' + $el.text() + '</a></li>';
                $('.project-content-left').find('.project-content-navigation ol').append(element);
            });

        };

    return {
        init: init
    };

})(window, document, $);
