(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.Modal = factory(root.jQuery);
    }
}(this, function($) {
    $.fn.modal = function (action) {
        var target = this;
        var panel = ($($.modal.panel).length == 1)?$($.modal.panel):$(window);
        if(action == "show" || action == undefined) {
            $(target).offset({"top":panel.height()/2-$(target).height()/2, "left": panel.width()/2-$(target).width()/2});
            $(target).show();
            $("body").append("<div id='_simple_modal_cover_div' style='min-width: 100%;min-height: 100%;z-index: 9998;opacity:0.5;background-color: #000;position: absolute;top: 0;left: 0;'></div>");
            $(target).css("z-index", "9999");
            $(target).css("position", "absolute")
            $(target).attr("_s_modal", "show");
            if($.modal.clickClose == true) {
                $("#_simple_modal_cover_div").click(function () {
                    hideModal();
                })
            }
        }

        if(action == "hide") {
            hideModal();
        }
    }

    $.modal = {
        panel: window,
        clickClose: true,
        settings: function (settings) {
            $.extend($.modal, settings)
        },
        hide: function() {
            hideModal();
        }
    }

    function hideModal() {
        $("[_s_modal='show']").offset({"top":0,"left":0})
        $("[_s_modal='show']").hide();
        $("#_simple_modal_cover_div").remove();
        $("[_s_modal='show']").removeAttr("_s_modal");
    }

    window.onload = function () {
        $("a[ref='modal']").click(function () {
            var id = $(this).attr("href");
            var target = $(id);
            if(target.length == 1) {
                target.modal("show");
            }
        })
    }
}));
