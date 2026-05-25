// Cache DOM elements
const DOM = {
    pages: null,
    navLinks: null,
    mobileNav: null,
    menuIcon: null,
    lightbox: null,
    lightboxImg: null
};

function updateDOMCache() {
    DOM.pages = document.querySelectorAll('.page');
    DOM.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    DOM.mobileNav = document.getElementById('mobile-nav');
    DOM.menuIcon = document.getElementById('menu-icon');
    DOM.lightbox = document.getElementById('lightbox');
    DOM.lightboxImg = document.getElementById('lightbox-img');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDOMCache();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Navigation Logic
function navigateTo(pageId) {
    if (!DOM.pages || DOM.pages.length === 0) updateDOMCache();
    if (!DOM.pages) return;

    // Hide all pages
    DOM.pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(`page-${pageId}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active state on nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        if (link.getAttribute('data-page-id') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close mobile menu if open
    if (DOM.mobileNav && DOM.mobileNav.classList.contains('open')) {
        toggleMobileMenu();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    if (!DOM.mobileNav) updateDOMCache();
    if (!DOM.mobileNav) return;
    
    const isOpen = DOM.mobileNav.classList.toggle('open');
    const menuIcon = document.getElementById('menu-icon');
    
    if (menuIcon && typeof lucide !== 'undefined') {
        menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
    }
}

// Lightbox Logic
function openLightbox(src) {
    if (!DOM.lightboxImg || !DOM.lightbox) updateDOMCache();
    if (DOM.lightboxImg && DOM.lightbox) {
        DOM.lightboxImg.src = src;
        DOM.lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (!DOM.lightbox) updateDOMCache();
    if (DOM.lightbox) {
        DOM.lightbox.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
