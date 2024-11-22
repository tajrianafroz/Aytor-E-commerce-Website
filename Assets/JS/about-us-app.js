// ================ NAV START ================
let navMenus = document.querySelectorAll('.nav_menu');

navMenus.forEach(function(navMenu) {
  navMenu.addEventListener('click', function() {
    navMenus.forEach(function(menu) {
      menu.classList.remove('nav_active');
    });
    navMenu.classList.add('nav_active');
  });
});


let navIcons = document.querySelectorAll('.nav_icon');

navIcons.forEach(function(navIcon) {
  navIcon.addEventListener('click', function() {
    navIcons.forEach(function(icon) {
      icon.classList.remove('nav_icon_active');
    });
    navIcon.classList.add('nav_icon_active');
  });
});


// ================ SEARCH POP_UP START ================
let searchPopup = document.querySelector('.search_popup');
let searchIcon = document.querySelector('.search_icon');
let searchCross = document.querySelector('.cross_btn');
let searchForm = document.querySelector('.search_form');


searchIcon.addEventListener('click', function(){
  if(!searchPopup.classList.contains('search_popup_active')){
    searchPopup.classList.add('search_popup_active');
    searchForm.classList.add('search_form_active');
  }
});

searchCross.addEventListener('click', function(){
  if(searchPopup.classList.contains('search_popup_active')){
    searchPopup.classList.remove('search_popup_active');
    searchForm.classList.remove('search_form_active');
  }
});

searchPopup.addEventListener('click', (e)=>{
  if(e.target.classList.contains('search_popup_active')){
    searchPopup.classList.remove('search_popup_active');
    searchForm.classList.remove('search_form_active');
  }
});
// ================ SEARCH POP_UP END ================


// ================ NAV FOOTER START ================
let footerPopup = document.querySelector('.search_popup');
let footerIcon = document.querySelector('.search_footer_icon');
let footerCross = document.querySelector('.cross_btn');
let footerForm = document.querySelector('.search_form');


footerIcon.addEventListener('click', function(){
  if(!footerPopup.classList.contains('search_popup_active')){
    footerPopup.classList.add('search_popup_active');
    footerForm.classList.add('search_form_active');
  }
});

footerCross.addEventListener('click', function(){
  if(footerPopup.classList.contains('search_popup_active')){
    footerPopup.classList.remove('search_popup_active');
    footerForm.classList.remove('search_form_active');
  }
});

footerPopup.addEventListener('click', (e)=>{
  if(e.target.classList.contains('search_popup_active')){
    footerPopup.classList.remove('search_popup_active');
    footerForm.classList.remove('search_form_active');
  }
});
// ================ NAV FOOTER END ================


// ================ NAV END ================

/** ::::::: JQUERY START ::::::: */

// ================ LEADERSHIP EXPERT TEAM START ================
$(function(){
  $('.all_members').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: `<span class="left_arrow"><i class="fa-solid fa-caret-left"></i></span>`,
    nextArrow: `<span class="right_arrow"><i class="fa-solid fa-caret-right"></i></span>`,
    autoplay: true,
    autoplaySpeed: 2400,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
})

// ================ LEADERSHIP EXPERT TEAM END ================


// ================ AYTOR INSTAGRAM START ================
$(function(){
  $('.insta_gallery').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    dotsClass: "container slider_active",
    autoplay: true,
    autoplaySpeed: 2400,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  });
})

// ================ AYTOR INSTAGRAM END ================

/** ::::::: JQUERY END ::::::: */


/** ::::: TOOLTIP START ::::: */

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/** ::::: TOOLTIP END ::::: */