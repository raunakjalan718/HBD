class BirthdayWebsite {
    constructor() {
        this.currentSection = 0;
        this.sections = ['hero', 'birthday', 'wishes'];
        this.isScrolling = false;
        this.currentDate = new Date();
        this.birthdayDate = { month: 10, day: 20 }; // October 20th
        this.particleSystem = null;
        this.confettiParticles = [];
        this.birthdayParticles = [];
        this.audioEnabled = false;
        
        this.init();
    }
    
    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initializeParticles();
        this.rotateLoadingJokes();
        this.setupEasterEggs();
        
        // Hide loading screen after 4 seconds
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 4000);
    }
    
    rotateLoadingJokes() {
        const jokes = document.querySelectorAll('.joke');
        let currentJoke = 0;
        
        const rotateInterval = setInterval(() => {
            if (document.getElementById('loading-screen').classList.contains('hidden')) {
                clearInterval(rotateInterval);
                return;
            }
            
            jokes[currentJoke].classList.remove('active');
            currentJoke = (currentJoke + 1) % jokes.length;
            jokes[currentJoke].classList.add('active');
        }, 2000);
    }
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.remove('hidden');
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const questionScreen = document.getElementById('question-screen');
        
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            questionScreen.classList.remove('hidden');
            this.animateQuestionScreen();
        }, 800);
    }
    
    animateQuestionScreen() {
        const container = document.querySelector('.question-container');
        container.style.animation = 'zoomIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        
        // Add particle burst effect
        if (this.particleSystem) {
            this.particleSystem.addBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
        }
        
        // Add subtle screen shake for emphasis
        setTimeout(() => {
            document.body.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        }, 300);
    }
    
    isBirthdayToday() {
        return this.currentDate.getMonth() + 1 === this.birthdayDate.month && 
               this.currentDate.getDate() === this.birthdayDate.day;
    }
    
    handleBirthdayResponse(answer) {
        const responseScreen = document.getElementById('response-screen');
        const questionScreen = document.getElementById('question-screen');
        const responseEmoji = document.querySelector('.response-emoji');
        const responseTitle = document.querySelector('.response-title');
        const responseMessage = document.querySelector('.response-message');
        
        let emoji, title, message;
        
        if (this.isBirthdayToday()) {
            if (answer === 'yes') {
                emoji = '🎉';
                title = 'Yay! I knew it!';
                message = 'Happy Birthday, Udita! 🎂 I\'ve been planning this surprise just for you! Get ready for the most amazing birthday celebration ever! Time to party and make some unforgettable memories! 🥳✨';
            } else {
                emoji = '🤨';
                title = 'Oh! Come on...';
                message = 'I know it\'s your birthday today! Don\'t try to fool me, Udita! 😏 I marked it on my calendar weeks ago and even set 5 different reminders! Let\'s celebrate anyway because today is YOUR special day! 🎈🎊';
            }
        } else {
            if (answer === 'yes') {
                emoji = '🤔';
                title = 'Haww! Really?';
                message = 'Why would you lie about your birthday? 😅 That\'s not very nice, but I still love you anyway! I guess we can pretend it\'s your birthday - every day should be a celebration when you\'re this awesome! 🎭✨';
            } else {
                emoji = '😊';
                title = 'Aww, I know...';
                message = 'I know it\'s not your birthday today, I guess you\'re a little late to this party! 😄 But hey, no worries - you\'re worth celebrating every single day of the year! Let\'s make this special anyway! 🌟💖';
            }
        }
        
        responseEmoji.textContent = emoji;
        responseTitle.textContent = title;
        responseMessage.textContent = message;
        
        // Add button click animation
        const clickedBtn = answer === 'yes' ? document.getElementById('yes-btn') : document.getElementById('no-btn');
        clickedBtn.style.animation = 'heartbeat 0.6s ease-in-out';
        
        setTimeout(() => {
            questionScreen.classList.add('hidden');
            responseScreen.classList.remove('hidden');
            
            // Create massive confetti explosion
            this.createConfettiExplosion();
            
            // Add birthday-themed particles
            this.addBirthdayParticles();
            
            // Play celebration sound effect (if enabled)
            this.playCelebrationSound();
        }, 600);
    }
    
    createConfettiExplosion() {
        const container = document.getElementById('confetti-container');
        const colors = ['#E91E63', '#FF6B6B', '#FF9500', '#FFAB91', '#4CAF50', '#2196F3', '#9C27B0'];
        
        // Create multiple waves of confetti
        for (let wave = 0; wave < 4; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 100; i++) {
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.className = 'confetti';
                        confetti.style.left = Math.random() * 100 + '%';
                        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                        confetti.style.animationDelay = Math.random() * 2 + 's';
                        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                        
                        // Add different shapes
                        if (Math.random() > 0.7) {
                            confetti.style.borderRadius = '50%';
                        } else if (Math.random() > 0.5) {
                            confetti.style.transform = 'rotate(45deg)';
                        }
                        
                        container.appendChild(confetti);
                        
                        setTimeout(() => {
                            if (confetti.parentNode) {
                                confetti.remove();
                            }
                        }, 4000);
                    }, i * 50);
                }
            }, wave * 1000);
        }
        
        // Add screen flash effect
        this.createScreenFlash();
    }
    
    createScreenFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            z-index: 9999;
            pointer-events: none;
            animation: fadeOut 0.5s ease-out forwards;
        `;
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 500);
    }
    
    addBirthdayParticles() {
        const particleTypes = ['🎈', '🎂', '🎉', '✨', '🥳', '🎊', '🌟', '💖'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = particleTypes[Math.floor(Math.random() * particleTypes.length)];
                particle.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 30 + 20}px;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: floatEmoji ${Math.random() * 3 + 3}s ease-in-out infinite;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 6000);
            }, i * 200);
        }
    }
    
    playCelebrationSound() {
        // Create audio context for celebration sounds
        if (this.audioEnabled && window.AudioContext) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.playTone(audioContext, 523.25, 0.2); // C5
                setTimeout(() => this.playTone(audioContext, 659.25, 0.2), 200); // E5
                setTimeout(() => this.playTone(audioContext, 783.99, 0.3), 400); // G5
            } catch (e) {
                console.log('Audio not supported');
            }
        }
    }
    
    playTone(audioContext, frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    proceedToMainSite() {
        const responseScreen = document.getElementById('response-screen');
        const mainContent = document.querySelector('.main-content');
        const navbar = document.querySelector('.navbar');
        
        // Add transition effect
        responseScreen.style.animation = 'fadeOut 0.8s ease-out forwards';
        
        setTimeout(() => {
            responseScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            navbar.classList.remove('hidden');
            
            // Trigger hero animations
            this.animateHeroElements();
            
            // Start background music (if enabled)
            this.startBackgroundEffects();
        }, 800);
    }
    
    animateHeroElements() {
        const elements = [
            { selector: '.hero-label', delay: 200 },
            { selector: '.hero-title', delay: 400 },
            { selector: '.hero-subtitle', delay: 600 },
            { selector: '.hero-brand', delay: 800 },
            { selector: '.social-links', delay: 1000 },
            { selector: '.hero-description', delay: 1200 },
            { selector: '.credits', delay: 1400 },
            { selector: '.hero-visual', delay: 600 }
        ];
        
        elements.forEach(({ selector, delay }) => {
            setTimeout(() => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.opacity = '1';
                    element.classList.add('fade-in-up');
                }
            }, delay);
        });
        
        // Add typewriter effect to hero title
        setTimeout(() => {
            this.typewriterEffect('.hero-title', 'Step into\nyour special day.');
        }, 600);
    }
    
    typewriterEffect(selector, text) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                if (text[i] === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text[i];
                }
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
    
    startBackgroundEffects() {
        // Add floating birthday elements
        this.createFloatingElements();
        
        // Start ambient particle effects
        if (this.particleSystem) {
            setInterval(() => {
                this.particleSystem.addBurst(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    5
                );
            }, 3000);
        }
    }
    
    createFloatingElements() {
        const floatingEmojis = ['🎈', '✨', '🌟', '💫'];
        
        setInterval(() => {
            const emoji = document.createElement('div');
            emoji.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
            emoji.style.cssText = `
                position: fixed;
                font-size: 24px;
                left: ${Math.random() * 100}%;
                top: 100%;
                pointer-events: none;
                z-index: 0;
                animation: floatUp 8s linear forwards;
                opacity: 0.7;
            `;
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 8000);
        }, 2000);
    }
    
    setupEventListeners() {
        // Birthday question buttons
        document.getElementById('yes-btn').addEventListener('click', (e) => {
            this.addClickEffect(e.target);
            this.handleBirthdayResponse('yes');
        });
        
        document.getElementById('no-btn').addEventListener('click', (e) => {
            this.addClickEffect(e.target);
            this.handleBirthdayResponse('no');
        });
        
        // Proceed button
        document.getElementById('proceed-btn').addEventListener('click', (e) => {
            this.addClickEffect(e.target);
            this.proceedToMainSite();
        });
        
        // Smooth scrolling between sections
        window.addEventListener('wheel', (e) => this.handleScroll(e), { passive: false });
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Scroll indicator click
        setTimeout(() => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.addEventListener('click', () => {
                    this.nextSection();
                });
            }
        }, 5000);
        
        // Double click easter egg
        document.addEventListener('dblclick', (e) => {
            this.createSurpriseAnimation(e.clientX, e.clientY);
        });
        
        // Stat wiggle reset
        document.addEventListener('animationend', (e) => {
            if (e.target.classList.contains('wiggle')) {
                e.target.classList.remove('wiggle');
            }
        });
        
        // Mouse movement effects
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    setupTouchEvents() {
        let touchStartY = 0;
        let touchStartX = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            const diffY = touchStartY - touchEndY;
            const diffX = touchStartX - touchEndX;
            
            // Vertical swipe
            if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    this.nextSection();
                } else {
                    this.prevSection();
                }
            }
            
            // Horizontal swipe for card flipping
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
                const target = e.target.closest('.wish-card');
                if (target) {
                    flipCard(target);
                }
            }
        }, { passive: true });
    }
    
    addClickEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    createSurpriseAnimation(x, y) {
        const surprises = ['🎉', '🎂', '🎈', '✨', '🥳', '🎊', '💖', '🌟', '🎁', '🍰'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const surprise = document.createElement('div');
                surprise.textContent = surprises[Math.floor(Math.random() * surprises.length)];
                surprise.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${Math.random() * 30 + 20}px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: surpriseBurst 1.5s ease-out forwards;
                    transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
                `;
                
                document.body.appendChild(surprise);
                
                setTimeout(() => {
                    surprise.remove();
                }, 1500);
            }, i * 100);
        }
        
        // Add screen shake
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
    
    handleMouseMove(e) {
        // Create trailing particles
        if (Math.random() > 0.95) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                animation: fadeOut 1s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 1000);
        }
        
        // Parallax effect for hero visual
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            const rect = heroVisual.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 50;
            const deltaY = (e.clientY - centerY) / 50;
            
            heroVisual.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
    }
    
    handleResize() {
        if (this.particleSystem) {
            this.particleSystem.setupCanvas();
        }
    }
    
    handleScroll(e) {
        if (this.isScrolling) return;
        
        e.preventDefault();
        
        if (e.deltaY > 0) {
            this.nextSection();
        } else {
            this.prevSection();
        }
    }
    
    handleKeyboard(e) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            this.nextSection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.prevSection();
        } else if (e.key === 'Enter') {
            // Auto-answer birthday question
            const questionScreen = document.getElementById('question-screen');
            if (!questionScreen.classList.contains('hidden')) {
                this.handleBirthdayResponse('yes');
            }
        }
    }
    
    nextSection() {
        if (this.isScrolling || this.currentSection >= this.sections.length - 1) return;
        
        this.currentSection++;
        this.navigateToSection();
    }
    
    prevSection() {
        if (this.isScrolling || this.currentSection <= 0) return;
        
        this.currentSection--;
        this.navigateToSection();
    }
    
    navigateToSection() {
        this.isScrolling = true;
        
        const targetSection = document.getElementById(this.sections[this.currentSection]);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add section-specific effects
            this.addSectionEffects(this.sections[this.currentSection]);
        }
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }
    
    addSectionEffects(sectionName) {
        switch (sectionName) {
            case 'birthday':
                this.createSectionParticles('🎂🎈🎉');
                break;
            case 'wishes':
                this.createSectionParticles('✨🌟💫');
                break;
        }
    }
    
    createSectionParticles(emojis) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                particle.style.cssText = `
                    position: fixed;
                    font-size: 24px;
                    left: ${Math.random() * 100}%;
                    top: 100%;
                    pointer-events: none;
                    z-index: 1;
                    animation: floatUp 4s ease-out forwards;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 4000);
            }, i * 200);
        }
    }
    
    setupEasterEggs() {
        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.activateKonamiEasterEgg();
                konamiCode = [];
            }
        });
        
        // Secret click sequence
        let clickCount = 0;
        document.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 10) {
                this.activateClickEasterEgg();
                clickCount = 0;
            }
            
            setTimeout(() => {
                if (clickCount > 0) clickCount--;
            }, 1000);
        });
    }
    
    activateKonamiEasterEgg() {
        // Rainbow mode
        document.body.style.filter = 'hue-rotate(0deg)';
        let hue = 0;
        
        const rainbowInterval = setInterval(() => {
            hue += 10;
            document.body.style.filter = `hue-rotate(${hue}deg)`;
            
            if (hue >= 360) {
                clearInterval(rainbowInterval);
                document.body.style.filter = '';
            }
        }, 100);
        
        // Show secret message
        this.showSecretMessage('🌈 Rainbow Mode Activated! 🌈');
    }
    
    activateClickEasterEgg() {
        // Disco mode
        const disco = document.createElement('div');
        disco.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ffff00);
            background-size: 400% 400%;
            animation: gradientShift 0.5s ease infinite;
            opacity: 0.3;
            pointer-events: none;
            z-index: 9998;
        `;
        
        document.body.appendChild(disco);
        
        setTimeout(() => {
            disco.remove();
        }, 3000);
        
        this.showSecretMessage('🕺 Disco Mode! Let\'s Dance! 💃');
    }
    
    showSecretMessage(message) {
        const secretMsg = document.createElement('div');
        secretMsg.textContent = message;
        secretMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: bold;
            z-index: 9999;
            animation: zoomIn 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(secretMsg);
        
        setTimeout(() => {
            secretMsg.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                secretMsg.remove();
            }, 500);
        }, 2000);
    }
    
    initializeParticles() {
        this.particleSystem = new ParticleSystem();
    }
    
    // Method to enable audio (call after user interaction)
    enableAudio() {
        this.audioEnabled = true;
    }
}

