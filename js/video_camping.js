document.addEventListener("DOMContentLoaded", function () {
    const videoModal = document.getElementById("videoModal");
    const imgModal = document.getElementById("imgModal");
    const modalVideo = document.getElementById("modalVideo");
    const modalImg = document.getElementById("modalImg");
    const closeButtons = document.getElementsByClassName("close");
    const mainVideos = document.querySelectorAll(".mainVideo");
    const pptImages = document.querySelectorAll(".pptimg");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const currentIndexSpan = document.getElementById("currentIndex");
    const totalImagesSpan = document.getElementById("totalImages");
    
    let currentImageIndex = 0;
    const totalImages = pptImages.length;
    
    // 총 이미지 개수 설정
    totalImagesSpan.textContent = totalImages;

    // 5초 루프 설정 함수
    function setupVideoLoop(videoElement) {
        if (!videoElement) return;
        videoElement.addEventListener("loadeddata", function() {
            videoElement.addEventListener("timeupdate", function() {
                if (this.currentTime >= 5) {
                    this.currentTime = 0;
                }
            });
        });
    }

    // 이미지 표시 함수
    function showImage(index) {
        if (index >= 0 && index < totalImages) {
            currentImageIndex = index;
            modalImg.src = pptImages[index].src;
            currentIndexSpan.textContent = index + 1;
            
            // 버튼 활성화/비활성화
            prevBtn.style.opacity = index === 0 ? '0.5' : '1';
            nextBtn.style.opacity = index === totalImages - 1 ? '0.5' : '1';
            prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
            nextBtn.style.pointerEvents = index === totalImages - 1 ? 'none' : 'auto';
        }
    }

    // 다음 이미지
    function nextImage() {
        if (currentImageIndex < totalImages - 1) {
            showImage(currentImageIndex + 1);
        }
    }

    // 이전 이미지
    function prevImage() {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    }

    // 비디오 설정
    mainVideos.forEach(video => {
        setupVideoLoop(video);

        video.onclick = function() {
            videoModal.style.display = "flex";
            modalVideo.src = this.src;
            modalVideo.currentTime = 0;
            modalVideo.play();
        };

        video.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });

        video.addEventListener('mouseleave', function() {
            this.style.cursor = 'default';
        });
    });

    // PPT 이미지 모달 설정
    pptImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            imgModal.style.display = "flex";
            showImage(index);
        });
    });

    // 네비게이션 버튼 이벤트
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // 키보드 이벤트 (화살표 키)
    document.addEventListener('keydown', function(e) {
        if (imgModal.style.display === "flex") {
            if (e.key === "ArrowRight" || e.key === "Right") {
                e.preventDefault();
                nextImage();
            } else if (e.key === "ArrowLeft" || e.key === "Left") {
                e.preventDefault();
                prevImage();
            } else if (e.key === "Escape") {
                imgModal.style.display = "none";
            }
        } else if (e.key === "Escape") {
            if (videoModal.style.display === "flex") {
                videoModal.style.display = "none";
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            }
        }
    });

    // 모든 닫기 버튼에 이벤트 리스너 추가
    Array.from(closeButtons).forEach(function(closeBtn) {
        closeBtn.onclick = function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "none";
                if (modalId === 'videoModal' && modalVideo) {
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            }
        }
    });

    // 모달 바깥 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target === videoModal) {
            videoModal.style.display = "none";
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        }
        if (event.target === imgModal) {
            imgModal.style.display = "none";
        }
    }
});
