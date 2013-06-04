(function($, window, undefined){

    // Default settings
    var settings = {
        showLoader: true,
        loaderHtml: 'loading...',
        minLoaderTime: 500,
        rebind: function(){}
    };

    var loading = false;
    var minLoadingTimeDone = false;

    $.onepage = function(options) {

        // Override default settings
        settings = $.extend(settings, options);

        $(document).ready(function(){
            if (!supportsHistoryApi()){
                return; 
            }
            bindClickEvents();

            if(settings.showLoader){
                $('html').append($('<div class="loader" style="display:none">' + settings.loaderHtml + '</div>'));
            }
        });
    };
 
    function supportsHistoryApi(){
        return !!(window.history && history.pushState);
    }

    function showLoader(){
        setTimeout(function(){
            if(loading){
                $('.loader').show();
                minLoadingTimeDone = false;
                setTimeout(function(){
                    minLoadingTimeDone = true;
                    if(!loading){
                        hideLoader();
                    }
                }, settings.minLoaderTime);
            }
        }, 100);
    }

    function hideLoader(){
        if(minLoadingTimeDone){
            $('.loader').hide();
        }
    }

    function replacePage(url, callback){
        if(settings.showLoader){
            showLoader();
        }

        loading = true;

        $.get(url, function(data) {

            loading = false;

            // Replace body
            var body = data.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0];
            console.log(body);
            $('body').html(body);

            // Replace title
            var title = data.split("<title")[1].split(">").slice(1).join(">").split("</title>")[0];
            $('title').html(title);
            
            // Rebind click events on anchor tags
            bindClickEvents();

            // Rebind other custom events
            settings.rebind();

            callback();

            if(settings.showLoader){
                hideLoader();
            }
        });
    }

    function isLocal(url){
        var regex = new RegExp(location.host);
        return (url.substring(0,4) === "http") ? regex.test(url) : true;
    }

    function bindClickEvents(){
        $('a').on('click', function(e){
            var url = $(this).attr('href');

            if(isLocal(url)){
                e.preventDefault();
                replacePage(url, function(){
                    history.pushState(null, null, url);
                });
            }
        });
    }
 
})(jQuery, window);