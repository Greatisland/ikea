function shoppingBasket() {
  let shoppingSec = document.querySelector(".shopping_basket") //장바구니 섹션
  let shoppingBtn = document.querySelector(".bag_icon") // header에 위치한 장바구니창 열림 버튼
  let itemAdds = document.querySelectorAll(".bag_btn") // 각 item에 위치한 장바구니 추가 버튼
  let productList = shoppingSec.querySelector(".product_add") //추가한 item이 담기는 부모 ul요소
  let resultPrice = shoppingSec.querySelector(".result .price") // 장바구니 금액 렌더링
  let totalPrice = 0 // 장바구니에 담긴 전체 금액
  let listDupState = false // 장바구니 중복 추가 감지 상태변수
  let deliveryCharge = 29000 // 배송비
  let deliveryState = false // 배송비 추가유무 상태변수 (배송비는 1회만 추가되어야 함)

  let couponBtn = shoppingSec.querySelector(".coupon .title")

  couponBtn.addEventListener("click", () => {
    document.coupon.classList.toggle("on")
  })

  function shoppingOpenClose() {
    shoppingBtn.addEventListener("click", () => {
      shoppingSec.classList.toggle("on")
      if (shoppingSec.classList.contains("on")) {
        document.querySelector(".wish_list").classList.remove("on")
      }
    })
    document
      .querySelector(".shopping_basket .exit")
      .addEventListener("click", () => {
        shoppingSec.classList.remove("on")
      })
    document
      .querySelector(".shopping_basket .back_btn")
      .addEventListener("click", () => {
        shoppingSec.classList.remove("on")
      })
  }
  shoppingOpenClose() //장바구니 모달창 열림or닫힘

  itemAdds.forEach((itemAdd) => {
    itemAdd.addEventListener("click", shoppingAdd)
  }) //장바구니 추가

  function totalPriceSense() {
    let deliveryChargeText = document.querySelector(".cond_01 .price")
    if (!deliveryState) {
      // 배송비 추가
      totalPrice += deliveryCharge
      deliveryChargeText.textContent = deliveryCharge.toLocaleString()
      resultPrice.textContent = totalPrice.toLocaleString()
      deliveryState = true
    }
    if (totalPrice == deliveryCharge) {
      // 총 주문 금액이 배송비와 같을 경우(총 주문 금액이 0일 경우와 같음) 배송비 삭제
      totalPrice -= deliveryCharge
      resultPrice.textContent = totalPrice.toLocaleString()
      deliveryChargeText.textContent = 0
      deliveryState = false
    } else if (totalPrice >= 1000000 + deliveryCharge) {
      //총 주문 금액이 1,000,000원 이상일 경우 배송비 삭제
      totalPrice -= deliveryCharge
      resultPrice.textContent = totalPrice.toLocaleString()
      deliveryChargeText.textContent = 0
      deliveryState = false
    }
  } // 장바구니 총 금액에 따른 배송비 변화

  function shoppingAdd() {
    let thisProd = this.parentNode.parentNode
    let title = thisProd.querySelector(".product_title").textContent // 상품 이름
    let desc = thisProd.querySelector(".product_desc").textContent // 상품 설명
    let price = thisProd.querySelector(".product_price .num_p").textContent //상품 가격
    let numberPrice = Number(price.replace(/,/g, "")) //가격 데이터의 콤마(,) 제거
    let img = thisProd.querySelector(".product_img img") // 상품 이미지
    let link = thisProd.querySelector(".product_img")
    let dataNum = thisProd.dataset.num // 상품 data Number
    let lists = shoppingSec.querySelectorAll(".add_list") //장바구니에 추가된 items

    if (!lists[0] && !shoppingSec.classList.contains("on")) {
      if (
        confirm(
          "상품이 장바구니에 담겼습니다. 지금 바로 장바구니로 이동하시겠습니까?"
        )
      ) {
        shoppingSec.classList.add("on")
        if (shoppingSec.classList.contains("on")) {
          document.querySelector(".wish_list").classList.remove("on")
        }
      }
    } // 장바구니에 처음 item을 추가할 때 장바구니 바로이동 팝업

    lists.forEach((list) => {
      if (list.dataset.num == dataNum) {
        let num = Number(list.querySelector(".num").textContent)
        num++
        list.querySelector(".num").textContent = num
        totalPrice += Number(list.dataset.price)
        resultPrice.textContent = totalPrice.toLocaleString() //장바구니 총 금액 변경
        listDupState = true
        totalPriceSense()
      }
    }) //장바구니에 이미 같은 상품이 있을 경우 수량 증가

    if (listDupState) {
      listDupState = false
      return
    } // 수량을 이미 추가했으므로 shoppingAdd함수를 여기서 빠져나옴

    function addList(title, desc, price, img, link, dataNum) {
      return `
        <li class="add_list" data-num=${dataNum} data-price=${numberPrice}>
          <a href=${link.href} class="prod_img"><img src=${img.src} alt=""></a>
          <div class="text_box">
            <a href=${link.href} class="title">${title}</a>
            <p class="desc">${desc}</p>
            <div class="btn_box">
              <div class="add_box">
                <span class="minus">-</span>
                <span class="num">1</span>
                <span class="plus">+</span>
                <span class="del">삭제</span>
              </div>
            </div>
          </div>
          <span class="price_simbol">￦ <span class="price">${price}</span></span>
        </li>
      `
    } //장바구니 추가상품 html구조 생성

    productList.innerHTML += addList(title, desc, price, img, link, dataNum)
    totalPrice += numberPrice
    resultPrice.textContent = totalPrice.toLocaleString()
    totalPriceSense()
    //추가 상품의 금액을 장바구니 총 금액에 추가
    //toLocaleString => 숫자에 각 사용자 로컬 환경에 맞는 콤마를 찍음
  } //장바구니 item 추가

  productList.addEventListener("click", (e) => {
    let thisProduct = e.target.parentNode.parentNode.parentNode.parentNode
    let num = Number(e.target.parentNode.children[1].textContent)

    if (e.target.classList.contains("del")) {
      totalPrice -= Number(thisProduct.dataset.price) * num
      resultPrice.textContent = totalPrice.toLocaleString() // 장바구니 총 금액 변경
      thisProduct.remove()
      totalPriceSense()
      return
    } //장바구니 item 삭제

    if (e.target.classList.contains("plus")) {
      num++
      e.target.parentNode.children[1].textContent = num
      totalPrice += Number(thisProduct.dataset.price)
      resultPrice.textContent = totalPrice.toLocaleString() // 장바구니 총 금액 변경
      totalPriceSense()
      return
    } //장바구니 item 갯수 증가

    if (e.target.classList.contains("minus")) {
      if (num > 0) {
        num--
        e.target.parentNode.children[1].textContent = num
        totalPrice -= Number(thisProduct.dataset.price)
        resultPrice.textContent = totalPrice.toLocaleString() // 장바구니 총 금액 변경
        totalPriceSense()
        return
      }
    } //장바구니 item 갯수 빼기
  })
}
shoppingBasket()
//shopping_basket

