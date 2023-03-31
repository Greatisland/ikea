import wishList from "./wishList.js"
import modalCart from "./modalCart.js"

let shoppingSec = document.querySelector(".shopping_basket"), //장바구니 섹션
itemAdds = document.querySelectorAll(".bag_btn"), // 각 item에 위치한 장바구니 추가 버튼
productList = shoppingSec.querySelector(".product_add"), //추가한 item이 담기는 부모 ul요소
resultPrice = shoppingSec.querySelector(".result .price"), // 장바구니 금액 렌더링
deliveryCharge = 29000, // 배송비
deliveryState = false // 배송비 추가유무 상태변수 (배송비는 1회만 추가되어야 함)


let state = {
  shoppingItem: []
}//로컬스토리지에 담길 정보


const render = () => {
  const jsonState = JSON.parse(localStorage.getItem('state'))
  if(jsonState !== null) state = jsonState
  const totalPrice = state.shoppingItem.reduce((acc, item) => {
    return acc + (item.price) * (item.count)
  }, 0)
  resultPrice.textContent = totalPrice.toLocaleString()

  productList.innerHTML = `
    ${state.shoppingItem.map(item => (`
      <li class="add_list" data-num=${item.dataNum} data-price=${item.price}>
          <a href=${item.link} class="prod_img"><img src=${item.img} alt=""></a>
          <div class="text_box">
            <a href=${item.link} class="title">${item.title}</a>
            <p class="desc">${item.desc}</p>
            <div class="btn_box">
              <div class="add_box">
                <span class="minus">-</span>
                <span class="num">${item.count}</span>
                <span class="plus">+</span>
                <span class="del">삭제</span>
              </div>
            </div>
          </div>
          <span class="price_simbol">￦ <span class="price">${item.price.toLocaleString()}</span></span>
        </li>
    `))}
  `
}

itemAdds.forEach((itemAdd) => {
  itemAdd.addEventListener("click", shoppingAdd)
})

function shoppingAdd(){
  const { shoppingItem } = state
  if (shoppingItem.length<1 && !shoppingSec.classList.contains("on")) {
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

  const thisProd = this.parentNode.parentNode,
    title = thisProd.querySelector(".product_title").textContent, // 상품 이름
    desc = thisProd.querySelector(".product_desc").textContent, // 상품 설명
    price = thisProd.querySelector(".product_price .num_p").textContent, //상품 가격
    numberPrice = Number(price.replace(/,/g, "")), //가격 데이터의 콤마(,) 제거
    img = thisProd.querySelector(".product_img img"), // 상품 이미지
    link = thisProd.querySelector(".product_img"),
    dataNum = thisProd.dataset.num, // 상품 data Number
    existingItem = shoppingItem.find(item => item.dataNum === dataNum) // 중복 상품

  if(existingItem){
    existingItem.count += 1
  }else{
    const thisItem = {
      title, desc, dataNum,
      price: numberPrice,
      link: link.href,
      img: img.src,
      count: 1
    }
    shoppingItem.push(thisItem)
  }
  setState(shoppingItem)
}

const setState = (newState) => {
  state = {...state, ...newState}
  const jsonState = JSON.stringify(state)
  localStorage.setItem('state', jsonState)
  render()
}
render()

productList.addEventListener("click", (e) => {
  const thisProduct = e.target.parentNode.parentNode.parentNode.parentNode
  const { shoppingItem } = state
  if (e.target.classList.contains("del")) {
    const num = thisProduct.dataset.num
    const deleteItem = shoppingItem.findIndex(item => item.dataNum === num)
    shoppingItem.splice(deleteItem, 1)
    setState(shoppingItem)
  } //장바구니 item 삭제

  if (e.target.classList.contains("plus")) {
    const num = thisProduct.dataset.num
    const plusItem = shoppingItem.find(item => item.dataNum === num)
    plusItem.count += 1
    setState(shoppingItem)
  } //장바구니 item 갯수 증가

  if (e.target.classList.contains("minus")) {
    const num = thisProduct.dataset.num
    const minusItem = shoppingItem.find(item => item.dataNum === num)
    if(minusItem.count >= 2){
      minusItem.count -= 1
      setState(shoppingItem)
    }
  } //장바구니 item 갯수 빼기
})

modalCart()
wishList()