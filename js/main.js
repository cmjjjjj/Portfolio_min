document.addEventListener("DOMContentLoaded", function () {
  // 👉 Hero 텍스트, 버튼, 세로선 순차 애니메이션
  const spans = document.querySelectorAll(".hero-title span");
  const heroMoreBtn = document.querySelector(".hero_more-btn");
  const divider = document.querySelector(".hero-divider");

  spans.forEach((span, idx) => {
    setTimeout(() => {
      span.style.opacity = 1;

      // 마지막 줄 이후 버튼 -> 세로선
      if (idx === spans.length - 1) {
        setTimeout(() => {
          heroMoreBtn.classList.add("visible");

          setTimeout(() => {
            divider.classList.add("visible");
          }, 600); // 버튼 뜨고 0.6초 후 세로선
        }, 800); // 텍스트 마지막 나오고 0.8초 후 버튼
      }
    }, idx * 900); // 텍스트 순차 등장
  });

// 기존 코드는 그대로 두고, 스킬 관련 부분만 교체

// 👉 Skills 스크롤 감지 애니메이션 (개선된 버전)
const skillSection = document.querySelector(".skills");
const skillItems = document.querySelectorAll(".skill-item");
const progressBars = document.querySelectorAll(".progress-bar");
let skillAnimated = false;

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
}

function animateSkillBars() {
  if (skillAnimated || !skillSection) return;

  if (isInViewport(skillSection)) {
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animated');
        const progressBar = item.querySelector('.progress-bar');
        const percentage = progressBar.getAttribute('data-percentage');
        progressBar.style.width = percentage + '%';
      }, index * 200); // 순차적으로 애니메이션
    });
    skillAnimated = true;
  }
}

// 스크롤 이벤트에 디바운싱 적용
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(animateSkillBars, 10);
});

// 페이지 로드 시에도 체크
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(animateSkillBars, 500);
});


  // 👉 부드러운 스크롤 이동 (About 섹션)
  const scrollBtn = document.querySelector(".scroll-to-about");
  const aboutSection = document.querySelector("#AboutMe");

  if (scrollBtn && aboutSection) {
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: "smooth"
      });
    });
  }
});
