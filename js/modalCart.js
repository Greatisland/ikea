const modalCart = () => {
  const shoppingSec = document.querySelector(".shopping_basket"), //장바구니 섹션
    shoppingBtn = document.querySelector(".bag_icon"), // header에 위치한 장바구니창 열림 버튼
    couponBtn = shoppingSec.querySelector(".coupon .title")

  couponBtn.addEventListener("click", () => {
    document.coupon.classList.toggle("on")
  })
  
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

export default modalCart