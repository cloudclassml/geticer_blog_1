(function ($) {
  "use strict";

  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      $(".main-header").addClass("sticky");
    } else {
      $(".main-header").removeClass("sticky");
    }
  });

  /*------------------------------------------------
            MAIN NAVIGATION
------------------------------------------------*/
  if ($(".main-header").length) {
    var mainHeader = $(".main-header"),
      mainHeaderHeight = mainHeader.height(),
      menuToggle = mainHeader.find(".menu-toggle"),
      mainMenuListWrapper = $(".main-menu > ul"),
      mainMenuListDropdown = $(".main-menu ul li:has(ul)");

    /* ========== Dropdown Menu Toggle ========== */
    menuToggle.on("click", function () {
      $(this).toggleClass("menu-open");
      mainMenuListWrapper.slideToggle(300);
    });

    mainMenuListDropdown.each(function () {
      $(this).append('<span class="dropdown-plus"></span>');
      $(this).addClass("dropdown_menu");
    });

    $(".dropdown-plus").on("click", function () {
      $(this).prev("ul").slideToggle(300);
      $(this).toggleClass("dropdown-open");
    });

    $(".dropdown_menu a").append("<span></span>");
  }

  /*--------------------------------------------------------------
 Keyboard Navigation
----------------------------------------------------------------*/
  if ($(window).width() < 1024) {
    $("#primary-menu")
      .find("li")
      .last()
      .bind("keydown", function (e) {
        if (e.which === 9) {
          e.preventDefault();
          $("#site-navigation").find(".menu-toggle").focus();
        }
      });

    $("#primary-menu > li:last-child button:not(.active)").bind("keydown", function (e) {
      if (e.which === 9) {
        e.preventDefault();
        $("#site-navigation").find(".menu-toggle").focus();
      }
    });
  } else {
    $("#primary-menu").find("li").unbind("keydown");
  }
})(jQuery);
