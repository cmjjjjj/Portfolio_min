document.addEventListener("DOMContentLoaded", function () {
    // 모달 요소들 가져오기
    const videoModal = document.getElementById("videoModal");
    const mainVideo = document.getElementById("mainVideo");
    const modalVideo = document.getElementById("modalVideo");
    const closeButtons = document.getElementsByClassName("close");

    // 5초 루프 설정 함수
    function setupVideoLoop(videoElement) {
        if (!videoElement) return;
        
        videoElement.addEventListener("loadeddata", function() {
            console.log(`Video ${videoElement.id} loaded, duration: ${videoElement.duration}`);
            
            videoElement.addEventListener("timeupdate", function() {
                if (this.currentTime >= 5) {
                    this.currentTime = 0;
                    console.log(`Resetting ${this.id} to beginning`);
                }
            });
        });
        
        videoElement.addEventListener("error", function() {
            console.error(`Error loading video: ${videoElement.id}`);
        });
    }

    // 메인 비디오에 5초 루프 적용
    if (mainVideo) {
        setupVideoLoop(mainVideo);
    }

    // 메인 비디오 클릭 이벤트
    if (mainVideo && videoModal && modalVideo) {
        mainVideo.onclick = function() {
            videoModal.style.display = "flex";
            modalVideo.src = this.src;
            modalVideo.currentTime = 0; // 처음부터 재생
            modalVideo.play();
        }
    }

    // 모든 닫기 버튼에 이벤트 리스너 추가
    Array.from(closeButtons).forEach(function(closeBtn) {
        closeBtn.onclick = function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "none";
                // 모달 비디오 정지
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
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            if (videoModal) {
                videoModal.style.display = "none";
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            }
        }
    });

    // 비디오 호버 효과
    if (mainVideo) {
        mainVideo.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });

        mainVideo.addEventListener('mouseleave', function() {
            this.style.cursor = 'default';
        });
    }
});


// shotVideo 모달 오픈
const shotVideo = document.getElementById("shotVideo");
if (shotVideo && videoModal && modalVideo) {
    shotVideo.onclick = function() {
        videoModal.style.display = "flex";
        modalVideo.src = this.src;
        modalVideo.currentTime = 0;
        modalVideo.play();
    }
}
