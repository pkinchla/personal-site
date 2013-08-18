/*
 * embedagram - embed your instagram photos
 *   http://embedagram.com/plugin.php
 *
 * Copyright (c) 2011 Matthew Hokanson (http://h0ke.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 */
(function($){
    $.fn.extend({
        embedagram: function(options) {

            // set the defaults
            var defaults = {
                instagram_id: -999,
                thumb_width: 900,
                wrap_tag: 'figure',
                link_type: 'web',
                limit: 1,
                success: function() { return true;  },
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var obj = $(this);  

                // set the jsonp url
                var jsonp_url = "http://embedagram.com/e/plugin/" + o.instagram_id + "/?callback=?";
                jsonp_url += "&thumb_width=" + o.thumb_width + "&wrap_tag=" + o.wrap_tag;
                jsonp_url += "&limit=" + o.limit + "&link_type=" + o.link_type;
                
                // get the json yo!
                $.getJSON(jsonp_url, function(data) {
                    obj.html(data.html);
                    o.success.apply(obj);
                });
                
                return obj;
            });
        }
    });
})(jQuery);
