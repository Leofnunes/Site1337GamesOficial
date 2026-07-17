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
    initScrollObserver();
});

// Navigation Logic
function navigateTo(pageId) {
    if (!DOM.pages || DOM.pages.length === 0) updateDOMCache();
    if (!DOM.pages) return;

    const activePage = Array.from(DOM.pages).find(page => page.classList.contains('active'));
    
    if (activePage && activePage.id !== `page-${pageId}`) {
        // Desvanecimento suave da página ativa atual
        activePage.style.opacity = '0';
        activePage.style.transform = 'translateY(-12px)';
        activePage.style.transition = 'opacity 0.22s ease-in, transform 0.22s ease-in';
        
        setTimeout(() => {
            // Reseta estilos inline para o próximo carregamento
            activePage.style.opacity = '';
            activePage.style.transform = '';
            activePage.style.transition = '';
            
            // Alterna para a nova aba
            switchTabs(pageId);
        }, 220);
    } else {
        switchTabs(pageId);
    }
}

function switchTabs(pageId) {
    // Esconde todas as páginas
    DOM.pages.forEach(page => page.classList.remove('active'));

    // Mostra a página selecionada
    const selectedPage = document.getElementById(`page-${pageId}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Atualiza o estado ativo nos links de navegação
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        if (link.getAttribute('data-page-id') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Fecha o menu mobile se estiver aberto
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

// Scroll Fade-in Intersection Observer
function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px -10px -10px 0px', // Aciona um pouco antes de entrar totalmente na tela
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-fade');
    animatedElements.forEach(el => observer.observe(el));
}
