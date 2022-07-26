const detailItemSlider = new Swiper(".detail_wrap .product_slide", {
  direction: "vertical",
  slidesPerView: 3,
  spaceBetween: 20,
  // centeredSlides: true,
  // centeredSlidesBounds: true,
  // slideToClickedSlide: true,
  loop: true,

  navigation: {
    nextEl: ".product_visual .top_arrow",
    prevEl: ".product_visual .bottom_arrow",
  },
})
function changeImg() {
  let focusImg = document.querySelector(".focus_img img")
  let slides = document.querySelectorAll(".product_slide .swiper-wrapper img")
  slides.forEach((img) => {
    img.addEventListener("click", () => {
      focusImg.src = img.src
    })
  })
}
changeImg()
// swiper_detail_slider

function accordionTab() {
  let accor = document.querySelectorAll(".accor")
  let accorHidden = document.querySelectorAll(".accor_hidden")
  accor.forEach((ele, i) => {
    ele.addEventListener("click", () => {
      ele.classList.toggle("on")
    })
  })
}
accordionTab()

const relevantSlider = new Swiper(".relevant_slide_swiper", {
  slidesPerView: 4,
  spaceBetween: 90,
  loop: true,
  autoplay: {
    delay: 4000,
  },

  navigation: {
    nextEl: ".relevant_slide .right_arrow",
    prevEl: ".relevant_slide .left_arrow",
  },
  pagination: {
    el: ".relevant_pagination",
    type: "bullets",
    clickable: true,
  },
})
//swiper_relevant_slider

const recommendSlider = new Swiper(".recommend_slide_swiper", {
  slidesPerView: 4,
  spaceBetween: 90,
  loop: true,
  autoplay: {
    delay: 4000,
  },

  navigation: {
    nextEl: ".recommend_slide .right_arrow",
    prevEl: ".recommend_slide .left_arrow",
  },
  pagination: {
    el: ".recommend_pagination",
    type: "bullets",
    clickable: true,
  },
})
//swiper_recommend_slider
