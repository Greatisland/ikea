///////////////////////////  cat_sub 코드 ///////////////////////////

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

/////////////////////////// 여기서부터 sub_page 코드 ///////////////////////////
function filterMenu() {
  let options = document.querySelectorAll(".filter_tab .option_menu")
  let optionLists = document.querySelectorAll(".filter_tab .option_lists")
  options.forEach((option, i) => {
    option.addEventListener("mouseenter", () => {
      optionLists[i].style.height = `${optionLists[i].scrollHeight}px`
    })
    option.addEventListener("mouseleave", () => {
      optionLists[i].style.height = 0
    })
  })
}
filterMenu()
// filter메뉴 동작

function filterScroll() {
  window.addEventListener("scroll", () => {
    let filterTap = document.querySelector(".filter_tab")
    let currentScroll = window.scrollY
    if (currentScroll > 200) {
      filterTap.classList.add("on")
    } else {
      filterTap.classList.remove("on")
    }
  })
}
filterScroll()
//스크롤에 따라 filter 화면 상단에 fixed

function filterAlign() {
  //정렬 함수
  let items = [...document.querySelectorAll(".product")] //product를 배열로 변경

  function filterBest() {
    //초기값 배열
    let thisInput = document.querySelector("#line01")
    thisInput.addEventListener("change", filterTry)
    function filterTry() {
      items.map((item) => {
        return (item.style.order = item.dataset.num)
      })
    }
  }
  filterBest()

  function filterRowPrice() {
    //낮은 가격 순으로 재배열
    let thisInput = document.querySelector("#line02")
    thisInput.addEventListener("change", filterTry)
    function filterTry() {
      items.sort((a, b) => {
        return a.dataset.price - b.dataset.price
      })
      items.map((item, i) => {
        return (item.style.order = `${i}`)
      })
    }
  }
  filterRowPrice()

  function filterHighPrice() {
    //높은 가격 순으로 재배열
    let thisInput = document.querySelector("#line03")
    thisInput.addEventListener("change", filterTry)
    function filterTry() {
      items.sort((a, b) => {
        return b.dataset.price - a.dataset.price
      })
      items.map((item, i) => {
        return (item.style.order = `${i}`)
      })
    }
  }
  filterHighPrice()

  function filterNew() {
    //새 상품 순으로 재배열
    let thisInput = document.querySelector("#line04")
    thisInput.addEventListener("change", filterTry)
    function filterTry() {
      items.map((item) => {
        return (item.style.order = item.dataset.release)
      })
    }
  }
  filterNew()
}
filterAlign()
// product 디스플레이 순서 함수

function thumbnail() {
  let thumbBtnProd = document.querySelector(".prod_btn")
  let thumbBtnSpace = document.querySelector(".space_btn")
  let thumbnailImg = document.querySelectorAll(".product .product_img")

  thumbBtnProd.addEventListener("click", () => {
    thumbBtnSpace.classList.remove("on")
    thumbBtnProd.classList.add("on")
    thumbnailImg.forEach((img) => {
      if (img.classList.contains("on")) {
        img.classList.remove("on")
      }
      if (img.classList.contains("prod_ver")) {
        img.classList.add("on")
      }
    })
  })

  thumbBtnSpace.addEventListener("click", () => {
    thumbBtnSpace.classList.add("on")
    thumbBtnProd.classList.remove("on")
    thumbnailImg.forEach((img) => {
      if (img.classList.contains("on")) {
        img.classList.remove("on")
      }
      if (img.classList.contains("space_ver")) {
        img.classList.add("on")
      }
    })
  })
}
thumbnail()
// thumbnail 교체

