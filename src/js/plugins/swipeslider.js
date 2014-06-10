(function ($) {
    jQuery.fn.swipeslider = function (options) {
        options = $.extend({
            prevBtn: 'swipeslider_prev',
            nextBtn: 'swipeslider_next',
            nextBtnText: 'next >>',
            prevBtnText: '<< prev',
            pagerWrp: 'swipeslider_pager',
            quantity: 1,
            rows: 1,
            wrap: 'regular',
            effects: true,
            effect: 'random',

            // connected slider
            connected: true,
            connClass: 'swipeslider_thumbnails',
            connBtns: true,
            connNext: 'swipeslider_conn_next',
            connPrev: 'swipeslider_conn_prev',
            connPrevText: '&lt;',
            connNextText: '&gt;',
            connVisible: 3,
            connRows: 1,
            // end connected slider


            autoPlay: false, // true or false
            autoPlayDelay: 3, // delay in seconds
            controlls: false,


            debug: true
        }, options);

        /*---------------------- variables -------------------------*/
        var conCarousel = $('.' + options.connClass + ''),
            mainCarousel = $(this),
            el = $(this).addClass('swipeslider'),
            sliderWrap = '',
            item = el.find('li'),
            itemsCount = item.length,
            inClass = '',
//            curent = 0,
            startClass = mainCarousel.find('li').attr('class'),
            startConClass = conCarousel.find('li').attr('class'),
            outClass = '',
            nextBtn = '',
            prevBtn = '',
            lastBtn = '';
        /*---------------------- end variables -------------------------*/

        var functions = {
            init: function () {
                this.modernizr();
                this.css();
                this.connected();
                this.infinite();
                this.addArrows();
                this.arrowControlls();
                this.autoplay();
                this.touch();
                this.keycontrolls();
            },
            /*---------------------- add key controlls support -------------------------*/
            keycontrolls: function () {
                document.onkeydown = checkKey;
                function checkKey(e) {

                    e = e || window.event;

                    if (e.keyCode == '37') {
                        $('.' + options.prevBtn).click();
                        console.log('left')
                    }
                    else if (e.keyCode == '39') {
                        $('.' + options.nextBtn).click();
                        console.log('rigth')
                    }
                }
            },
            /*---------------------- end add key controlls support -------------------------*/

            /*---------------------- add touch support -------------------------*/
            touch: function () {

//                var lastX;
//                $('.swipeslider_wrapper').bind("touchmove mousemove", function (e) {
//                    var currentX = e.originalEvent.changedTouches ?
//                        e.originalEvent.changedTouches[0].pageX : e.pageX;
//                    if (currentX > lastX) {
//                        $('.'+options.nextBtn).click();
//                    } else {
//                        $('.'+options.prevBtn).click();
//                    }
//                    lastX = currentX;
//
//                })

//                var nextBtn = mainCarousel.parent().find('.'+options.nextBtn),
//                    prevBtn = mainCarousel.parent().find('.'+options.prevBtn);
//

                var ts;
                $(document).bind('touchstart', function (e) {
                    ts = e.originalEvent.touches[0].clientX;
                });

                mainCarousel.bind('touchmove', function (e) {
                    var te = e.originalEvent.changedTouches[0].clientX;
                    if (ts > te) {
                        nextBtn.click();
                        console.log('next')
                    } else {
                        prevBtn.click();
                        console.log('prev')
                    }
                });

//                var mouseDown = false, right;
//                var xi, xf, leftX = 0;
//                var nPages = $(".swipeslider_thumbnails li").size();
//                var pageSize = $(".swipeslider_thumbnails li").width();
//                var threshold = pageSize/2;
//                var currentPage = 0;
//
//                $('.swipeslider_navigation').on("touchstart", function (e) {
//                    mouseDown = true;
//                    xi = e.originalEvent.changedTouches[0].pageX;
//                    console.log(e.originalEvent.changedTouches[0].pageX);
//                });
//
//                $('.swipeslider_navigation').on("touchend ", function (e) {
//                    if (mouseDown) {
//                        mouseDown = false;
//                        xf = e.originalEvent.changedTouches[0].pageX;
//                        leftX = parseInt($(".swipeslider_thumbnails").css("left").split("px")[0]);
//                        if ((e.originalEvent.changedTouches[0].pageX - xi) < -threshold || (e.originalEvent.changedTouches[0].pageX - xi) > threshold) {
//                            setFocusedPage();
//                        } else {
//                            restore();
//                        }
//                    }
//                });
//
//                $('.swipeslider_navigation').on("touchleave ", function (e) {
//                    if (mouseDown) {
//                        mouseDown = false;
//                        xf = e.originalEvent.changedTouches[0].pageX;
//                        leftX = parseInt($(".swipeslider_thumbnails").css("left").split("px")[0]);
//                        if ((e.originalEvent.changedTouches[0].pageX - xi) < -threshold || (e.originalEvent.changedTouches[0].pageX - xi) > threshold) {
//                            setFocusedPage();
//                        } else {
//                            restore();
//                        }
//                    }
//                });
//                $('.swipeslider_navigation').on("touchmove ", function (e) {
//                    $('.navbar-brand').text(e.originalEvent.changedTouches[0].deltaX+' '+xi)
////                    if (mouseDown) {
//                        $(".swipeslider_thumbnails").css({
//                            "left": (leftX + (e.originalEvent.changedTouches[0].clientX - xi))
//                        });
//                        right = ((e.originalEvent.changedTouches[0].pageX - xi) < 0) ? true : false;
////                    }
//                });
//
//                function restore() {
//                    $(".swipeslider_thumbnails").stop().animate({
//                        "left": -(currentPage * pageSize)
//                    }, 200, function () {
//                        leftX = parseInt($(".swipeslider_thumbnails").css("left").split("px")[0]);
//                    });
//                }
//
//                function setFocusedPage() {
//                    if (leftX >= (-threshold)) { // First Page
//                        currentPage = 0;
//                    } else if (leftX < (-threshold) && leftX >= (-(nPages + 1) * threshold)) { // Second to N-1 Page
//                        (right) ? currentPage++ : currentPage--;
//                    } else if (leftX < -((nPages + 1) * threshold)) { // Third Page
//                        currentPage = nPages - 1;
//                    }
//                    $(".swipeslider_thumbnails").stop().animate({
//                        "left": -(currentPage * pageSize)
//                    }, 200, function () {
//                        leftX = parseInt($(".swipeslider_thumbnails").css("left").split("px")[0]);
//                    });
//                }

//                (function(d){
//                        var
//                            ce=function(e,n){var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false},
//                            nm=true,sp={x:0,y:0},ep={x:0,y:0},
//                            touch={
//                                touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
//                                touchmove:function(e){nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
//                                touchend:function(e){if(nm){ce(e,'fc')}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))}};nm=true},
//                                touchcancel:function(e){nm=false}
//                            };
//                        for(var a in touch){d.addEventListener(a,touch[a],false);}
//                    })(document);
//
//                    function next(e){
//                        $('.'+options.nextBtn).click();
////                        console.log(e.touches[0].pageX);
////                        console.log(e.getEventTime() - e.getDownTime())
////                        console.log(e.changedTouches[0].pageX)
//                    }
//                    function prev(e){
//                        $('.'+options.prevBtn).click();
//                    }
//
//                    var h=function(e){
//                        console.log(e.type,e)
//                        alert()
//                    };
//                    document.body.addEventListener('fc',h,false);// 0-50ms vs 500ms with normal click
//                    document.addEventListener('swl',next,false);
//                    document.addEventListener('swr',prev,false);
////                    document.body.addEventListener('swu',h,false);
////                    document.body.addEventListener('s wd',h,false);

//
//                                    mainCarousel.on('touchmove', function(e){
//                        console.log(e.changedTouches[0].pageX) // alert pageX coordinate of touch point
//                    }, false)

            },
            /*---------------------- end add touch support -------------------------*/
            /*---------------------- check for modernizr for visual effects. if not add modernizr -------------------------*/
            modernizr: function () {

                if ($('script[src*="modernizr"]').length > 0) {
                    console.log("exists");
                } else {
                    var fileref = document.createElement('script'),
                        link = 'http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.7.2.js';
                    fileref.setAttribute("type", "text/javascript");
                    fileref.setAttribute("src", link);
                    document.getElementsByTagName("head")[0].appendChild(fileref)
                }

            },
            /*------------- end check for modernizr for visual effects. if not add modernizr -------------------------*/

            /*------------- slider resizing etc -------------------------*/
            css: function () {

                sliderWrap = el
                    .wrap('<div class="swipeslider_wrapper"/>')
                    .find('li:first').addClass('active');


                /*---------------------- check if enabled css3 effects if none use styles fo .animate -------------------------*/

                if (options.effects == false || document.body.classList.contains('no-csstransforms')) {
                    item.css({
                        'position': 'relative',
                        'float': 'left',
                        'visibility': 'visible'
                    });
                    el.width(itemsCount * item.outerWidth(true));
                    item.width(el.parent().width() / options.quantity);

                    this.debug('item width = ' + item.width())
                    this.debug('el width = ' + $('body').find('.message__incoming').width())
                } else {
                    item.css({
                        'position': 'absolute',
                    })

                }

                /*---------------------- end check if enabled css3 effects if none use styles fo .animate -------------------------*/

                /*---------------------- resize items -------------------------*/


                /*---------------------- end resize items -------------------------*/

            },
            /*------------- end slider resizing etc -------------------------*/

            debug: function (what) {
                if (options.debug == true) {
                    console.log(what)
                }
            },

            /*------------------------------------- disable/enable btn to prevent doubleclickin' -----------------------------------------------*/
            disEnButtons: function (selector, type) {
                if (type === 'enable') {
                    selector.removeClass('inactive');
                    this.debug('btn active')
                } else if (type === 'disable') {
                    selector.addClass('inactive');
                    this.debug('btn inactive')
                }
            },
            /*------------------------------------- end disable/enable btn to prevent doubleclickin' -----------------------------------------------*/

            /*------------- add controlls elements -------------------------*/
            addArrows: function () {
                mainCarousel
                    .parent()
                    .append('' +
                        '<i class="' +
                        options.prevBtn +
                        '">' +
                        options.prevBtnText +
                        '</i><i class="' +
                        options.nextBtn +
                        '">' +
                        options.nextBtnText +
                        '</i>');

                if (options.connBtns == true) {
                    conCarousel
                        .parent()
                        .append('<i class="' +
                            options.connPrev +
                            '">' +
                            options.connPrevText +
                            '</i><i class="' +
                            options.connNext +
                            '">' +
                            options.connNextText +
                            '</i>');
                }
                nextBtn = mainCarousel.parent().find('.' + options.nextBtn);
                prevBtn = mainCarousel.parent().find('.' + options.prevBtn);

            },
            /*------------- end add controlls elements -------------------------*/

            /*------------- all controlls functions -------------------------*/
            arrowControlls: function () {
                var self = this;

                nextBtn.on('click', function (e) {
                    e.preventDefault();
                    lastBtn = $(this).attr('class');
                    if (options.effects == false) {
                        self.simpleMove(mainCarousel, $(this));
                    } else {
                        self.css3move(mainCarousel, $(this));
                    }

                });

                prevBtn.on('click', function (e) {
                    e.preventDefault();
                    lastBtn = $(this).attr('class');
                    if (options.effects == false) {
                        self.simpleMove(mainCarousel, $(this));
                    } else {
                        self.css3move(mainCarousel, $(this));
                    }
                });


                /*---------------------- check if not circular carousel and disable prev btn -------------------------*/
                if (options.connected !== false && options.wrap.indexOf('circular') == -1) {
                    $('.' + options.prevBtn + ',.' + options.connPrev).addClass('disabled');
                } else if (options.wrap.indexOf('circular') == -1) {
                    $('.' + options.prevBtn).addClass('disabled');
                }

                this.debug(options.wrap.indexOf('circular'));
                /*---------------------- end check if not circular carousel and disable prev btn -------------------------*/

                /*---------------------------------- add controlls an controlls functions to connected carousel -------------------------*/

                if (options.connBtns == true) {
                    $('.' + options.connNext).on('click', function (e) {
                        e.preventDefault();
                        lastBtn = $(this).attr('class');
//                        if (options.effects == false) {
                        self.simpleMove(conCarousel, $(this));
//                        } else {
//                            self.css3move(conCarousel, $(this));
//                        }
                    });

                    $('.' + options.connPrev).on('click', function (e) {
                        e.preventDefault();
                        lastBtn = $(this).attr('class');
//                        if (options.effects == false) {
                        self.simpleMove(conCarousel, $(this));
//                        } else {
//                            self.css3move(conCarousel, $(this));
//                        }
                    });
                }

            },
            /*------------- end all controlls functions -------------------------*/

            /*------------- simple .animate() -------------------------*/
            simpleMove: function (carousel, buttom) {
                var dir = '',
                    dirOp = '',
                    self = this,
                    btn = buttom,
                    carouselItem = carousel.find('li'),
                    carouselItems = carouselItem.length;


                if (buttom.attr('class').indexOf('next') !== -1) {
                    dir = '-';
                    dirOp = '';
                } else {
                    dir = '+';
                    dirOp = '-';
                }
                if (!btn.hasClass('inactive') && !btn.hasClass('disabled')) {
                    btn.siblings('[class*="prev"],[class*="next"]').removeClass('disabled');

                    self.disEnButtons(btn, 'disable');

                    carousel.animate({
                            left: dir + '=' + carouselItem.outerWidth(true) + 'px'
                        }, 500,
                        function () {
                            if (carousel.css('left') == '0px') {
                                if (options.wrap == 'circular') {
                                    $(this).css('left', dirOp + (carouselItem.outerWidth(true) * carouselItems + 'px'));
                                }
                            }
                            if (carousel.css('left') == '-' + (carouselItem.outerWidth(true) * (options.quantity + carouselItems) - carouselItem.outerWidth(true) * 2) + 'px') {
                                if (options.wrap == 'circular') {
                                    $(this).css('left', '-' + (carouselItem.outerWidth(true) * itemsCount - carouselItem.outerWidth(true) + 'px'));
                                }
                            }

                            if (lastBtn !== options.connNext || lastBtn !== options.connPrev) {
                            }
                            if (lastBtn == options.connNext || lastBtn == options.connPrev) {
                                self.disEnButtons(btn, 'enable');
                            } else {
                                self.setactive(carousel);
                                self.disEnButtons(btn, 'enable');
                            }


                        }
                    )
                }
            },
            /*------------- end simple .animate() -------------------------*/

            /*------------- css3 animations -------------------------*/
            css3move: function (carousel, buttom) {
                /*---------------------------------- variables -------------------------*/

                var self = this,
                    btn = buttom,
                    effect = '"' + options.effect + '"';
                /*---------------------------------- end variables -------------------------*/

                var activePage = mainCarousel.find('.active'),
                    nextPage = activePage.next(),
                    prevPage = activePage.prev();


                if (options.effect == 'random') {
                    this.setAnimation(this.randomGen(1, 67));
                } else if (effect.indexOf('[') === -1) {
                    this.setAnimation(this.randomGen(1, options.effect[options.effect.length - 1]));
                } else {
                    this.setAnimation(options.effect);
                }


                if (buttom.attr('class').indexOf('next') !== -1) {
                    nextPage = activePage.next();
                    prevPage = activePage.prev();
//                    otherBtn = 'prev';
                } else {
                    nextPage = activePage.prev();
                    prevPage = activePage.next();
//                    otherBtn = 'next';
                }

                if (!btn.hasClass('inactive') && !btn.hasClass('disabled')) {
                    btn.siblings('[class*="prev"],[class*="next"]').removeClass('disabled');

                    self.disEnButtons(btn, 'disable');

                    activePage
                        .removeClass('active')
                        .addClass('swipeslider_anim_current ' + outClass);
                    nextPage
                        .addClass('swipeslider_anim_current ' + inClass + ' active');

                    item.on(
                        "animationend MSAnimationEnd oAnimationEnd webkitAnimationEnd",
                        function () {
                            activePage.attr('class', startClass);
                            prevPage.attr('class', startClass);
                            nextPage.attr('class', startClass + ' active swipeslider_anim_current');

                            self.disEnButtons(btn, 'enable');

                            self.setactive(mainCarousel);
                        }
                    );
                }
            },
            /*------------- end css3 animations -------------------------*/

            randomGen: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            },

            /*------------- set active elements only if connected carousel -------------------------*/
            setactive: function (carousel) {
                var activeNum = '';

                /*------------- get active slide -------------------------*/
                if (options.effects == false) {
                    activeNum = Math.abs(Math.floor(parseInt(carousel.css('left')) / parseInt(carousel.find('li').width())));
                } else {
                    activeNum = carousel.find('li.active').index();
                }
                /*------------- end get active slide -------------------------*/


                this.debug('setactive slide #' + activeNum);


                /*------------- enable or disable btns for main carousel-------------------------*/
                $('.' + options.nextBtn + ',.' + options.prevBtn).removeClass('disabled');
                if (parseInt(mainCarousel.find('.active').index()) === parseInt(item.eq(-1).index()) && options.wrap !== 'circular') {
                    $('.' + options.nextBtn).addClass('disabled');
                }
                if (parseInt(mainCarousel.find('.active').index()) === parseInt(item.eq(0).index()) && options.wrap !== 'circular') {
                    $('.' + options.prevBtn).addClass('disabled');
                }
                /*------------- end enable or disable btns for main carousel -------------------------*/

                /*------------- enable or disable btns for connected carousel -------------------------*/
                if (options.connected == true) {

                    $('.' + options.connNext + ',.' + options.connPrev).removeClass('disabled');

                    if (parseInt(conCarousel.find('.active').index()) === parseInt(conCarousel.find('li').eq(-1).index()) && options.wrap !== 'circular') {
                        $('.' + options.connNext).addClass('disabled');
                    }
                    if (parseInt(conCarousel.find('.active').index()) === parseInt(conCarousel.find('li').eq(0).index()) && options.wrap !== 'circular') {
                        $('.' + options.connPrev).addClass('disabled');
                    }

                    /*------------- centering active item -------------------------*/
                    /*------------- set active slide to connected carousel -------------------------*/
                    if (options.wrap !== 'circular') {
                        conCarousel
                            .find('li')
                            .removeClass('active')
                            .eq(mainCarousel.find('.active').index())
                            .addClass('active');
                    }
                    /*------------- set active slide to connected carousel -------------------------*/


                    if (conCarousel.find('.active').index() >= Math.floor(options.connVisible / 2)
                        && conCarousel.find('.active').index() <= conCarousel.find('li').eq(-Math.floor(options.connVisible / 2)).index()) {
                        conCarousel.stop().animate({
                            left: '-' + (mainCarousel.find('.active').index() - Math.floor(options.connVisible / 2)) * conCarousel.find('li').outerWidth(true)
                        }, 1000);
                        this.debug(Math.ceil(options.connVisible / 2))
                    }
                    /*------------- end centering active item -------------------------*/

                }
                /*------------- end enable or disable btns for connected carousel -------------------------*/
            },
            /*------------- end set active elements only if connected carousel -------------------------*/

            /*------------- auto play functions -------------------------*/
            autoplay: function () {

                if (options.autoPlay == true) {
                    function aPlay() {
                        $('.' + options.nextBtn).click();
                        delId = setTimeout(aPlay, options.autoPlayDelay * 1000);
                        this.debug('asdas');
                    }

                    var delId = setTimeout(aPlay, options.autoPlayDelay * 1000);
                    el.hover(
                        function () {
                            clearTimeout(delId);
                        },
                        function () {
                            delId = setTimeout(aPlay, options.autoPlayDelay * 1000);
                        }
                    );
                }
            },
            /*------------- end auto play functions -------------------------*/

            /*------------- infinite sliding -------------------------*/
            infinite: function () {
                if (options.wrap == 'circular') {
                    var sliderFirst = el.find('li').slice(0, options.quantity);
                    var tmp = '';
                    sliderFirst.each(function () {
                        tmp = tmp + '<li>' + $(this).html() + '</li>';
                    });
                    sliderFirst = tmp;
                    var sliderLast = el.find('li').slice(-options.quantity);
                    tmp = '';
                    sliderLast.each(function () {
                        tmp = tmp + '<li>' + $(this).html() + '</li>';
                    });
                    sliderLast = tmp;

//                    var elRealQuant = el.find('li').length; //реальное колличество эллементов
                    el.append(sliderFirst);
                    el.prepend(sliderLast);

                    var elWidth = sliderWrap.parent().parent().width() / options.quantity;
                    el.children('li').css({
                        'float': 'left',
                        'width': elWidth
                    });
                    var elQuant = el.find('li').length;
                    el.width(elWidth * elQuant);
                    el.css('left', '-' + elWidth * options.quantity + 'px');
                }
            },
            /*------------- end infinite sliding -------------------------*/

            /*------------- connected carousel -------------------------*/
            connected: function () {
                if (options.connected == true) {
                    /*---------------------------------- variables -------------------------*/

                    var itemCon = conCarousel.find('li'),
                        self = this,
                        activeConPage = '',
                        activePage = '',
                        nextPage = '',
                        prevPage = '',
                        nextConPage = '';
                    /*---------------------------------- end variables -------------------------*/

                    /*---------------------------------- css function like wrap and add styles -------------------------*/
                    conCarousel

                        // wrap with div
                        .wrap('' +
                            '<div class="swipeslider_navigation"/>' +
                            '')
                        // add position and size for ul
                        .css({
                            'position': 'relative',
                            width: (item.outerWidth(true) * item.length) / options.connRows
                        });

                    //set first item active
                    conCarousel
                        .find('li')
                        .width(conCarousel.parent().width() / options.connVisible)
                        .first()
                        .addClass('active');

                    /*---------------------------------- end css function like wrap and add styles -------------------------*/

                    /*---------------------------------- activate picture from main carousel on click connected carousel item -------------------------*/
                    itemCon.on('click', function (e) {
                        e.preventDefault();
                        var thumbnail = $(this);
                        if (!$(this).hasClass('active')) {

                            if (options.effects == false) {
                                mainCarousel.find('li').removeClass('active');
                                conCarousel.find('li').removeClass('active');

                                var thisItem = $(this).index();

                                mainCarousel
                                    .animate({
                                        'left': '-' + mainCarousel.find('li').width() * thisItem
                                    })
                                    .find('li')
                                    .eq(thisItem)
                                    .addClass('active');

                                $(this).addClass('active');
                            } else {
                                activePage = mainCarousel.find('.active');

                                prevPage = activePage.prev();
                                activeConPage = conCarousel.find('.active');
                                nextConPage = $(this);
                                nextPage = mainCarousel.find('li').eq($(this).index());

                                if (options.effect == 'random') {
                                    self.setAnimation(self.randomGen(1, 67));
                                } else if (options.effect.indexOf('[') === -1) {
                                    self.setAnimation(self.randomGen(1, options.effect[options.effect.length - 1]));
                                }
                                else {
                                    self.setAnimation(options.effect);
                                }


                                activePage
//                                    .attr('class',startConClass)
                                    .addClass(outClass);
//                                activeConPage
////                                    .attr('class',startConClass)
//                                    .addClass(outClass);

                                nextPage
                                    .addClass('swipeslider_anim_current ' + inClass + ' active');
//                                nextConPage
//                                    .addClass('swipeslider_anim_current ' + inClass + ' active');
//
                                item.on(
                                    "animationend MSAnimationEnd oAnimationEnd webkitAnimationEnd",
                                    function () {

                                        activePage.attr('class', startClass);
                                        prevPage.attr('class', startClass);
                                        nextPage.attr('class', startClass + ' active swipeslider_anim_current');

                                        self.setactive(mainCarousel);
                                    }
                                );
                            }
                        }

                    });
                    /*---------------------------------- end activate picture from main carousel on click connected carousel item -------------------------*/
                }
            },
            /*------------- end connected carousel -------------------------*/

            /*------------- switch case animations-------------------------*/
            setAnimation: function ($animation) {
                switch ($animation) {
                    case 1:
                        outClass = 'swipeslider_anim_moveToLeft';
                        inClass = 'swipeslider_anim_moveFromRight';
                        break;
                    case 2:
                        outClass = 'swipeslider_anim_moveToRight';
                        inClass = 'swipeslider_anim_moveFromLeft';
                        break;
                    case 3:
                        outClass = 'swipeslider_anim_moveToTop';
                        inClass = 'swipeslider_anim_moveFromBottom';
                        break;
                    case 4:
                        outClass = 'swipeslider_anim_moveToBottom';
                        inClass = 'swipeslider_anim_moveFromTop';
                        break;
                    case 5:
                        outClass = 'swipeslider_anim_fade';
                        inClass = 'swipeslider_anim_moveFromRight swipeslider_anim_ontop';
                        break;
                    case 6:
                        outClass = 'swipeslider_anim_fade';
                        inClass = 'swipeslider_anim_moveFromLeft swipeslider_anim_ontop';
                        break;
                    case 7:
                        outClass = 'swipeslider_anim_fade';
                        inClass = 'swipeslider_anim_moveFromBottom swipeslider_anim_ontop';
                        break;
                    case 8:
                        outClass = 'swipeslider_anim_fade';
                        inClass = 'swipeslider_anim_moveFromTop swipeslider_anim_ontop';
                        break;
                    case 9:
                        outClass = 'swipeslider_anim_moveToLeftFade';
                        inClass = 'swipeslider_anim_moveFromRightFade';
                        break;
                    case 10:
                        outClass = 'swipeslider_anim_moveToRightFade';
                        inClass = 'swipeslider_anim_moveFromLeftFade';
                        break;
                    case 11:
                        outClass = 'swipeslider_anim_moveToTopFade';
                        inClass = 'swipeslider_anim_moveFromBottomFade';
                        break;
                    case 12:
                        outClass = 'swipeslider_anim_moveToBottomFade';
                        inClass = 'swipeslider_anim_moveFromTopFade';
                        break;
                    case 13:
                        outClass = 'swipeslider_anim_moveToLeftEasing swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_moveFromRight';
                        break;
                    case 14:
                        outClass = 'swipeslider_anim_moveToRightEasing swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_moveFromLeft';
                        break;
                    case 15:
                        outClass = 'swipeslider_anim_moveToTopEasing swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_moveFromBottom';
                        break;
                    case 16:
                        outClass = 'swipeslider_anim_moveToBottomEasing swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_moveFromTop';
                        break;
                    case 17:
                        outClass = 'swipeslider_anim_scaleDown';
                        inClass = 'swipeslider_anim_moveFromRight swipeslider_anim_ontop';
                        break;
                    case 18:
                        outClass = 'swipeslider_anim_scaleDown';
                        inClass = 'swipeslider_anim_moveFromLeft swipeslider_anim_ontop';
                        break;
                    case 19:
                        outClass = 'swipeslider_anim_scaleDown';
                        inClass = 'swipeslider_anim_moveFromBottom swipeslider_anim_ontop';
                        break;
                    case 20:
                        outClass = 'swipeslider_anim_scaleDown';
                        inClass = 'swipeslider_anim_moveFromTop swipeslider_anim_ontop';
                        break;
                    case 21:
                        outClass = 'swipeslider_anim_scaleDown';
                        inClass = 'swipeslider_anim_scaleUpDown swipeslider_anim_delay300';
                        break;
                    case 22:
                        outClass = 'swipeslider_anim_scaleDownUp';
                        inClass = 'swipeslider_anim_scaleUp swipeslider_anim_delay300';
                        break;
                    case 23:
                        outClass = 'swipeslider_anim_moveToLeft swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_scaleUp';
                        break;
                    case 24:
                        outClass = 'swipeslider_anim_moveToRight swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_scaleUp';
                        break;
                    case 25:
                        outClass = 'swipeslider_anim_moveToTop swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_scaleUp';
                        break;
                    case 26:
                        outClass = 'swipeslider_anim_moveToBottom swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_scaleUp';
                        break;
                    case 27:
                        outClass = 'swipeslider_anim_scaleDownCenter';
                        inClass = 'swipeslider_anim_scaleUpCenter swipeslider_anim_delay400';
                        break;
                    case 28:
                        outClass = 'swipeslider_anim_rotateRightSideFirst';
                        inClass = 'swipeslider_anim_moveFromRight swipeslider_anim_delay200 swipeslider_anim_ontop';
                        break;
                    case 29:
                        outClass = 'swipeslider_anim_rotateLeftSideFirst';
                        inClass = 'swipeslider_anim_moveFromLeft swipeslider_anim_delay200 swipeslider_anim_ontop';
                        break;
                    case 30:
                        outClass = 'swipeslider_anim_rotateTopSideFirst';
                        inClass = 'swipeslider_anim_moveFromTop swipeslider_anim_delay200 swipeslider_anim_ontop';
                        break;
                    case 31:
                        outClass = 'swipeslider_anim_rotateBottomSideFirst';
                        inClass = 'swipeslider_anim_moveFromBottom swipeslider_anim_delay200 swipeslider_anim_ontop';
                        break;
                    case 32:
                        outClass = 'swipeslider_anim_flipOutRight';
                        inClass = 'swipeslider_anim_flipInLeft swipeslider_anim_delay500';
                        break;
                    case 33:
                        outClass = 'swipeslider_anim_flipOutLeft';
                        inClass = 'swipeslider_anim_flipInRight swipeslider_anim_delay500';
                        break;
                    case 34:
                        outClass = 'swipeslider_anim_flipOutTop';
                        inClass = 'swipeslider_anim_flipInBottom swipeslider_anim_delay500';
                        break;
                    case 35:
                        outClass = 'swipeslider_anim_flipOutBottom';
                        inClass = 'swipeslider_anim_flipInTop swipeslider_anim_delay500';
                        break;
                    case 36:
                        outClass = 'swipeslider_anim_rotateFall swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_scaleUp';
                        break;
                    case 37:
                        outClass = 'swipeslider_anim_rotateOutNewspaper';
                        inClass = 'swipeslider_anim_rotateInNewspaper swipeslider_anim_delay500';
                        break;
                    case 38:
                        outClass = 'swipeslider_anim_rotatePushLeft';
                        inClass = 'swipeslider_anim_moveFromRight';
                        break;
                    case 39:
                        outClass = 'swipeslider_anim_rotatePushRight';
                        inClass = 'swipeslider_anim_moveFromLeft';
                        break;
                    case 40:
                        outClass = 'swipeslider_anim_rotatePushTop';
                        inClass = 'swipeslider_anim_moveFromBottom';
                        break;
                    case 41:
                        outClass = 'swipeslider_anim_rotatePushBottom';
                        inClass = 'swipeslider_anim_moveFromTop';
                        break;
                    case 42:
                        outClass = 'swipeslider_anim_rotatePushLeft';
                        inClass = 'swipeslider_anim_rotatePullRight swipeslider_anim_delay180';
                        break;
                    case 43:
                        outClass = 'swipeslider_anim_rotatePushRight';
                        inClass = 'swipeslider_anim_rotatePullLeft swipeslider_anim_delay180';
                        break;
                    case 44:
                        outClass = 'swipeslider_anim_rotatePushTop';
                        inClass = 'swipeslider_anim_rotatePullBottom swipeslider_anim_delay180';
                        break;
                    case 45:
                        outClass = 'swipeslider_anim_rotatePushBottom';
                        inClass = 'swipeslider_anim_rotatePullTop swipeslider_anim_delay180';
                        break;
                    case 46:
                        outClass = 'swipeslider_anim_rotateFoldLeft';
                        inClass = 'swipeslider_anim_moveFromRightFade';
                        break;
                    case 47:
                        outClass = 'swipeslider_anim_rotateFoldRight';
                        inClass = 'swipeslider_anim_moveFromLeftFade';
                        break;
                    case 48:
                        outClass = 'swipeslider_anim_rotateFoldTop';
                        inClass = 'swipeslider_anim_moveFromBottomFade';
                        break;
                    case 49:
                        outClass = 'swipeslider_anim_rotateFoldBottom';
                        inClass = 'swipeslider_anim_moveFromTopFade';
                        break;
                    case 50:
                        outClass = 'swipeslider_anim_moveToRightFade';
                        inClass = 'swipeslider_anim_rotateUnfoldLeft';
                        break;
                    case 51:
                        outClass = 'swipeslider_anim_moveToLeftFade';
                        inClass = 'swipeslider_anim_rotateUnfoldRight';
                        break;
                    case 52:
                        outClass = 'swipeslider_anim_moveToBottomFade';
                        inClass = 'swipeslider_anim_rotateUnfoldTop';
                        break;
                    case 53:
                        outClass = 'swipeslider_anim_moveToTopFade';
                        inClass = 'swipeslider_anim_rotateUnfoldBottom';
                        break;
                    case 54:
                        outClass = 'swipeslider_anim_rotateRoomLeftOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateRoomLeftIn';
                        break;
                    case 55:
                        outClass = 'swipeslider_anim_rotateRoomRightOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateRoomRightIn';
                        break;
                    case 56:
                        outClass = 'swipeslider_anim_rotateRoomTopOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateRoomTopIn';
                        break;
                    case 57:
                        outClass = 'swipeslider_anim_rotateRoomBottomOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateRoomBottomIn';
                        break;
                    case 58:
                        outClass = 'swipeslider_anim_rotateCubeLeftOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCubeLeftIn';
                        break;
                    case 59:
                        outClass = 'swipeslider_anim_rotateCubeRightOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCubeRightIn';
                        break;
                    case 60:
                        outClass = 'swipeslider_anim_rotateCubeTopOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCubeTopIn';
                        break;
                    case 61:
                        outClass = 'swipeslider_anim_rotateCubeBottomOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCubeBottomIn';
                        break;
                    case 62:
                        outClass = 'swipeslider_anim_rotateCarouselLeftOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCarouselLeftIn';
                        break;
                    case 63:
                        outClass = 'swipeslider_anim_rotateCarouselRightOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCarouselRightIn';
                        break;
                    case 64:
                        outClass = 'swipeslider_anim_rotateCarouselTopOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCarouselTopIn';
                        break;
                    case 65:
                        outClass = 'swipeslider_anim_rotateCarouselBottomOut swipeslider_anim_ontop';
                        inClass = 'swipeslider_anim_rotateCarouselBottomIn';
                        break;
                    case 66:
                        outClass = 'swipeslider_anim_rotateSidesOut';
                        inClass = 'swipeslider_anim_rotateSidesIn swipeslider_anim_delay200';
                        break;
                    case 67:
                        outClass = 'swipeslider_anim_rotateSlideOut';
                        inClass = 'swipeslider_anim_rotateSlideIn';
                        break;

                }
            }
            /*------------- end switch case animations-------------------------*/



        };
        return functions.init(this);
    };
})
    (jQuery);