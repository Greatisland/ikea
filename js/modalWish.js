const modalWish = () => {
  const wishSec = document.querySelector(".wish_list"), // 위시리스트 섹션
    wishBtn = document.querySelector(".heart_icon") // header에 위치한  위시리스트창 열림 버튼
    
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

export default modalWish