/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/

function wishList() {
  let wishSec = document.querySelector(".wish_list") // 위시리스트 섹션
  let wishBtn = document.querySelector(".heart_icon") // header에 위치한  위시리스트창 열림 버튼
  let wishAdds = document.querySelectorAll(".heart_btn") // 각 item에 위치한 위시리스트 추가 버튼
  let productList = wishSec.querySelector(".product_list")

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

  function wishOpenClose() {
    wishBtn.addEventListener("click", () => {
      wishSec.classList.toggle("on")
      if (wishSec.classList.contains("on")) {
        document.querySelector(".shopping_basket").classList.remove("on")
      }
    })
    document
      .querySelector(".wish_list .back_btn")
      .addEventListener("click", () => {
        wishSec.classList.remove("on")
      })
  }
  wishOpenClose() // 위시리스트 모달창 열림or닫힘

  wishAdds.forEach((wishAdd) => {
    wishAdd.addEventListener("click", wishItemAdd)
  }) // 위시리스트 추가

  function wishItemAdd() {
    let thisProd = this.parentNode.parentNode
    let title = thisProd.querySelector(".product_title").textContent // 상품 이름
    let desc = thisProd.querySelector(".product_desc").textContent // 상품 설명
    let price = thisProd.querySelector(".product_price .num_p").textContent //상품 가격
    let img = thisProd.querySelector(".product_img img") // 상품 이미지
    let link = thisProd.querySelector(".product_img")
    let dataNum = thisProd.dataset.num // 상품 data Number
    let lists = wishSec.querySelectorAll(".add_list") //위시리스트에 추가된 items
    let listDupState = false // 위시리스트 중복 추가 감지 상태변수

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
wishList()
//wish_list

const id = "abcd"
const pw = 1234
let loginState = false
function loginFuc() {
  let i = 5
  let loginBtn = document.querySelector(".login_btn")
  let joinBtn = document.querySelectorAll(".join_btn")
  let loginSec = document.querySelector(".login_sec")
  let loginExitBtn = document.querySelector(".login .exit")

  loginBtn.addEventListener("click", () => {
    if (!loginState) {
      loginSec.classList.add("on")
    } else {
      alert("로그아웃 되었습니다.")
      loginState = false
      loginAfter()
    }
  })
  loginExitBtn.addEventListener("click", () => {
    loginSec.classList.remove("on")
  })

  document.login.addEventListener("submit", (e) => {
    let userId = document.login.id_input.value
    let userPw = document.login.pw_input.value
    if (!userId && !userPw) {
      alert("아이디와 비밀번호를 입력해주세요.")
      e.preventDefault()
      return
    }
    if (id == userId && pw == userPw && i > 0) {
      alert("로그인 성공, 방문을 환영합니다.")
      document.login.id_input.value = ""
      document.login.pw_input.value = ""
      loginState = true
      loginAfter()
    } else if (id != userId && pw == userPw && i > 0) {
      e.preventDefault()
      alert(`아이디가 틀렸습니다. 로그인 가능 횟수가 ${i}회 남았습니다.`)
      document.login.id_input.focus()
      return --i
    } else if (id == userId && pw != userPw && i > 0) {
      e.preventDefault()
      alert(`비밀번호가 틀렸습니다. 로그인 가능 횟수가 ${i}회 남았습니다.`)
      document.login.pw_input.focus()
      return --i
    } else if (id != userId && pw != userPw && i > 0) {
      e.preventDefault()
      alert(
        `아이디와 비밀번호가 틀렸습니다. 로그인 가능 횟수가 ${i}회 남았습니다.`
      )
      document.login.id_input.focus()
      return --i
    } else {
      e.preventDefault()
      alert(
        "더 이상 로그인 할 수 없습니다. 아이디와 비밀번호를 재설정해주세요."
      )
    }
  })
  function loginAfter() {
    if (loginState) {
      loginBtn.querySelector("a").textContent = "로그아웃"
      loginSec.classList.remove("on")
      joinBtn[0].querySelector("a").textContent = ""
    } else {
      loginBtn.querySelector("a").textContent = "로그인"
      joinBtn[0].querySelector("a").textContent = "회원가입"
    }
  }
}
loginFuc()
