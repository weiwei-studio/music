(function($) {
    $.fn.extend({
        IMGDEMO:function(opt) {
            
            var opt 	= arguments[0] ? arguments[0] :false;
            var $button = $(this).children("li")	;			
            var $sec 	= 3000						; 			
            var $min 	= $button.last().width() 	;			
            var $max 	= $button.first().width() 	;			
            var $index 	= 1   						;			
            
            $default = {										
                speed	:	opt.speed 	? 	opt.speed 						:	"slow"	,
                by		:	opt.by 		? 	opt.by 							:	"click"	,
                auto	:	opt.auto 	? 	opt.auto						:	false	,
                sec		:	opt.sec 	? 	opt.sec < 1000 ? 1000 : opt.sec	:	$sec	,
                maxWidth:	$max														,
                minWidth:	$min														,
                index	:	$index
            };            
            $button.bind($default.by, this.run).autoPlay();		
        },
        run:function() {										
            var $obj = $(this);
            if ($obj.width() == $default.minWidth) {
                var timeDo = window.setTimeout(function() {
                    $default.index = $obj.index();
                    $obj.anim();
                }, 100);
                $obj.mouseout(function() {
                    window.clearTimeout(timeDo);
                });
            }
        },
        autoPlay:function() {									
            if ($default.auto) {
                var $this = $(this);
                $this.autoDo();
                $this.mouseover(function() {
                    window.clearInterval(timeL);
                });
                $this.mouseout(function() {
                    $this.autoDo();
                });
            }
        },
        autoDo:function() {										
            var $len 	= 	$(this).length - 1;
            var $this 	= 	$(this);
            	timeL 	= 	window.setInterval(function() {
                				$this.eq($default.index).anim();
                				$default.index < $len ? $default.index++ :$default.index = 0;
            				}, $default.sec);
        },
        anim:function() {										
            var $fx = function() {
                $(this).siblings("li").animate({
                    width	:	$default.minWidth,  
                     opacity	:	0.5
                }, $default.speed).removeClass('active');
                $(this).animate({
                    width	:	$default.maxWidth,
					 opacity	:	1                   
                }, $default.speed).addClass('active');
				
                $(this).siblings("li").children("div").fadeOut();
                $(this).children("div").fadeTo($default.speed,0.7);
                $(this).dequeue();
            };
            $(this).queue($fx);
        }
    });
})(jQuery);