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
            wrap: 'circular',
            effects: false,
            effect: 'random',

            // connected slider
            connected: true,
            connClass: 'swipeslider_thumbnails',
            connBtns: true,
            connNext: 'swipeslider_conn_next',
            connPrev: 'swipeslider_conn_prev',
            connPrevText: '&lt;',
            connNextText: '&gt;',
            connRows: 1,
            // end connected slider


            autoPlay: false, // true or false
            autoPlayDelay: 10, // delay in seconds
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
            curent = 0,
            startClass = mainCarousel.find('li').attr('class');
        outClass = '';
        /*---------------------- end variables -------------------------*/

        var functions = {
            init: function () {
                this.modernizr();
                this.css();
                this.addArrows();
                this.arrowControlls();
                this.infinite();
            },
            /*---------------------- check for modernizr for visual effects. if not add modernizr -------------------------*/
            modernizr: function () {

                if ($('script[src*="modernizr"]').length > 0) {
                    console.log("exists");
                } else {
                    var fileref = document.createElement('script'),
                        link = 'http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.7.2.js';
                    fileref.setAttribute("type", "text/javascript")
                    fileref.setAttribute("src", link)
                    document.getElementsByTagName("head")[0].appendChild(fileref)
                }

            },
            /*------------- end check for modernizr for visual effects. if not add modernizr -------------------------*/

            /*------------- slider resizing etc -------------------------*/
            css: function () {

                sliderWrap = el
                    .wrap('<div class="swipeslider_wrapper" style="' +
                        'overflow: hidden;' +
                        'display: inline-block;' +
                        'height:100%;' +
                        'width:100%"' +
                        '/>')
                    .css({
                        'position': 'relative',
                        'left': 0,
                        height: el.find('li').height()

                    })
                    .find('li:first').addClass('active');

                /*---------------------- check if enabled css3 effects if none use styles fo .animate -------------------------*/
                if (options.effects == false || $('html').hasClass('no-csstransforms')) {
                    item.css({
                        'position': 'relative',
                        'float': 'left',
                        'top': 0,
                        'left': 0,
                        'visibility': 'visible'
                    })
                    el.width(itemsCount * item.width());
                } else {
                    item.css({
                        'position': 'absolute',
                        'top': 0,
                        'left': 0,
                        'visibility': 'visible'
                    })
                }
                /*---------------------- end check if enabled css3 effects if none use styles fo .animate -------------------------*/

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
                mainCarousel.parent()
                    .append('' +
                        '<i class="' +
                        options.prevBtn +
                        '">' +
                        options.prevBtnText +
                        '</i><i href="#" class="' +
                        options.nextBtn +
                        '">' +
                        options.nextBtnText +
                        '</i>');

                if (options.connected == true) {
                    conCarousel
                        .append('<i class="' +
                            options.connPrev +
                            '">' +
                            options.connPrevText +
                            '</i><i href="#" class="' +
                            options.connNext +
                            '">' +
                            options.connNextText +
                            '</i>');
                }
            },
            /*------------- end add controlls elements -------------------------*/

            /*------------- all controlls functions -------------------------*/
            arrowControlls: function () {
                var self = this;

                $('.' + options.nextBtn).on('click', function (e) {
                    e.preventDefault();
                    if (options.effects == false) {
                        self.simpleMove(mainCarousel, $(this));
                    } else {
                        self.css3move(mainCarousel, $(this));
                    }

                });

                $('.' + options.prevBtn).on('click', function (e) {
                    e.preventDefault();
                    if (options.effects == false) {
                        self.simpleMove(mainCarousel, $(this));
                    } else {
                        self.css3move(mainCarousel, $(this));
                    }
                });


                /*---------------------- check if not circular carousel and disable prev btn -------------------------*/
                if (options.wrap.indexOf('circular') == -1) {
                    $('.' + options.prevBtn).addClass('disabled');
                }
                /*---------------------- end check if not circular carousel and disable prev btn -------------------------*/
            },
            /*------------- end all controlls functions -------------------------*/

            /*------------- simple .animate() -------------------------*/
            simpleMove: function (carousel, buttom) {
                var dir = '',
                    dirOp = '',
                    otherBtn = '',
                    self = this,
                    btn = buttom;


                if (buttom.attr('class').indexOf('next') !== -1) {
                    dir = '-';
                    dirOp = '';
                    otherBtn = 'prev';
                } else {
                    dir = '+';
                    dirOp = '-';
                    otherBtn = 'next';
                }

                if (!btn.hasClass('inactive') && !btn.hasClass('disabled')) {
                    btn.siblings('[class*="' + otherBtn + '"]').removeClass('disabled')

                    self.disEnButtons(btn, 'disable');

                    carousel.animate({
                            left: dir + '=' + item.outerWidth(true) + 'px'
                        }, 300,
                        function () {
                            if (carousel.css('left') == '0px') {
                                if (options.wrap == 'circular') {
                                    $(this).css('left', dirOp + (item.outerWidth(true) * itemsCount + 'px'));
                                } else {
                                    btn.addClass('disabled');
                                }
                            }
                            if (carousel.css('left') == '-' + (item.outerWidth(true) * (options.quantity + itemsCount) - item.outerWidth(true)*2) + 'px') {
                                if (options.wrap == 'circular') {
                                    $(this).css('left', '-' + (item.outerWidth(true) * itemsCount-item.outerWidth(true) + 'px'));
                                } else {
                                    btn.addClass('disabled');
                                }
                            }

                            self.disEnButtons(btn, 'enable');

                            // set active class if connected carousel
//                        if (options.connected == true) {
//                            setactive(carousel);
//                        }

                        }
                    )
                }
            },
            /*------------- end simple .animate() -------------------------*/

            /*------------- css3 animations -------------------------*/
            css3move: function (carousel, buttom) {
                /*---------------------------------- variables -------------------------*/

                var otherBtn = '',
                    self = this,
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
                }
                else {
                    this.setAnimation(options.effect);
                }


                if (buttom.attr('class').indexOf('next') !== -1) {
                        nextPage = activePage.next();
                        prevPage = activePage.prev();
                    otherBtn = 'prev';
                } else {
                        nextPage = activePage.prev();
                        prevPage = activePage.next();
                    otherBtn = 'next';
                }

                if (!btn.hasClass('inactive') && !btn.hasClass('disabled')) {
                    btn.siblings('[class*="prev"],[class*="next"]').removeClass('disabled')

                    self.disEnButtons(btn, 'disable');

                    activePage
                        .removeClass('active', 'swipeslider_anim_current')
                        .addClass(outClass);
                    nextPage
                        .addClass('swipeslider_anim_current ' + inClass + ' active');

                    item.on(
                        "animationend MSAnimationEnd oAnimationEnd webkitAnimationEnd",
                        function () {

                            activePage.attr('class', startClass);
                            prevPage.attr('class', startClass);
                            nextPage.attr('class', startClass + ' active swipeslider_anim_current');

                            self.disEnButtons(btn, 'enable');


                            self.debug('active item index '+parseInt(mainCarousel.find('.active').index()))
                            self.debug('first item index '+parseInt(item.eq(0).index()))
                            self.debug('last item index '+parseInt(item.eq(-1).index()))

                            if (parseInt(mainCarousel.find('.active').index()) === parseInt(item.eq(-1).index()) && options.wrap !== 'circular') {
                                btn.addClass('disabled');
                            }
                            if (parseInt(mainCarousel.find('.active').index()) === parseInt(item.eq(0).index()) && options.wrap !== 'circular') {
                                btn.addClass('disabled');
                            }
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
                var activeNum = Math.abs(Math.floor(parseInt(carousel.css('left')) / parseInt(carousel.find('li').width())));

                mainCarousel.find('li').removeClass('active').eq(activeNum).addClass('active');
                conCarousel.find('li').removeClass('active').eq(activeNum).addClass('active');
                if (carousel.parent().attr('class').indexOf(conCarousel.attr('class'))) {
                    mainCarousel.animate({
                        'left': '-' + activeNum * mainCarousel.find('li').width()
                    })
                }
            },
            /*------------- end set active elements only if connected carousel -------------------------*/

            /*------------- auto play functions -------------------------*/
            autoplay: function () {
                if (options.autoPlay) {
                    function aPlay() {
                        delId = setTimeout(aPlay, options.autoPlayDelay * 1000);
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

                    var elRealQuant = el.find('li').length; //реальное колличество эллементов
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
                    var thisClass = conCarousel.attr('class'),
                        item = conCarousel.find('li');

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

                    // activate picture from main carousel on click connected carousel item
                    item.on('click', function (e) {
                        e.preventDefault();

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
                    })

                    if (options.connBtns == true) {
                        conCarousel
                            //add arrows
                            .after('<i class="' + options.connPrev + '">' + options.connPrevText + '</i><i class="' + options.connNext + '">' + options.connNextText + '</i>')

                        //add prev btn functionality
                        this.controlls(options.connPrev, conCarousel);

                        //add next btn functionality
                        this.controlls(options.connNext, conCarousel);
                    }
                }
            },
            /*------------- end connected carousel -------------------------*/

            /*------------- css3 animations controlls -----------------------------------------------*/
            css3effects: function () {


                btnclick = function () {

                    /*---------------------------------- variables -------------------------*/
                    var thisPage = mainCarousel.find('li').eq(page),
                        nextPage = thisPage.next(),
                        prevPage = thisPage.prev(),
                        outClass = '',
                        inClass = '',
                        curent = 0,
                        animation = 1;
                    /*---------------------------------- end variables -------------------------*/

                    /*---------------------------------- btn on click event -------------------------*/
                    $('.' + options.nextBtn).click(function (event) {
                        var btn = $(this);
                        event.preventDefault();
                        $(this).addClass('inactive');


                        this.setAnimation(options.effect);
                        thisSLide
                            .removeClass('active', 'swipeslider_anim_current')
                            .addClass(outClass)
                            .next()
                            .addClass('swipeslider_anim_current ' + inClass + ' active');
                        thisSLide.prev().attr('class', thisSLide.data('originalClassList'));
                        console.log(thisSLide.data('originalClassList'));

                        $(this).removeClass('inactive');
                    });
                    /*---------------------------------- end btn on click event -------------------------*/

                };

                /*---------------------------------- end switch case animations-------------------------*/

                misc = function () {
                    /*---------------------------------- get original class name -------------------------*/
                    item.each(function () {
                        var $page = $(this);
                        $page.data('originalClassList', $page.attr('class'));
                    });
                    /*---------------------------------- end get original class name -------------------------*/


                    function onEndAnimation($outpage, $inpage) {
                        endCurrPage = false;
                        endNextPage = false;
                        resetPage($outpage, $inpage);
                        isAnimating = false;
                    }

                    function resetPage($outpage, $inpage) {
                        $outpage.attr('class', $outpage.data('originalClassList'));
                        $inpage.attr('class', $inpage.data('originalClassList') + ' swipeslider_anim_current');
                    }
                }
            },
            /*------------- end css3 animations controlls -----------------------------------------------*/

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

        return this.each(functions.init());
    };
})
    (jQuery);