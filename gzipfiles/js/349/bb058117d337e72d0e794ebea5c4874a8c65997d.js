$(function() { 
    console.log('HELLO from the CMS pt_base');
    PT._isDevMode = false;
});



;
// Smooth scroll for in page links
$(function(){
    var target, scroll;

    $("a[href*=#]:not([href=#])").on("click", function(e) {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            target = $(this.hash);
            target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

            if (target.length) {
                if (typeof document.body.style.transitionProperty === 'string') {
                    e.preventDefault();
                  
                    var avail = $(document).height() - $(window).height();

                    scroll = target.offset().top;
                  
                    if (scroll > avail) {
                        scroll = avail;
                    }

                    $("html").css({
                        "margin-top" : ( $(window).scrollTop() - scroll ) + "px",
                        "transition" : "1s ease-in-out"
                    }).data("transitioning", true);
                } else {
                    $("html, body").animate({
                        scrollTop: scroll
                    }, 1000);
                    return;
                }
            }
        }
    });

    $("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function (e) {
        if (e.target == e.currentTarget && $(this).data("transitioning") === true) {
            $(this).removeAttr("style").data("transitioning", false);
            $("html, body").scrollTop(scroll);
            return;
        }
    });
});;
$(document).ready(function(){
    homepageSlider();
    
    //$('.is-wrapper2').addClass('is-wrapper').removeClass('is-wrapper2');
});

function homepageSlider() {
    //$('.ct-slick-homepage .caption').css('opacity', '0');
    
	function slideAnimation(elem) {
        var animEndEv = 'webkitAnimationEnd animationend';
        elem.each(function() {
            var $this = $(this),
                $animationType = $this.data('animation');
            
            //$('.ct-slick-homepage .caption').css('opacity', '0').removeClass('activate').addClass('off').addClass('flipInX');

            $this.css('opacity', '1').addClass($animationType).one(animEndEv, function() {
                $this.removeClass($animationType);
            }).one('webkitAnimationStart animationstart', function() {
                
            });
            
            $this.addClass($animationType);
        });
	}
	
	var $homepageSlider = $('.ct-slick-homepage'),
        $firstSlideAnimation = $homepageSlider.find("[data-animation ^= 'animated']:first");
	
	$homepageSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var slide = $(slick.$slides.get(currentSlide));
        var $caption = slide.find("[data-animation ^= 'animated']").css('opacity', '0');
        //$('.ct-slick-homepage .caption').removeClass('activate flipInX').addClass('off');
	});	
	
	$homepageSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
        var slide = $(slick.$slides.get(currentSlide));
        var $caption = slide.find("[data-animation ^= 'animated']");
        slideAnimation($caption);
        //$('.ct-slick-homepage .caption').removeClass('off').addClass('activate flipInX');
	});	
	
	$('.ct-slick-homepage').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: false,
		fade: false,
		dots: true,
		arrows: false,
		/*lazyLoad: 'ondemand',*/
		waitForAnimate: true,
		infinite: true
	});
	
	$homepageSlider.on('init', function(event, slick){
		//$('.ct-slick-homepage .caption').addClass('activate flipInX');
		slideAnimation($firstSlideAnimation);
	});
	
	//slideAnimation($firstSlideAnimation);
}


;
