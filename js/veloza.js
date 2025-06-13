document.addEventListener("DOMContentLoaded", function () {
    const imgModal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = imgModal.querySelector(".close");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const currentIndexSpan = document.getElementById("currentIndex");
    const totalImagesSpan = document.getElementById("totalImages");
    const mainImage = document.getElementById("mainImage");
    const pptImages = Array.from(document.querySelectorAll(".pptimg"));
    const showcaseImages = Array.from(document.querySelectorAll(".showcase-item img"));
    const modalCounter = document.querySelector(".modal-counter");
    let currentIndex = 0;
    let currentImageSet = [];
    let touchStartX = 0;

    // 터치 이벤트 핸들러
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) nextImage();
            else prevImage();
        }
    }

    // mainImage 클릭: 단일 이미지
    if (mainImage) {
        mainImage.style.cursor = "pointer";
        mainImage.addEventListener("click", function() {
            currentImageSet = [mainImage];
            showModal(0);
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        });
    }

    // pptimg & showcase 이미지 클릭
    [...pptImages, ...showcaseImages].forEach((img, idx) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function() {
            currentImageSet = [...pptImages, ...showcaseImages];
            showModal(currentImageSet.indexOf(this));
        });
    });

    function showModal(idx) {
        imgModal.style.display = "flex";
        modalImg.src = currentImageSet[idx].src;
        currentIndex = idx;
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        modalCounter.style.display = "block";
        updateNavButtons();
        updateCounter();
    }

    function showImage(idx) {
        if (idx >= 0 && idx < currentImageSet.length) {
            modalImg.src = currentImageSet[idx].src;
            currentIndex = idx;
            updateNavButtons();
            updateCounter();
        }
    }

    function prevImage() { showImage(currentIndex - 1); }
    function nextImage() { showImage(currentIndex + 1); }

    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);

    // 터치 이벤트 리스너
    imgModal.addEventListener('touchstart', handleTouchStart, false);
    imgModal.addEventListener('touchend', handleTouchEnd, false);

    function updateNavButtons() {
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === currentImageSet.length - 1;
        
        prevBtn.style.opacity = isFirst ? "0.3" : "1";
        nextBtn.style.opacity = isLast ? "0.3" : "1";
        prevBtn.style.pointerEvents = isFirst ? "none" : "auto";
        nextBtn.style.pointerEvents = isLast ? "none" : "auto";
    }

    function updateCounter() {
        if (currentIndexSpan && totalImagesSpan) {
            currentIndexSpan.textContent = currentIndex + 1;
            totalImagesSpan.textContent = currentImageSet.length;
        }
    }

    // 키보드/터치 이벤트
    document.addEventListener("keydown", function(e) {
        if (imgModal.style.display === "flex") {
            if (e.key === "ArrowLeft") prevImage();
            else if (e.key === "ArrowRight") nextImage();
            else if (e.key === "Escape") closeModal();
        }
    });

    function closeModal() {
        imgModal.style.display = "none";
        modalImg.src = "";
        currentImageSet = [];
    }

    closeBtn.onclick = closeModal;
    imgModal.addEventListener("click", function(e) {
        if (e.target === imgModal) closeModal();
    });
});
