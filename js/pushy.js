/*! Pushy - v0.9.2 - 2014-9-13
* Pushy is a responsive off-canvas navigation menu
* using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

!function(){
    var settings={
        pushy:'.pushy' //menu css class
      , body:'body'
      , container:'#content' //container css class
      , push:'.push' //css class to add pushy capability
      , siteOverlay:'.site-overlay' //site overlay
      , pushyClass:'pushy-left pushy-open' //menu position & menu open class
      , pushyActiveClass:'pushy-active' //css class to toggle site overlay
      , containerClass:'container-push' //container open class
      , pushClass:'push-push' //css class to add pushy capability
      , menuBtn:'.menu-btn, .pushy a' //css classes to toggle the menu
      , menuSpeed:200 //jQuery fallback menu speed
    }
    
    var pushy=function(c){
        var config;

        if(c){
            config=$.extend(settings,c);
        }else{
            config=settings;
        }

        var pushy=$(config.pushy)
          , body=$(config.body)
          , container=$(config.container)
          , push=$(config.push)
          , siteOverlay=$(config.siteOverlay)
          , pushyClass=config.pushyClass
          , pushyActiveClass=config.pushyActiveClass
          , containerClass=config.containerClass
          , pushClass=config.pushClass
          , menuBtn=$(config.menuBtn)
          , menuSpeed=config.menuSpeed
          , menuWidth=pushy.width()+'px' //jQuery fallback menu width

        this.togglePushy=function(){
            body.toggleClass(pushyActiveClass); //toggle site overlay
            pushy.toggleClass(pushyClass);
            container.toggleClass(containerClass);
            push.toggleClass(pushClass); //css class to add pushy capability
        }

        this.openPushyFallback=function(){
            body.addClass(pushyActiveClass);
            pushy.animate({left:'0px'},menuSpeed);
            container.animate({left:menuWidth},menuSpeed);
            push.animate({
                left:menuWidth},menuSpeed); //css class to add pushy capability
        }

        this.closePushyFallback=function(){
            body.removeClass(pushyActiveClass);
            pushy.animate({left:'-'+menuWidth},menuSpeed);
            container.animate({left:'0px'},menuSpeed);
            push.animate({
                left:'0px'},menuSpeed); //css class to add pushy capability
        }

        //checks if 3d transforms are supported
        //removing the modernizr dependency
        cssTransforms3d=(function csstransforms3d(){
            var el=document.createElement('p')
              , supported=false
              , transforms={
                    'webkitTransform':'-webkit-transform'
                  , 'OTransform':'-o-transform'
                  , 'msTransform':'-ms-transform'
                  , 'MozTransform':'-moz-transform'
                  , 'transform':'transform'
                }

            // Add it to the body to get the computed style
            document.body.insertBefore(el,null);

            for(var t in transforms){
                if(el.style[t]!==undefined){
                    el.style[t]='translate3d(1px,1px,1px)';
                    supported=window.getComputedStyle(el)
                                    .getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (supported!==undefined&&
                    supported.length>0&&
                    supported!=='none');
        })();

        //keep track of menu state (open/close)
        var state=true;

        this.openEvent=function(){
            if(cssTransforms3d){
                //toggle menu
                menuBtn.click(function() {
                    togglePushy();
                });
            }else{
                //jQuery fallback
                pushy.css({left:'-'+menuWidth}); //hide menu by default
                container.css({
                    'overflow-x':'hidden'}); //fixes IE scrollbar issue

                //toggle menu
                menuBtn.click(function(){
                    if(state){
                        openPushyFallback();
                        state=false;
                    }else{
                        closePushyFallback();
                        state=true;
                    }
                });
            }
        }

        this.closeEvent=function(){
            if(cssTransform3d){
                //close menu when clicking site overlay
                siteOverlay.click(function(){ 
                    togglePushy();
                });
            }else{
                //close menu when clicking site overlay
                siteOverlay.click(function(){ 
                    if(state){
                        openPushyFallback();
                        state=false;
                    }else{
                        closePushyFallback();
                        state=true;
                    }
                });
            }
        }
    }

    this.pushy=pushy;
}();

