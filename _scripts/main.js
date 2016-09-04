$(document).ready(function() {

  // Variables
  var $codeSnippets = $('.code-example-body'),
      $nav = $('.navbar'),
      $body = $('body'),
      $window = $(window),
      navOffsetTop = $nav.offset().top,
      $document = $(document),
      entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      }

  function init() {
    // $window.on('scroll', onScroll)
    // $window.on('resize', resize)
    $('a[href^="#"]').on('click', smoothScroll)
    buildSnippets();
  }

  function smoothScroll(e) {
    e.preventDefault();
    $document.off("scroll");
    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top-40
    }, 500, 'swing', function () {
        // window.location.hash = target;
        $document.on("scroll", onScroll);
    });
  }
  
  // add scrollup button for the long pages
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  // function resize() {
  //   $body.removeClass('has-docked-nav')
  //   navOffsetTop = $nav.offset().top
  //   onScroll()
  // }

  // function onScroll() {
  //   if(navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
  //     $body.addClass('has-docked-nav')
  //   }
  //   if(navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
  //     $body.removeClass('has-docked-nav')
  //   }
  // }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function buildSnippets() {
    $codeSnippets.each(function() {
      var newContent = escapeHtml($(this).html())
      $(this).html(newContent)
    })
  }

  // footer fixing code
  // function stickFooter() {
  //   var footer = $(".site-footer");
  //   var pos = footer.position();
  //   var height = $(window).height();
  //   height = height - pos.top;
  //   height = height - footer.outerHeight();
  //   if (height > 0) {
  //     footer.css({'margin-top': height + 'px'});
  //   }
  // }
  // stickFooter();
  // $(window).resize(function () {
  //   stickFooter();
  // });

  // toggle the hamburger open and closed states
  var removeClass = true;
  $(".navbar-toggle").click(function () {
    $(".navbar-toggle").toggleClass('is-active');
    $(".navbar-menu").toggleClass('active-menu');
    removeClass = false;
  });

  $(".navbar-menu").click(function() {
    removeClass = false;
  });

  $("html").click(function () {
    if (removeClass) {
      $(".navbar-toggle").removeClass('is-active');
      $(".navbar-menu").removeClass('active-menu');
    }
    removeClass = true;
  });

  $(".navbar-link").click(function () {
    if (removeClass) {
      $(".navbar-toggle").removeClass('is-active');
      $(".navbar-menu").removeClass('active-menu');
    }
    removeClass = true;
  });

  // disable mobile nav for laptop and desktop
  $(window).resize(function() {
    if( $(this).width() > 1000 ) {
      $(".navbar-toggle").removeClass('is-active');
      $(".navbar-menu").removeClass('active-menu');
    }
  });

  init();

});



