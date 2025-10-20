// PERMANENT CODED HEART AND BUTTERFLY ANIMATIONS
// This file contains the coded animations that should NEVER be removed

class PermanentCodedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createCodedHeartAnimation();
        this.createCodedButterflyAnimation();
        this.addInteractivity();
    }

    // PERMANENT CODED HEART ANIMATION
    createCodedHeartAnimation() {
        const heartContainer = document.getElementById('coded-heart');
        if (!heartContainer) return;

        heartContainer.innerHTML = `
            <div class="pulsing-heart">
                <div class="heart-core">
                    <div class="heart-left-lobe"></div>
                    <div class="heart-right-lobe"></div>
                    <div class="heart-point"></div>
                </div>
                <div class="heart-glow"></div>
                <div class="heart-particles">
                    <div class="particle particle-1"></div>
                    <div class="particle particle-2"></div>
                    <div class="particle particle-3"></div>
                    <div class="particle particle-4"></div>
                    <div class="particle particle-5"></div>
                    <div class="particle particle-6"></div>
                </div>
                <div class="heart-rings">
                    <div class="ring ring-1"></div>
                    <div class="ring ring-2"></div>
                    <div class="ring ring-3"></div>
                </div>
            </div>
        `;
    }

    // PERMANENT CODED BUTTERFLY ANIMATION
    createCodedButterflyAnimation() {
        const butterflyContainer = document.getElementById('coded-butterfly');
        if (!butterflyContainer) return;

        butterflyContainer.innerHTML = `
            <div class="flying-butterfly-coded">
                <div class="butterfly-body">
                    <div class="body-segment segment-1"></div>
                    <div class="body-segment segment-2"></div>
                    <div class="body-segment segment-3"></div>
                </div>
                <div class="butterfly-wings">
                    <div class="wing wing-top-left">
                        <div class="wing-pattern pattern-1"></div>
                        <div class="wing-pattern pattern-2"></div>
                        <div class="wing-pattern pattern-3"></div>
                    </div>
                    <div class="wing wing-top-right">
                        <div class="wing-pattern pattern-1"></div>
                        <div class="wing-pattern pattern-2"></div>
                        <div class="wing-pattern pattern-3"></div>
                    </div>
                    <div class="wing wing-bottom-left">
                        <div class="wing-pattern pattern-4"></div>
                        <div class="wing-pattern pattern-5"></div>
                    </div>
                    <div class="wing wing-bottom-right">
                        <div class="wing-pattern pattern-4"></div>
                        <div class="wing-pattern pattern-5"></div>
                    </div>
                </div>
                <div class="butterfly-antennae">
                    <div class="antenna antenna-left">
                        <div class="antenna-tip"></div>
                    </div>
                    <div class="antenna antenna-right">
                        <div class="antenna-tip"></div>
                    </div>
                </div>
                <div class="butterfly-trail">
                    <div class="trail-particle trail-1"></div>
                    <div class="trail-particle trail-2"></div>
                    <div class="trail-particle trail-3"></div>
                    <div class="trail-particle trail-4"></div>
                </div>
                <div class="butterfly-shadow"></div>
            </div>
        `;
    }

    // Add interactivity to coded animations
    addInteractivity() {
        // Heart click interaction
        const heartElement = document.querySelector('.pulsing-heart');
        if (heartElement) {
            heartElement.addEventListener('click', () => {
                this.createHeartBurst(heartElement);
            });

            heartElement.addEventListener('mouseenter', () => {
                heartElement.style.transform = 'scale(1.1)';
            });

            heartElement.addEventListener('mouseleave', () => {
                heartElement.style.transform = 'scale(1)';
            });
        }

        // Butterfly click interaction
        const butterflyElement = document.querySelector('.flying-butterfly-coded');
        if (butterflyElement) {
            butterflyElement.addEventListener('click', () => {
                this.createButterflySparkles(butterflyElement);
            });

            butterflyElement.addEventListener('mouseenter', () => {
                butterflyElement.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(242, 156, 184, 0.6))';
            });

            butterflyElement.addEventListener('mouseleave', () => {
                butterflyElement.style.filter = 'none';
            });
        }
    }

    createHeartBurst(heartElement) {
        const heartRect = heartElement.getBoundingClientRect();
        const centerX = heartRect.left + heartRect.width / 2;
        const centerY = heartRect.top + heartRect.height / 2;

        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const burstHeart = document.createElement('div');
                burstHeart.innerHTML = '💖';
                burstHeart.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    font-size: 20px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: heartBurst 1.5s ease-out forwards;
                    transform: translate(-50%, -50%) rotate(${i * 30}deg);
                `;

                document.body.appendChild(burstHeart);

                setTimeout(() => {
                    burstHeart.remove();
                }, 1500);
            }, i * 80);
        }
    }

    createButterflySparkles(butterflyElement) {
        const butterflyRect = butterflyElement.getBoundingClientRect();
        const centerX = butterflyRect.left + butterflyRect.width / 2;
        const centerY = butterflyRect.top + butterflyRect.height / 2;

        const sparkleEmojis = ['✨', '🌟', '💫', '⭐'];

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${centerX + (Math.random() - 0.5) * 80}px;
                    top: ${centerY + (Math.random() - 0.5) * 80}px;
                    font-size: 16px;
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
}

// Add required CSS animations
const permanentAnimationStyles = document.createElement('style');
permanentAnimationStyles.textContent = `
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
document.head.appendChild(permanentAnimationStyles);

// Initialize PERMANENT coded animations
document.addEventListener('DOMContentLoaded', () => {
    window.permanentCodedAnimations = new PermanentCodedAnimations();
});

// Ensure animations persist
setInterval(() => {
    if (!document.querySelector('.pulsing-heart') || !document.querySelector('.flying-butterfly-coded')) {
        if (window.permanentCodedAnimations) {
            window.permanentCodedAnimations.init();
        }
    }
}, 5000);
