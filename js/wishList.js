import modalWish from "./modalWish.js"

const wishList = () => {
  const wishSec = document.querySelector(".wish_list"), // 위시리스트 섹션
    wishAdds = document.querySelectorAll(".heart_btn"), // 각 item에 위치한 위시리스트 추가 버튼
    productList = wishSec.querySelector(".product_list")

  let observer = new MutationObserver((mutations) => {
    // 감시자 인스턴스 만들기
    // 생성된 dom엘리먼트를 읽을 수 없기에 dom변화를 감지하는 MutationObserver 사용

    // 노드가 변경됐을 때의 작업
    let checkBoxs = document.querySelectorAll(".check")
    function allCheck() {
      let allCheckBtn = wishSec.querySelector(".all_check")
      let allNotBtn = wishSec.querySelector(".all_not")
      allCheckBtn.addEventListener("click", () => {
        checkBoxs.forEach((checkBox) => {
          checkBox.checked = true
        })
      })
      allNotBtn.addEventListener("click", () => {
        checkBoxs.forEach((checkBox) => {
          checkBox.checked = false
        })
      })
    }
    allCheck() //체크박스 모두 체크or해제
    function itemDel() {
      let checkDelBtn = wishSec.querySelector(".check_del")
      checkDelBtn.addEventListener("click", () => {
        checkBoxs.forEach((checkBox) => {
          if (checkBox.checked) {
            checkBox.parentNode.remove()
          }
        })
      })
    }
    itemDel() // 체크된 item 모두 삭제
  })

  let option = {
    attributes: true,
    childList: true,
    characterData: true,
  } //감시자의 설정

  observer.observe(productList, option) //대상 노드에 감시자 전달

  wishAdds.forEach((wishAdd) => {
    wishAdd.addEventListener("click", wishItemAdd)
  }) // 위시리스트 추가

  function wishItemAdd() {
    let thisProd = this.parentNode.parentNode,
      title = thisProd.querySelector(".product_title").textContent, // 상품 이름
      desc = thisProd.querySelector(".product_desc").textContent, // 상품 설명
      price = thisProd.querySelector(".product_price .num_p").textContent, //상품 가격
      img = thisProd.querySelector(".product_img img"), // 상품 이미지
      link = thisProd.querySelector(".product_img"),
      dataNum = thisProd.dataset.num, // 상품 data Number
      lists = wishSec.querySelectorAll(".add_list"), //위시리스트에 추가된 items
      listDupState = false // 위시리스트 중복 추가 감지 상태변수

    if (!lists[0] && !wishSec.classList.contains("on")) {
      if (
        confirm(
          "상품이 위시리스트에 담겼습니다. 지금 바로 위시리스트로 이동하시겠습니까?"
        )
      ) {
        wishSec.classList.add("on")
        if (wishSec.classList.contains("on")) {
          document.querySelector(".shopping_basket").classList.remove("on")
        }
      }
    } // 위시리스트에 처음 item을 추가할 때 장바구니 바로이동 팝업

    lists.forEach((list) => {
      if (list.dataset.num == dataNum) {
        listDupState = true
      }
    }) //위시리스트에 이미 같은 상품이 있는지 체크

    if (listDupState) {
      listDupState = false
      return
    } // 이미 같은상품이 추가되어 있으므로 위시리스트 추가 함수를 빠져나옴

    function addList(title, desc, price, img, link, dataNum) {
      return `
        <li class="add_list" data-num=${dataNum}>
          <input type="checkbox" class="check" id="check${dataNum}">
          <a href=${link.href} class="product_img"><img src=${img.src} alt="img"></a>
          <div class="text_box">
            <p class="product_title">${title}</p>
            <p class="product_desc">${desc}</p>
            <p class="product_price">₩ <span class="num_p">${price}</span></p>
          </div>
        </li>
      `
    } //위시리스트 추가상품 html구조 생성

    productList.innerHTML += addList(title, desc, price, img, link, dataNum)
  } //위시리스트 item 추가
}

modalWish()
export default wishList
