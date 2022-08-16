function subTab() {
  let tabBtns01 = document.querySelectorAll(".teaser_01 .tab")
  let tabBtns02 = document.querySelectorAll(".teaser_02 .tab")
  let focusImgs01 = document.querySelectorAll(".teaser_01 .focus_img")
  let focusImgs02 = document.querySelectorAll(".teaser_02 .focus_img")

  tabBtns01.forEach((tabBtn, i) => {
    tabBtn.addEventListener("click", () => {
      focusImgs01.forEach((forcusImg) => {
        if (forcusImg.classList.contains("on")) {
          forcusImg.classList.remove("on")
        }
      })
      focusImgs01[i].classList.add("on")
    })
  })

  tabBtns02.forEach((tabBtn, i) => {
    tabBtn.addEventListener("click", () => {
      focusImgs02.forEach((forcusImg) => {
        if (forcusImg.classList.contains("on")) {
          forcusImg.classList.remove("on")
        }
      })
      focusImgs02[i].classList.add("on")
    })
  })
}
subTab()
// teaser 탭메뉴 동작