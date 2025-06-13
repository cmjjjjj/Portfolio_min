// appre.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    const pageIndicator = modal.querySelector('.page-indicator');
    let currentImages = [];
    let currentIndex = 0;
    let currentSection = '';

    // 이미지 클릭 이벤트
    document.querySelectorAll('.enlargeable').forEach(img => {
        img.addEventListener('click', function () {
            // company 섹션 이미지는 enlargeable 클래스가 없어야 함
            if (this.closest('.company')) return;

            currentSection = this.dataset.section;
            currentImages = Array.from(document.querySelectorAll(`.enlargeable[data-section="${currentSection}"]`));
            currentIndex = currentImages.indexOf(this);

            modal.style.display = 'flex';
            modalImg.src = this.src;
            updateNavigation();
        });
    });

    function updateNavigation() {
        const isDesign = currentSection === 'design';
        document.querySelectorAll('.arrow, .page-indicator').forEach(el => {
            el.style.display = isDesign ? 'block' : 'none';
        });
        pageIndicator.textContent = isDesign ? `${currentIndex + 1}/${currentImages.length}` : '';
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIndex].src;
        updateNavigation();
    }

    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.querySelector('.prev').addEventListener('click', () => {
        if (currentSection === 'design') navigate(-1);
    });
    modal.querySelector('.next').addEventListener('click', () => {
        if (currentSection === 'design') navigate(1);
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex' && currentSection === 'design') {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        }
        if (modal.style.display === 'flex' && e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });

    // 모달 바깥 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
});
