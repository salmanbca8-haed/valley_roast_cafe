

(function ($) {
  "use strict";


  /* ================= NAVBAR ================= */

  // Close mobile menu on click
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  // Smooth scroll
  $('.smoothscroll, .click-scroll').on('click', function (e) {
    e.preventDefault();
    const target = $(this).attr('href');
    const headerHeight = $('.navbar').outerHeight();

    $('html, body').animate({
      scrollTop: $(target).offset().top - headerHeight - 10
    }, 700);
  });

  // Active nav on scroll
  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop() + $('.navbar').outerHeight() + 20;

    $('.nav-link.click-scroll').each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr('href'));

      if (
        refElement.length &&
        refElement.offset().top <= scrollPos &&
        refElement.offset().top + refElement.outerHeight() > scrollPos
      ) {
        $('.nav-link.click-scroll').removeClass('active');
        currLink.addClass('active');
      }
    });
  });

})(window.jQuery);
  document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("reviewForm");
    const reviewsWrapper = document.querySelector(".reviews-wrapper");

    if (!form || !reviewsWrapper) return;

    // 🔁 Load saved reviews ONCE
    const savedReviews = JSON.parse(localStorage.getItem("customerReviews")) || [];
    savedReviews.forEach(r => appendReview(r));

    // 🚫 REMOVE any existing submit listener
    form.onsubmit = null;

    // ✅ Attach ONE submit handler
    form.onsubmit = function (e) {
        e.preventDefault();

        const name = document.getElementById("reviewName").value.trim();
        const comment = document.getElementById("reviewComment").value.trim();
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        const imageInput = document.getElementById("profileImage");

        if (!name || !comment || !ratingInput || imageInput.files.length === 0) return;

        const reader = new FileReader();

        reader.onload = function () {
            const review = {
                name,
                comment,
                stars: parseInt(ratingInput.value),
                image: reader.result
            };

            saveReview(review);
            appendReview(review);
            form.reset();
        };

        reader.readAsDataURL(imageInput.files[0]);
    };

    function saveReview(review) {
        const reviews = JSON.parse(localStorage.getItem("customerReviews")) || [];
        reviews.push(review);
        localStorage.setItem("customerReviews", JSON.stringify(reviews));
    }

    function appendReview(review) {
        const stars =
            "★".repeat(review.stars) +
            "☆".repeat(5 - review.stars);

        const html = `
            <div class="review-card">
                <div class="review-avatar">
                    <img src="${review.image}" alt="${review.name}">
                </div>
                <h5>${review.name}</h5>
                <div class="review-stars">
                    ${stars.split("").map(s => `<span>${s}</span>`).join("")}
                </div>
                <p>${review.comment}</p>
            </div>
        `;

        reviewsWrapper.insertAdjacentHTML("beforeend", html);
    }
});
  const reveals = document.querySelectorAll('section');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
  });

  document.addEventListener('mousemove', e => {
    const steam = document.createElement('span');
    steam.className = 'cursor-steam';
    steam.style.left = e.pageX + 'px';
    steam.style.top = e.pageY + 'px';
    document.body.appendChild(steam);

    setTimeout(() => steam.remove(), 1200);
  });

  const toggle = document.getElementById('nightToggle');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    toggle.textContent = document.body.classList.contains('night-mode') ? '☀️' : '🌙';
  });






   

