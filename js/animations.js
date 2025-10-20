class CodedAnimations {
    constructor() {
        this.heartElement = null;
        this.butterflyElement = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createCodedHeart();
                this.createCodedButterfly();
            });
        } else {
            this.createCodedHeart();
            this.createCodedButterfly();
        }
    }

    createCodedHeart() {
        const heartContainer = document.getElementById('coded-heart');
        if (!heartContainer) {
            console.warn('Heart container not found');
            return;
        }

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

        this.heartElement = heartContainer.querySelector('.pulsing-heart');
        this.addHeartInteractivity();
    }

    addHeartInteractivity() {
        if (!this.heartElement) return;

        // Add click interaction
        this.heartElement.addEventListener('click', () => {
            this.heartElement.style.animation = 'none';
            setTimeout(() => {
                this.heartElement.style.animation = 'heartPulse 1s ease-in-out';
            }, 10);

            // Create heart burst effect
            this.createHeartBurst();
        });

        // Add hover effect
        this.heartElement.addEventListener('mouseenter', () => {
            this.heartElement.style.transform = 'scale(1.1)';
        });

        this.heartElement.addEventListener('mouseleave', () => {
            this.heartElement.style.transform = 'scale(1)';
        });
    }

    createHeartBurst() {
        const heartRect = this.heartElement.getBoundingClientRect();
        const centerX = heartRect.left + heartRect.width / 2;
        const centerY = heartRect.top + heartRect.height / 2;

        for (let i = 0; i < 8; i++) {
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
                    transform: translate(-50%, -50%) rotate(${i * 45}deg);
                `;

                document.body.appendChild(burstHeart);

                setTimeout(() => {
                    burstHeart.remove();
                }, 1500);
            }, i * 100);
        }
    }

    createCodedButterfly() {
        const butterflyContainer = document.getElementById('coded-butterfly');
        if (!butterflyContainer) {
            console.warn('Butterfly container not found');
            return;
        }

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

        this.butterflyElement = butterflyContainer.querySelector('.flying-butterfly-coded');
        this.addButterflyInteractivity();
    }

    addButterflyInteractivity() {
        if (!this.butterflyElement) return;

        // Add click interaction
        this.butterflyElement.addEventListener('click', () => {
            // Speed up flight animation temporarily
            this.butterflyElement.style.animationDuration = '2s';
            
            setTimeout(() => {
                this.butterflyElement.style.animationDuration = '8s';
            }, 4000);

            // Create butterfly sparkles
            this.createButterflySparkles();
        });

        // Add hover effect
        this.butterflyElement.addEventListener('mouseenter', () => {
            this.butterflyElement.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(242, 156, 184, 0.6))';
        });

        this.butterflyElement.addEventListener('mouseleave', () => {
            this.butterflyElement.style.filter = 'none';
        });
    }

    createButterflySparkles() {
        const butterflyRect = this.butterflyElement.getBoundingClientRect();
        const centerX = butterflyRect.left + butterflyRect.width / 2;
        const centerY = butterflyRect.top + butterflyRect.height / 2;

        const sparkleEmojis = ['✨', '🌟', '💫', '⭐'];

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${centerX + (Math.random() - 0.5) * 60}px;
                    top: ${centerY + (Math.random() - 0.5) * 60}px;
                    font-size: 16px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: sparkleFloat 2s ease-out forwards;
                `;

                document.body.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 200);
        }
    }

    // Add dynamic CSS for heart burst animation
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

            /* Enhanced heart ring animations */
            .heart-rings {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
            }

            .ring {
                position: absolute;
                border: 2px solid rgba(242, 156, 184, 0.3);
                border-radius: 50%;
                animation: ringExpand 3s ease-out infinite;
            }

            .ring-1 {
                width: 60px;
                height: 60px;
                margin: -30px 0 0 -30px;
                animation-delay: 0s;
            }

            .ring-2 {
                width: 80px;
                height: 80px;
                margin: -40px 0 0 -40px;
                animation-delay: 1s;
            }

            .ring-3 {
                width: 100px;
                height: 100px;
                margin: -50px 0 0 -50px;
                animation-delay: 2s;
            }

            @keyframes ringExpand {
                0% {
                    opacity: 0;
                    transform: scale(0.5);
                }
                50% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(1.5);
                }
            }

            /* Enhanced butterfly body segments */
            .butterfly-body {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
            }

            .body-segment {
                width: 4px;
                height: 12px;
                background: linear-gradient(to bottom, #8B4513, #654321, #4A2C17);
                border-radius: 2px;
                margin-bottom: 2px;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
            }

            .segment-1 { width: 3px; height: 8px; }
            .segment-2 { width: 4px; height: 14px; }
            .segment-3 { width: 3px; height: 10px; }

            /* Enhanced antenna tips */
            .antenna-tip {
                position: absolute;
                top: -2px;
                left: -1px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, var(--medium-pink), var(--deep-pink));
                border-radius: 50%;
                box-shadow: 0 0 4px rgba(242, 156, 184, 0.6);
            }

            /* Butterfly shadow */
            .butterfly-shadow {
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 8px;
                background: radial-gradient(ellipse, rgba(0,0,0,0.2), transparent);
                border-radius: 50%;
                animation: shadowMove 8s ease-in-out infinite;
            }

            @keyframes shadowMove {
                0%, 100% { transform: translateX(-50%) scale(1); }
                25% { transform: translateX(-60%) scale(0.8); }
                50% { transform: translateX(-40%) scale(1.2); }
                75% { transform: translateX(-60%) scale(0.9); }
            }
        `;
        document.head.appendChild(style);
    }

    // Cleanup method
    cleanup() {
        if (this.heartElement) {
            this.heartElement.removeEventListener('click', this.createHeartBurst);
        }
        if (this.butterflyElement) {
            this.butterflyElement.removeEventListener('click', this.createButterflySparkles);
        }
    }
}

// Initialize coded animations
document.addEventListener('DOMContentLoaded', () => {
    window.codedAnimations = new CodedAnimations();
    window.codedAnimations.addDynamicStyles();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.codedAnimations) {
        window.codedAnimations.cleanup();
    }
});
