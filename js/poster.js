document.addEventListener("DOMContentLoaded", function () {
    // 모달 요소들 가져오기
    const paymentModal = document.getElementById("imgModal");
    const campModal = document.getElementById("campModal");
    const festivals1Modal = document.getElementById("festivals1Modal");
    const festivals2Modal = document.getElementById("festivals2Modal");
    const mainPoster = document.getElementById("mainPoster");
    const campImageContainer = document.getElementById("campImageContainer");
    const festivals1Poster = document.getElementById("festivals1Poster");
    const festivals2Poster = document.getElementById("festivals2Poster");
    const modalImg = document.getElementById("modalImg");
    const modalImg1 = document.getElementById("modalImg1");
    const modalImg2 = document.getElementById("modalImg2");
    const festivals1ModalImg = document.getElementById("festivals1ModalImg");
    const festivals2ModalImg = document.getElementById("festivals2ModalImg");
    const closeButtons = document.getElementsByClassName("close");

    // 학과비 납부 포스터 클릭 이벤트
    if (mainPoster && paymentModal && modalImg) {
        mainPoster.onclick = function () {
            paymentModal.style.display = "flex";
            modalImg.src = this.src;
        }
    }

    // 참인성캠프 이미지 컨테이너 클릭 이벤트
    if (campImageContainer && campModal && modalImg1 && modalImg2) {
        campImageContainer.onclick = function () {
            campModal.style.display = "flex";
            modalImg1.src = "img/poster/MTposter01.jpg";
            modalImg2.src = "img/poster/MTposter02.jpg";
        }
    }

    // 축제 포스터_1 클릭 이벤트
    if (festivals1Poster && festivals1Modal && festivals1ModalImg) {
        festivals1Poster.onclick = function () {
            festivals1Modal.style.display = "flex";
            festivals1ModalImg.src = this.src;
        }
    }

    // 축제 포스터_2 클릭 이벤트
    if (festivals2Poster && festivals2Modal && festivals2ModalImg) {
        festivals2Poster.onclick = function () {
            festivals2Modal.style.display = "flex";
            festivals2ModalImg.src = this.src;
        }
    }

    // 모든 닫기 버튼에 이벤트 리스너 추가
    Array.from(closeButtons).forEach(function (closeBtn) {
        closeBtn.onclick = function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "none";
            }
        }
    });

    // 모달 바깥 클릭 시 닫기
    window.onclick = function (event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = "none";
        }
        if (event.target === campModal) {
            campModal.style.display = "none";
        }
        if (event.target === festivals1Modal) {
            festivals1Modal.style.display = "none";
        }
        if (event.target === festivals2Modal) {
            festivals2Modal.style.display = "none";
        }
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape") {
            if (paymentModal) paymentModal.style.display = "none";
            if (campModal) campModal.style.display = "none";
            if (festivals1Modal) festivals1Modal.style.display = "none";
            if (festivals2Modal) festivals2Modal.style.display = "none";
        }
    });

    // 호버 효과를 위한 추가 이벤트
    if (campImageContainer) {
        campImageContainer.addEventListener('mouseenter', function () {
            this.style.cursor = 'pointer';
        });

        campImageContainer.addEventListener('mouseleave', function () {
            this.style.cursor = 'default';
        });
    }
});
