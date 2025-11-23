// 모든 detail-item 이미지 클릭 시 팝업 실행
document.querySelectorAll('.detail-item .img img').forEach(img => {
    img.addEventListener('click', function(e) {
        e.preventDefault();

        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');

        // data-full에 전체 이미지 경로 저장 → 팝업에 넣기
        modalImg.src = this.dataset.full;

        modal.style.display = "flex";
    });
});

// 닫기 버튼
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('imageModal').style.display = "none";
});

// 모달 바깥 클릭 시 닫기
document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.style.display = "none";
    }
});