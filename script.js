// Cache DOM elements
const DOM = {
    pages: null,
    navLinks: null,
    mobileNav: null,
    menuIcon: null,
    lightbox: null,
    lightboxImg: null
};

// Initialize DOM cache and Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    DOM.pages = document.querySelectorAll('.page');
    DOM.navLinks = document.querySelectorAll('.nav-link');
    DOM.mobileNav = document.getElementById('mobile-nav');
    DOM.menuIcon = document.getElementById('menu-icon');
    DOM.lightbox = document.getElementById('lightbox');
    DOM.lightboxImg = document.getElementById('lightbox-img');
    
    // Initial icon creation for all elements
    lucide.createIcons();
});

// Navigation Logic
function navigateTo(pageId) {
    if (!DOM.pages) return;

    // Hide all pages
    DOM.pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(`page-${pageId}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update nav links
    DOM.navLinks.forEach(link => {
        if (link.getAttribute('data-page-id') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close mobile menu if open
    if (DOM.mobileNav.classList.contains('open')) {
        DOM.mobileNav.classList.remove('open');
        const menuIcon = document.getElementById('menu-icon');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const isOpen = DOM.mobileNav.classList.toggle('open');
    const menuIcon = document.getElementById('menu-icon');
    
    if (isOpen) {
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
}

// Lightbox Logic
function openLightbox(src) {
    DOM.lightboxImg.src = src;
    DOM.lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeLightbox() {
    DOM.lightbox.classList.remove('open');
    document.body.style.overflow = 'auto'; // Restore scroll
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
