class HeartTrail {
    constructor() {
        this.container = document.getElementById('heart-trail-container');
        this.hearts = [];
        this.maxHearts = 25;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMobile = this.detectMobile();
        this.init();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0);
    }

    init() {
        if (!this.container) {
            console.warn('Heart trail container not found');
            return;
        }

        // Optimized for mobile performance
        const throttleDelay = this.isMobile ? 40 : 25;
        let lastMoveTime = 0;
        
        document.addEventListener('mousemove', (e) => {
            const now = performance.now();
            if (now - lastMoveTime > throttleDelay) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.createHeart(e.clientX, e.clientY);
                lastMoveTime = now;
            }
        });

        // Touch support for mobile
        if (this.isMobile) {
            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const now = performance.now();
                if (now - lastMoveTime > throttleDelay) {
                    this.mouseX = touch.clientX;
                    this.mouseY = touch.clientY;
                    this.createHeart(touch.clientX, touch.clientY);
                    lastMoveTime = now;
                }
            }, { passive: false });
        }

        this.createMainCursor();
    }

    createMainCursor() {
        // Don't show custom cursor on mobile
        if (this.isMobile) return;

        const mainCursor = document.createElement('div');
        mainCursor.className = 'main-heart-cursor';
        mainCursor.innerHTML = this.createHeartSVG(30, '#E91E63');
        
        mainCursor.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 10001;
            width: 30px;
            height: 30px;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        `;

        document.body.appendChild(mainCursor);

        document.addEventListener('mousemove', (e) => {
            mainCursor.style.left = e.clientX + 'px';
            mainCursor.style.top = e.clientY + 'px';
        });

        // Enhanced hover effects
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('button, .social-link, .wish-card, .stat, .answer-btn, .proceed-btn, .song-card, .slide-btn')) {
                mainCursor.style.transform = 'translate(-50%, -50%) scale(2)';
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches('button, .social-link, .wish-card, .stat, .answer-btn, .proceed-btn, .song-card, .slide-btn')) {
                mainCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, true);
    }

    createHeart(x, y) {
        if (!this.container) return;

        const heart = document.createElement('div');
        heart.className = 'coded-heart-trail';
        
        // Mobile-optimized size and opacity
        const size = this.isMobile ? Math.random() * 8 + 12 : Math.random() * 12 + 16;
        const opacity = Math.random() * 0.5 + 0.5;
        
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 9999;
            opacity: ${opacity};
            transform: translate(-50%, -50%);
            transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        heart.innerHTML = this.createHeartSVG(size, this.getRandomPinkColor());
        
        this.container.appendChild(heart);
        this.hearts.push(heart);

        // Remove excess hearts for performance
        if (this.hearts.length > this.maxHearts) {
            const oldHeart = this.hearts.shift();
            if (oldHeart && oldHeart.parentNode) {
                oldHeart.remove();
            }
        }

        // Longer fade out animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.style.opacity = '0';
                heart.style.transform = 'translate(-50%, -50%) scale(0.1) translateY(-50px) rotate(20deg)';
            }
        }, 200);

        // Remove heart after longer animation
        setTimeout(() => {
            if (heart && heart.parentNode) {
                heart.remove();
            }
            const index = this.hearts.indexOf(heart);
            if (index > -1) {
                this.hearts.splice(index, 1);
            }
        }, 1700);
    }

    createHeartSVG(size, color) {
        return `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" style="filter: drop-shadow(0 0 ${size/2}px ${color}80);">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                      fill="${color}" 
                      opacity="0.9">
                    <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite"/>
                </path>
            </svg>
        `;
    }

    getRandomPinkColor() {
        const pinkColors = [
            '#E91E63', '#F48FB1', '#FCE4EC', '#F8BBD9', 
            '#EC407A', '#FFB6C1', '#FFC0CB', '#F29CB8',
            '#FF69B4', '#FFB6C1', '#DDA0DD', '#F0E68C'
        ];
        return pinkColors[Math.floor(Math.random() * pinkColors.length)];
    }

    cleanup() {
        this.hearts.forEach(heart => {
            if (heart && heart.parentNode) {
                heart.remove();
            }
        });
        this.hearts = [];
    }
}

// Initialize heart trail when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.heartTrail = new HeartTrail();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.heartTrail) {
        window.heartTrail.cleanup();
    }
});
