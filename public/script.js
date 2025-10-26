function copyToClipboard(text, event) {
    const fullUrl = window.location.origin + text;
    const btn = event.target;
    const originalText = btn.textContent;
    
    navigator.clipboard.writeText(fullUrl).then(() => {
        btn.textContent = 'Copied!';
        btn.style.background = '#16a34a';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#6366f1';
        }, 2000);
    }).catch(err => {
        alert('Copy error: ' + err);
    });
}

function toggleTOC() {
    const content = document.getElementById('tocContent');
    const toggle = document.querySelector('.toc-toggle');
    content.classList.toggle('open');
    toggle.classList.toggle('open');
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

