let shoppingSec = document.querySelector(".shopping_basket"), //장바구니 섹션
    shoppingBtn = document.querySelector(".bag_icon"), // header에 위치한 장바구니창 열림 버튼
    itemAdds = document.querySelectorAll(".bag_btn"), // 각 item에 위치한 장바구니 추가 버튼
    productList = shoppingSec.querySelector(".product_add"), //추가한 item이 담기는 부모 ul요소
    resultPrice = shoppingSec.querySelector(".result .price"), // 장바구니 금액 렌더링
    totalPrice = 0, // 장바구니에 담긴 전체 금액
    listDupState = false, // 장바구니 중복 추가 감지 상태변수
    deliveryCharge = 29000, // 배송비
    deliveryState = false, // 배송비 추가유무 상태변수 (배송비는 1회만 추가되어야 함)
    couponBtn = shoppingSec.querySelector(".coupon .title")

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