function showContent(contentId) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show selected content
    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(contentId).classList.add('active');

    // Animate skill bars if skills tab is selected
    if (contentId === 'skills') {
        animateSkillBars();
    }
}

function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

// Initial animation of skill bars
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
});