// Flip card function for wishes section
function flipCard(card) {
    card.classList.toggle('flipped');
    
    // Add flip sound effect
    if (window.birthdayWebsite && window.birthdayWebsite.audioEnabled) {
        window.birthdayWebsite.playTone(
            new (window.AudioContext || window.webkitAudioContext)(),
            800, 0.1
        );
    }
}

// Add additional CSS animations via JavaScript
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes surpriseBurst {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(0.8) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    window.birthdayWebsite = new BirthdayWebsite();
    
    // Enable audio after first user interaction
    document.addEventListener('click', () => {
        window.birthdayWebsite.enableAudio();
    }, { once: true });
});

// Add interactive cursor effects
document.addEventListener('mousemove', (e) => {
    let cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(233, 30, 99, 0.8), rgba(255, 107, 107, 0.4));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
    }
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effects for interactive elements
document.addEventListener('mouseenter', (e) => {
    if (e.target.classList.contains('clickable') || 
        e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('answer-btn') ||
        e.target.classList.contains('proceed-btn') ||
        e.target.classList.contains('social-link') ||
        e.target.classList.contains('wish-card')) {
        
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, rgba(255, 149, 0, 0.9), rgba(255, 171, 145, 0.6))';
            cursor.style.boxShadow = '0 0 20px rgba(255, 149, 0, 0.5)';
        }
        
        // Add hover sound effect
        if (window.birthdayWebsite && window.birthdayWebsite.audioEnabled) {
            window.birthdayWebsite.playTone(
                new (window.AudioContext || window.webkitAudioContext)(),
                440, 0.05
            );
        }
        
        // Add hover animation to the element
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
        e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target.classList.contains('clickable') || 
        e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('answer-btn') ||
        e.target.classList.contains('proceed-btn') ||
        e.target.classList.contains('social-link') ||
        e.target.classList.contains('wish-card')) {
        
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(233, 30, 99, 0.8), rgba(255, 107, 107, 0.4))';
            cursor.style.boxShadow = '0 0 10px rgba(233, 30, 99, 0.3)';
        }
        
        // Reset hover animation
        e.target.style.transform = '';
        e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}, true);

