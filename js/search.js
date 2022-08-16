document.search.addEventListener("submit", () => {
  searchBar.classList.remove("on")
  searchState = false
  searchBar.value ? alert(`${searchBar.value}을 검색합니다.`) : null // 검색어가 있을 경우 알림창을 띄움
})