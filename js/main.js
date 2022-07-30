const mainSlide = new Swiper(".main_visual", {
  loop: true,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: ".main_visual .right_arrow",
    prevEl: ".main_visual .left_arrow",
  },
  pagination: {
    el: ".main_pagination",
    type: "bullets",
    clickable: true,
  },
})
// swiper_main_slider

const bestSlideLeft = new Swiper(".best_item_slider .left_slider", {
  loop: true,
  touchRatio: 0,
  navigation: {
    nextEl: ".best_item .right_arrow",
    prevEl: ".best_item .left_arrow",
  },
  on: {
    activeIndexChange: bestSlideText, // 슬라이드가 변경될 때 해당 함수를 실행
  },
})

const bestSlideRight = new Swiper(".best_item_slider .right_slider", {
  loop: true,
  slidesPerView: "3",
  touchRatio: 0,
  navigation: {
    nextEl: ".best_item .right_arrow",
    prevEl: ".best_item .left_arrow",
  },
})

function bestSlideText() {
  let textBoxs = document.querySelectorAll(".text_box .info")
  textBoxs.forEach((textBox) => {
    textBox.classList.remove("on")
  })
  textBoxs[this.realIndex].classList.add("on")
}
// swiper_best_slider

function tabOverlay() {
  let tabs = document.querySelectorAll(".category_tab")
  let categorys = document.querySelectorAll(".category_item")
  let objs = document.querySelectorAll(".obj")
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("on")
      })
      tab.classList.add("on")
      categorys.forEach((category) => {
        category.classList.remove("on")
      })
      categorys[i].classList.add("on")
    })
  }) //우측 탭 메뉴 구동

  let overlay = document.querySelector(".overlay")
  document
    .querySelector(".category_left_tab")
    .addEventListener("mouseleave", () => {
      overlay.classList.remove("on")
    })

  objs.forEach((obj) => {
    obj.addEventListener("mouseenter", hoverFuc)
  })

  function hoverFuc() {
    let top = this.offsetTop
    let left = this.offsetLeft
    let desc = this.querySelector(".item_desc").textContent
    let price = this.querySelector(".item_price").textContent
    let setDesc = document.querySelector(".overlay .item_desc")
    let setprice = document.querySelector(".overlay .item_price")

    document.querySelector(".overlay").href = this.href
    overlay.classList.add("on")

    overlay.style.top = `${top}px`
    overlay.style.left = `${left}px`
    setDesc.textContent = desc
    setprice.textContent = price
  } //좌측 overlay 움직임 구현
}
tabOverlay()
// tabOverlay()

function timeEvent() {
  let hour = document.querySelector(".hour")
  let minutes = document.querySelector(".minutes")
  let seconds = document.querySelector(".seconds")
  let today = new Date() //현재 시간
  let getToday = today.getTime() //현재시간을 난수화
  setInterval(() => {
    getToday -= 1000 // 1초 감소
    let now = new Date(getToday)
    hour.textContent = now.getHours().toString().padStart(2, "0") // padStart(자릿수,추가요소)
    minutes.textContent = now.getMinutes().toString().padStart(2, "0")
    seconds.textContent = now.getSeconds().toString().padStart(2, "0")
  }, 1000)
}
timeEvent()
// time_event

const instaSlider = new Swiper(".insta_slider", {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 10,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".insta_pagination",
    type: "progressbar",
    clickable: true,
  },
})
// swiper_insta_slider
