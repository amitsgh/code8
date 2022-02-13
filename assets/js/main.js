  /**
   * Scroll to Top on Refresh
   */
$(window).on('beforeunload', function(){
    $(window).scrollTop(0);
  });

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('fa-bars')
    this.classList.toggle('fa-times-circle')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('fa-bars')
        navbarToggle.classList.toggle('fa-times-circle')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const videoTwo = GLightbox({
    selector: ".glightbox",
    type: "video",
    source: "youtube", //vimeo, youtube or local
    width: 900,
    autoplayVideos: true,
  });

  /**
   * Timer
   */
   const end = new Date("Feb 14, 2022 16:19:00").getTime();
   //const end = new Date("November 09, 2020 00:00:00").getTime();
   const dayEl = document.querySelector(".days");
   const hoursEl = document.querySelector(".hours");
   const minutesEl = document.querySelector(".minutes");
   const secondsEl = document.querySelector(".seconds");
   const seconds = 1000;
   const minutes = seconds * 60;
   const hours = minutes * 60;
   const days = hours * 24;
   
   const x = setInterval(function () {
     let now = new Date().getTime();
     const difference = end - now;
   
     if (difference < 0) {
       clearInterval(x);
       document.getElementById("done").innerHTML = "";
       return;
     }
   
     dayEl.innerText = Math.floor(difference / days);
     hoursEl.innerText = Math.floor((difference % days) / hours);
     minutesEl.innerText = Math.floor((difference % hours) / minutes);
     secondsEl.innerText = Math.floor((difference % minutes) / seconds);
   }, seconds);

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})();

  /**
   * Counter for Stats
  */
$('[data-toggle="counterUp"]').counterUp({
  delay: 15,
  time: 1500
});

  /**
   * Form Button
  */
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const university = document.getElementById("university");
let validUsername = false;
let validEmail = false;
let validPhone = false;
let validUniversity = true;
// let validInterest = true;
// let validSuggestion = true;

const successAlert = document.getElementById("successAlert");
const failAlert = document.getElementById("failAlert");

successAlert.style.display = "none";
failAlert.style.display = "none";

username.addEventListener("blur", () => {
    let regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    let str = username.value;
    if (regex.test(str)) {
        username.classList.remove("is-invalid");
        validUsername = true;
    } else {
        username.classList.add("is-invalid");
        validUsername = false;
    }
});

email.addEventListener("blur", () => {
    let emailHelp = document.getElementById("emailHelp");
    let regex = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/;
    let str = email.value;
    if (regex.test(str)) {
        emailHelp.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" id="lockSvg" fill="currentColor" class="bi bi-lock-fill me-1 mb-1" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
      </svg>We'll <span>never</span> share your email with anyone else.</div>`;
        email.classList.remove("is-invalid");
        validEmail = true;
    } else {
        emailHelp.innerHTML = ``;
        email.classList.add("is-invalid");
        validEmail = false;
    }
});

phone.addEventListener("blur", () => {
    let regex = /^([0-9]){10}$/;
    let str = phone.value;
    if (regex.test(str)) {
        phone.classList.remove("is-invalid");
        validPhone = true;
    } else {
        phone.classList.add("is-invalid");
        validPhone = false;
    }
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbwCYDpCAm-qEILKcP9UXzHVVK1fhr-HN3N8jCJ4zC9Krb2OmlQ-Sy6LQ2RPMrIGWg9BeA/exec'
const form = document.forms['UserDetails']

let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (validEmail && validUsername && validPhone && validUniversity) {
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        successAlert.style.display = "block";
    } else {
        failAlert.style.display = "block";
    }
});

/**
   * Connection to Google Sheet
  */
 
//  form.addEventListener('submit', e => {
//    e.preventDefault()
//    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//      .then(response => {})
//      .catch(error => {})
//  })