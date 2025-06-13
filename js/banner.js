document.addEventListener("DOMContentLoaded", function () {
    // 모달 및 갤러리 요소
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".nav-arrow.prev");
    const nextBtn = document.querySelector(".nav-arrow.next");
    const imageCounter = document.getElementById("imageCounter");
    
    // 현재 갤러리 상태
    let currentGallery = [];
    let currentIndex = 0;
    
    // 각 섹션별 이미지 그룹 정의
    const galleryGroups = {
        'baneer': [],
        'app': []
    };
    
    // 페이지 로드 시 갤러리 그룹 초기화
    function initializeGalleries() {
        // baneer 섹션 이미지들
        const baneerSection = document.querySelector('#baneer .baneer_img');
        if (baneerSection) {
            const baneerImages = baneerSection.querySelectorAll('.gallery-image, .pc, .movile');
            galleryGroups['baneer'] = Array.from(baneerImages);
        }
        
        // app 섹션 이미지들
        const appSection = document.querySelector('#app .baneer_img');
        if (appSection) {
            const appImages = appSection.querySelectorAll('.gallery-image, .pc, .movile');
            galleryGroups['app'] = Array.from(appImages);
        }
        
        // 각 이미지에 클릭 이벤트 추가
        Object.keys(galleryGroups).forEach(groupKey => {
            galleryGroups[groupKey].forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    openModal(groupKey, index);
                });
            });
        });
    }
    
    // 모달 열기
    function openModal(groupKey, imageIndex) {
        currentGallery = galleryGroups[groupKey];
        currentIndex = imageIndex;
        
        if (currentGallery.length > 0) {
            updateModalImage();
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    }
    
    // 모달 이미지 업데이트
    function updateModalImage() {
        if (currentGallery[currentIndex]) {
            modalImg.src = currentGallery[currentIndex].src;
            modalImg.alt = currentGallery[currentIndex].alt;
            imageCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        }
    }
    
    // 모달 닫기
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
        currentGallery = [];
        currentIndex = 0;
    }
    
    // 이전 이미지로 이동
    function showPrevious() {
        if (currentGallery.length > 0) {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            updateModalImage();
        }
    }
    
    // 다음 이미지로 이동
    function showNext() {
        if (currentGallery.length > 0) {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            updateModalImage();
        }
    }
    
    // 이벤트 리스너 등록
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevious);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNext);
    }
    
    // 모달 배경 클릭 시 닫기
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // 키보드 네비게이션
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === "flex") {
            switch(event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevious();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        }
    });
    
    // 갤러리 초기화 실행
    initializeGalleries();
});
