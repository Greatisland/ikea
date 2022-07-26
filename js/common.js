window.addEventListener("scroll", () => {
  let header = document.querySelector("header")
  let currentScroll = window.scrollY // 현재 윈도우 창의 스크롤값
  if (currentScroll >= 100) {
    header.classList.add("on")
    document.querySelector(".gnb_content").style.top = "111px"
  } else {
    header.classList.remove("on")
    document.querySelector(".gnb_content").style.top = "151px"
  }
})
// header_scroll

function topNaviFunc() {
  let topNavi = document.querySelector(".top_navi")
  topNavi.addEventListener("click", (e) => {
    e.preventDefault
    gsap.to(window, 0.5, {
      scrollTo: 0,
    })
  })

  document.addEventListener("scroll", () => {
    currentScroll = window.scrollY
    currentScroll > 500 ? topNaviOn() : topNaviOff()
  }) //

  function topNaviOn() {
    gsap.to(topNavi, 0.6, {
      opacity: 1,
      display: "block",
    })
  }

  function topNaviOff() {
    gsap.to(topNavi, 0.6, {
      opacity: 0,
      display: "none",
    })
  }
}
topNaviFunc()
// top_navi

function search() {
  let searchState = false
  let searchIcon = document.querySelector(".search_icon")
  let searchBar = document.querySelector(".search_bar")

  searchIcon.addEventListener("click", (e) => {
    if (!searchState) {
      e.preventDefault()
      searchBar.classList.add("on")
      searchBar.focus()
      searchState = true
    }
  })

  document.search.addEventListener("submit", () => {
    searchBar.classList.remove("on")
    searchState = false
    searchBar.value ? alert(`${searchBar.value}을 검색합니다.`) : null // 검색어가 있을 경우 알림창을 띄움
  })
}
search()
// search

function gnbMenu() {
  let menu = document.querySelector(".lnb_btn")
  let con = document.querySelector(".gnb_content")
  menu.addEventListener("mouseenter", () => {
    con.style.height = `${con.scrollHeight}px` // con의 height 증가로 scrollDown 효과
  })
  menu.addEventListener("mouseleave", () => {
    con.style.height = "0"
  })

  let lnbs = document.querySelectorAll(".lnb")
  lnbs.forEach((lnb) => {
    lnb.addEventListener("mouseenter", lnbListShow)
  })
  function lnbListShow() {
    lnbs.forEach((lnb) => {
      if (!this.classList.contains("on")) {
        lnb.classList.remove("on")
      }
    })
    this.classList.add("on")
  }
}
gnbMenu()
// gnbMenu
