class CodedAnimations {
    constructor() {
        this.heartElement = null;
        this.butterflyElement = null;
        this.isMobile = this.detectMobile();
        this.init();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0);
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupCodedAnimations();
            });
        } else {
            this.setupCodedAnimations();
        }
    }

    setupCodedAnimations() {
        // Wait for permanent coded animations to load
        setTimeout(() => {
            this.addHeartInteractivity();
            this.addButterflyInteractivity();
            this.addDynamicStyles();
        }, 1000);
    }

    addHeartInteractivity() {
        const heartElement = document.querySelector('.pulsing-heart');
        if (!heartElement) return;

        // Add click interaction
        heartElement.addEventListener('click', () => {
            heartElement.style.animation = 'none';
            setTimeout(() => {
                heartElement.style.animation = 'heartPulse 1s ease-in-out';
            }, 10);

            this.createHeartBurst(heartElement);
        });

        // Touch support for mobile
        if (this.isMobile) {
            heartElement.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.createHeartBurst(heartElement);
            });
        }

        // Add hover effect (desktop only)
        if (!this.isMobile) {
            heartElement.addEventListener('mouseenter', () => {
                heartElement.style.transform = 'scale(1.1)';
            });

            heartElement.addEventListener('mouseleave', () => {
                heartElement.style.transform = 'scale(1)';
            });
        }
    }

    createHeartBurst(heartElement) {
        const heartRect = heartElement.getBoundingClientRect();
        const centerX = heartRect.left + heartRect.width / 2;
        const centerY = heartRect.top + heartRect.height / 2;

        const burstCount = this.isMobile ? 8 : 12; // Fewer particles on mobile

        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                const burstHeart = document.createElement('div');
                burstHeart.innerHTML = '💖';
                burstHeart.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    font-size: ${this.isMobile ? '16px' : '20px'};
                    pointer-events: none;
                    z-index: 1000;
                    animation: heartBurst 1.5s ease-out forwards;
                    transform: translate(-50%, -50%) rotate(${i * (360 / burstCount)}deg);
                `;

                document.body.appendChild(burstHeart);

                setTimeout(() => {
                    burstHeart.remove();
                }, 1500);
            }, i * 80);
        }
    }

    addButterflyInteractivity() {
        const butterflyElement = document.querySelector('.flying-butterfly-coded');
        if (!butterflyElement) return;

        // Add click interaction
        butterflyElement.addEventListener('click', () => {
            butterflyElement.style.animationDuration = '2s';
            
            setTimeout(() => {
                butterflyElement.style.animationDuration = '8s';
            }, 4000);

            this.createButterflySparkles(butterflyElement);
        });

        // Touch support for mobile
        if (this.isMobile) {
            butterflyElement.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.createButterflySparkles(butterflyElement);
            });
        }

        // Add hover effect (desktop only)
        if (!this.isMobile) {
            butterflyElement.addEventListener('mouseenter', () => {
                butterflyElement.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(242, 156, 184, 0.6))';
            });

            butterflyElement.addEventListener('mouseleave', () => {
                butterflyElement.style.filter = 'none';
            });
        }
    }

    createButterflySparkles(butterflyElement) {
        const butterflyRect = butterflyElement.getBoundingClientRect();
        const centerX = butterflyRect.left + butterflyRect.width / 2;
        const centerY = butterflyRect.top + butterflyRect.height / 2;

        const sparkleEmojis = ['✨', '🌟', '💫', '⭐'];
        const sparkleCount = this.isMobile ? 6 : 10; // Fewer sparkles on mobile

        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${centerX + (Math.random() - 0.5) * 80}px;
                    top: ${centerY + (Math.random() - 0.5) * 80}px;
                    font-size: ${this.isMobile ? '14px' : '16px'};
                    pointer-events: none;
                    z-index: 1000;
                    animation: sparkleFloat 2s ease-out forwards;
                `;

                document.body.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 150);
        }
    }

    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes heartBurst {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                50% {
                    opacity: 0.8;
                    transform: translate(-50%, -50%) scale(1.2) translateY(-20px);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.3) translateY(-40px);
                }
            }

            @keyframes sparkleFloat {
                0% {
                    opacity: 1;
                    transform: scale(0.5) translateY(0);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.2) translateY(-15px);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.3) translateY(-30px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    cleanup() {
        const heartElement = document.querySelector('.pulsing-heart');
        const butterflyElement = document.querySelector('.flying-butterfly-coded');
        
        if (heartElement) {
            heartElement.removeEventListener('click', this.createHeartBurst);
            heartElement.removeEventListener('touchstart', this.createHeartBurst);
        }
        if (butterflyElement) {
            butterflyElement.removeEventListener('click', this.createButterflySparkles);
            butterflyElement.removeEventListener('touchstart', this.createButterflySparkles);
        }
    }
}

// Initialize coded animations
document.addEventListener('DOMContentLoaded', () => {
    window.codedAnimations = new CodedAnimations();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.codedAnimations) {
        window.codedAnimations.cleanup();
    }
});
