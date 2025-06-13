document.addEventListener("DOMContentLoaded", function() {
    // Get all video elements
    const videoInterview = document.getElementById("video_interview");
    const videoCamping = document.getElementById("video_camping");
    const videoEnvironment = document.getElementById("video_environment");
    const allVideos = [videoInterview, videoCamping, videoEnvironment];
    
    // Function to limit video playback to 5 seconds and loop
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
    
    // Set up looping for all videos
    allVideos.forEach(video => {
        if (video) {
            setupVideoLoop(video);
        }
    });
    
    // Add click event listeners to video sections for navigation (첫 번째 섹션 제외)
    const videoSections = document.querySelectorAll(".video:not(#interview_section)");
    
    videoSections.forEach(section => {
        section.addEventListener("click", function() {
            const videoElement = this.querySelector("video");
            if (videoElement) {
                const videoId = videoElement.id;
                
                switch(videoId) {
                    case "video_camping":
                        window.location.href = "video_camping_detail.html";
                        break;
                    case "video_environment":
                        window.location.href = "video_environment_detail.html";
                        break;
                    default:
                        console.log("Unknown video section");
                }
            }
        });
        
        section.addEventListener("mouseenter", function() {
            this.classList.add("hover");
        });

        section.addEventListener("mouseleave", function() {
            this.classList.remove("hover");
        });
    });
    
    // in_nav 링크 처리를 제거하거나 수정
    // 기본 링크 동작을 허용하도록 변경
    document.querySelectorAll('.in_nav a[href^="http"], .in_nav a[href^="/"], .in_nav a[href^="./"]').forEach(anchor => {
        // 실제 URL이 있는 링크는 기본 동작 허용
        anchor.addEventListener('click', function(e) {
            // preventDefault() 제거 - 기본 링크 동작 허용
            console.log('Navigating to:', this.href);
        });
    });
});