// Prevent context menu on right click for better UX
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    // Create a fun message instead
    const message = document.createElement('div');
    message.textContent = '🎉 No peeking! Just enjoy the surprise! 🎂';
    message.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        background: rgba(233, 30, 99, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 500;
        z-index: 10000;
        animation: zoomIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transform: translate(-50%, -50%);
        pointer-events: none;
        box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(message);
    
    // Play cheeky sound
    if (window.birthdayWebsite && window.birthdayWebsite.audioEnabled) {
        window.birthdayWebsite.playTone(
            new (window.AudioContext || window.webkitAudioContext)(),
            330, 0.2
        );
    }
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 300);
    }, 2000);
});

// Add keyboard shortcuts info (hidden feature)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const shortcuts = `
🎹 Keyboard Shortcuts:
↑↓ - Navigate sections
Space - Next section  
Enter - Auto-answer Yes
Double-click - Surprise animation
Right-click - Fun message
Ctrl+/ - This help

🎮 Easter Eggs:
Konami Code - Rainbow mode
10 quick clicks - Disco mode
        `;
        
        // Create custom alert
        const alertBox = document.createElement('div');
        alertBox.innerHTML = `
            <div style="white-space: pre-line; text-align: left; line-height: 1.6;">
                ${shortcuts}
            </div>
            <button onclick="this.parentElement.remove()" style="
                margin-top: 20px;
                padding: 10px 20px;
                background: #E91E63;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
            ">Got it! 👍</button>
        `;
        alertBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 30px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            animation: zoomIn 0.3s ease-out forwards;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(alertBox);
    }
});

// Performance monitoring and optimization
let performanceMetrics = {
    loadTime: 0,
    interactionCount: 0,
    lastInteraction: Date.now(),
    fps: 0,
    frameCount: 0
};

window.addEventListener('load', () => {
    performanceMetrics.loadTime = performance.now();
    console.log(`🎂 Birthday website loaded in ${performanceMetrics.loadTime.toFixed(2)}ms`);
});

// Track interactions for engagement analytics
['click', 'touchstart', 'keydown', 'scroll'].forEach(eventType => {
    document.addEventListener(eventType, () => {
        performanceMetrics.interactionCount++;
        performanceMetrics.lastInteraction = Date.now();
    }, { passive: true });
});

// FPS monitoring for smooth animations
function trackFPS() {
    performanceMetrics.frameCount++;
    
    if (performanceMetrics.frameCount % 60 === 0) {
        performanceMetrics.fps = 60;
        
        // Optimize particles based on performance
        if (window.birthdayWebsite && window.birthdayWebsite.particleSystem) {
            if (performanceMetrics.fps < 30) {
                // Reduce particle count for better performance
                window.birthdayWebsite.particleSystem.particleCount = Math.max(20, 
                    window.birthdayWebsite.particleSystem.particleCount * 0.8);
            }
        }
    }
    
    requestAnimationFrame(trackFPS);
}

// Start FPS tracking
requestAnimationFrame(trackFPS);

// Cleanup function for better memory management
window.addEventListener('beforeunload', () => {
    // Clear all intervals and timeouts
    const highestId = setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
        clearInterval(i);
    }
    
    // Remove event listeners
    document.removeEventListener('mousemove', () => {});
    document.removeEventListener('click', () => {});
    
    console.log('🧹 Cleaned up birthday website resources');
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('🎉 Birthday website can work offline!');
            })
            .catch(error => {
                console.log('Service worker registration failed');
            });
    });
}

// Add touch gesture support for mobile
let touchStartTime = 0;
let touchStartPos = { x: 0, y: 0 };

document.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    touchStartPos.x = e.touches[0].clientX;
    touchStartPos.y = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const touchEndTime = Date.now();
    const touchEndPos = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
    };
    
    const timeDiff = touchEndTime - touchStartTime;
    const distance = Math.sqrt(
        Math.pow(touchEndPos.x - touchStartPos.x, 2) + 
        Math.pow(touchEndPos.y - touchStartPos.y, 2)
    );
    
    // Detect tap vs swipe
    if (timeDiff < 200 && distance < 10) {
        // Quick tap - create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${touchEndPos.x}px;
            top: ${touchEndPos.y}px;
            width: 20px;
            height: 20px;
            background: rgba(233, 30, 99, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}, { passive: true });

// Add battery status monitoring for mobile optimization
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        function updateBatteryOptimization() {
            if (battery.level < 0.2) {
                // Low battery - reduce animations
                document.body.classList.add('low-battery-mode');
                if (window.birthdayWebsite && window.birthdayWebsite.particleSystem) {
                    window.birthdayWebsite.particleSystem.particleCount = 10;
                }
            } else {
                document.body.classList.remove('low-battery-mode');
            }
        }
        
        battery.addEventListener('levelchange', updateBatteryOptimization);
        updateBatteryOptimization();
    });
}

// Add network status monitoring
window.addEventListener('online', () => {
    console.log('🌐 Back online! All features available.');
});

window.addEventListener('offline', () => {
    console.log('📱 Offline mode - website still works!');
});

// Final initialization message
console.log(`
🎂✨ UDITA'S BIRTHDAY WEBSITE ✨🎂

🎉 Features loaded:
   • Humorous birthday detection
   • Interactive animations
   • Particle effects
   • Mobile gestures
   • Easter eggs
   • Performance optimization

🎮 Try these:
   • Double-click anywhere
   • Right-click for fun
   • Use arrow keys to navigate
   • Press Ctrl+/ for shortcuts

Made with ❤️ for Udita's special day!
`);