let fliterState = false // 필터옵션 체크상태 유무 상태변수
function filterRedisplay() {
  let filterTab = document.querySelector(".filter_tab") //form 전체
  let productGrid = document.querySelector(".product_grid")
  let allChecks = document.querySelectorAll(".filter_check") //input checkbox 전체
  let items = [...document.querySelectorAll(".product")] //product를 배열로 변경
  /////////////////////////////////////////

  filterTab.addEventListener("change", () => {
    fliterState = false
    let nameArray = []
    let styleArray = []
    let colorArray = []
    let onlineArray = []
    let priceArray = []
    let releaseArray = []
    nameArray.length = 0
    styleArray.length = 0
    colorArray.length = 0
    onlineArray.length = 0
    priceArray.length = 0
    releaseArray.length = 0
    items.forEach((item) => {
      item.classList.add("filter_on")
      //  모든 상품을 display:none으로 변경
      item.classList.remove("on")
      // 모든 상품의 on을 제거 (초기화)
    })

    allChecks.forEach((allCheck) => {
      if (allCheck.checked) {
        items.forEach((item) => {
          if (item.dataset.name == allCheck.dataset.name) {
            nameArray.push(item)
          }
          if (item.dataset.style == allCheck.dataset.style) {
            styleArray.push(item)
          }
          if (item.dataset.color == allCheck.dataset.color) {
            colorArray.push(item)
          }
          if (item.dataset.online == allCheck.dataset.online) {
            onlineArray.push(item)
          }

          if (Number(allCheck.dataset.release) > item.dataset.release) {
            releaseArray.push(item)
          }
          if (allCheck.dataset.price == 0) {
            if (item.dataset.price > 200000 && item.dataset.price < 400000) {
              priceArray.push(item)
            }
          }
          if (allCheck.dataset.price == 1) {
            if (item.dataset.price > 400000 && item.dataset.price < 600000) {
              priceArray.push(item)
            }
          }
          if (allCheck.dataset.price == 2) {
            if (item.dataset.price > 600000) {
              priceArray.push(item)
            }
          }
        })
      }
    }) // 각 필터 옵션에 맞는 item을 각 배열에 담음
    let allOptions = []
    allOptions.length = 0
    nameArray.length != 0 ? allOptions.push(nameArray) : null
    styleArray.length != 0 ? allOptions.push(styleArray) : null
    colorArray.length != 0 ? allOptions.push(colorArray) : null
    onlineArray.length != 0 ? allOptions.push(onlineArray) : null
    priceArray.length != 0 ? allOptions.push(priceArray) : null
    releaseArray.length != 0 ? allOptions.push(releaseArray) : null
    //각 배열을 담은 2차원 배열 생성
    let showItems = [] // 최종 렌더될 배열
    let filterRender01 = []
    let filterRender02 = []
    let filterRender03 = []
    let filterRender04 = []
    let filterRender05 = []
    if (allOptions[0]) {
      filterRender01 = items.filter((item) => {
        return allOptions[0].includes(item) //첫 번째 필터옵션만 체크되었을 때 최종 렌더
      })
    }
    if (allOptions[1]) {
      filterRender02 = filterRender01.filter((item) => {
        return allOptions[1].includes(item)
      })
      if (!allOptions[2]) {
        showItems = [...filterRender02]
      } else if (allOptions[2]) {
        filterRender03 = filterRender02.filter((item) => {
          return allOptions[2].includes(item)
        })
        if (!allOptions[3]) {
          showItems = [...filterRender03]
        } else if (allOptions[3]) {
          filterRender04 = filterRender03.filter((item) => {
            return allOptions[3].includes(item)
          })
          if (!allOptions[4]) {
            showItems = [...filterRender04]
          } else if (allOptions[4]) {
            filterRender05 = filterRender04.filter((item) => {
              return allOptions[4].includes(item)
            })
            showItems = [...filterRender05]
          }
        }
      }
    } else {
      showItems = [...filterRender01]
    }

    showItems.forEach((item) => {
      //최종 렌더될 배열
      item.classList.add("on")
    })

    allChecks.forEach((allCheck) => {
      if (allCheck.checked) {
        fliterState = true //필터가 하나라도 체크되어 있으면 true
        console.log(fliterState)
      }
    })
    console.log(fliterState)
    if (!fliterState) {
      items.forEach((item) => {
        item.classList.remove("filter_on") // 필터가 체크되어 있지 않으면 filter_on 클래스 제거하여 초기상태로 되돌림
      })
    }
  })

  allChecks.forEach((allCheck) => {
    // 체크된 옵션에 따라 하단에 버튼 생성
    allCheck.addEventListener("change", () => {
      if (allCheck.checked) {
        //옵션이 checked일 경우 해당 버튼 생성
        let thisId = allCheck.getAttribute("id")
        let thisTitle = allCheck.dataset.add
        addLabelBtn(thisId, thisTitle)
      } else {
        // 옵션이 checked가 아닐 경우 해당 버튼 제거
        let createBtn = document.querySelectorAll(".option_remove")
        let thisId = allCheck.getAttribute("id")
        createBtn.forEach((btn) => {
          let btnId = btn.getAttribute("for")
          if (btnId == thisId) {
            btn.remove()
          }
        })
      }
    })
  })
}
filterRedisplay() //카테고리 필터 함수

function addLabelBtn(id, title) {
  //버튼 생성 함수
  let filterDel = document.querySelector(".filter_del")
  filterDel.innerHTML += addBtn(id, title)
}

function addBtn(id, title) {
  //버튼의 html code 함수
  return `
  <label for="${id}" class="option_remove">${title}</label>
  `
}
