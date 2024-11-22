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


// ================ OFF-CANVAS START ================

// document.querySelectorAll(".toggle-button").forEach((button) => {
//   button.addEventListener("click", function () {
//     const subMenu = this.nextElementSibling; // Get the corresponding sub-menu
//     const menuUp = this.querySelector(".menu_up");
//     const menuDown = this.querySelector(".menu_down");
    
//     if (subMenu.style.display === "block") {
//       subMenu.style.display = "none"; // Hide the sub-menu
//       menuUp.style.display = "block"; // Show the right arrow
//       menuDown.style.display = "none"; // Hide the down arrow
//     } else {
//       subMenu.style.display = "block"; // Show the sub-menu
//       menuUp.style.display = "none"; // Hide the right arrow
//       menuDown.style.display = "block"; // Show the down arrow
//     }
//   });
// });

// ================ OFF-CANVAS END ================


// ================ NAV POP_UP START ================

let nav = document.querySelector("nav");
let initvalue = 0;

window.addEventListener("scroll", function () {

  let currentScrollY = window.scrollY;

  if (initvalue > currentScrollY) {
    nav.classList.add("popUp_nav");
  } if(initvalue < 500) {
    nav.classList.remove("popUp_nav");
  }
  initvalue = currentScrollY;
});
// ================ NAV POP_UP END ================



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


// ================ OFF-CANVAS START ================
let menuUps = document.querySelectorAll('.menu_up');
let menuDowns = document.querySelectorAll('.menu_down');

menuUps.forEach(function(menuUp) {
  menuUp.addEventListener('click', function() {
    menuUp.classList.add('down_active');
    menuUp.parentNode.querySelector('.menu_down').classList.add('down_active');
  });
});

menuDowns.forEach(function(menuDown) {
  menuDown.addEventListener('click', function() {
    menuDown.classList.remove('down_active');
    menuDown.parentNode.querySelector('.menu_up').classList.remove('down_active');
  });
});
// ================ OFF-CANVAS END ================


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

// ================ MEGA SALE START ================
$(function(){
  $('.mega_slides').slick({
    dots: true,
    arrows: false,
    dotsClass: "container slide_active",
    autoplay: true,
    autoplaySpeed: 2400,
  });
})
// ================ MEGA SALE END ================


// ================ NEW ARRIVALS PRODUCT START ================
$(function(){
  $('.all_products').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: `<span class="left_arrow"><i class="fa-solid fa-chevron-left"></i></span>`,
    nextArrow: `<span class="right_arrow"><i class="fa-solid fa-chevron-right"></i></span>`,
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

// ================ NEW ARRIVALS PRODUCT END ================



// ================ DEALS OF THE DAYS START ================

// ============ DEALS SLIDER START ============

$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "container slidesActive",
    autoplay: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// ============ DEALS SLIDER END ============


// ============ DEALS COUNTDOWN START ============

let countdown;
let daysElement = document.querySelector(".days");
let hoursElement = document.querySelector(".hours");
let minutesElement = document.querySelector(".minutes");
let secondsElement = document.querySelector(".seconds");

// Initialize total countdown time in seconds
let totalSeconds =
  parseInt(daysElement.textContent) * 24 * 60 * 60 +
  parseInt(hoursElement.textContent) * 60 * 60 +
  parseInt(minutesElement.textContent) * 60 +
  parseInt(secondsElement.textContent);

countdown = setInterval(function () {
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Update the countdown display
  daysElement.textContent = days < 10 ? "0" + days : days;
  hoursElement.textContent = hours < 10 ? "0" + hours : hours;
  minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
  secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;

  if (totalSeconds <= 0) {
    clearInterval(countdown);
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    alert("Time's up!");
  }

  totalSeconds--;
}, 1000);

// ============ DEALS COUNTDOWN END ============

// ================ DEALS OF THE DAYS END ================



// ================ LATEST NEWS START ================

$(function () {
  $(".all_news").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    dotsClass: "container sliding_active",
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// ================ LATEST NEWS END ================


/** ::::::: JQUERY END ::::::: */


/** ::::: TOOLTIP START ::::: */

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/** ::::: TOOLTIP END ::::: */




let popUp = document.querySelector('.pop_up');
let allMenu = document.querySelector('');
let popupCross = document.querySelector('.cross_button');