class BirthdayWebsite {
    constructor() {
        this.currentDate = new Date();
        this.birthdayDate = { month: 10, day: 20 }; // October 20th
        this.jokes = [
            "🎂 Baking the most amazing virtual cake...",
            "🎈 Inflating rainbow balloons...",
            "🎉 Adding extra sparkly confetti...",
            "✨ Sprinkling birthday magic dust...",
            "🦄 Summoning birthday unicorns..."
        ];
        this.confettiInterval = null;
        this.bgm = null;
        this.songAudio = null;
        this.isPlaying = false;
        this.init();
    }
    
    init() {
        this.setupAudio();
        this.rotateJokes();
        this.createEnhancedConfetti(); // More confetti on load
        
        // Smooth transition to question screen after 5 seconds
        setTimeout(() => {
            this.showQuestionScreen();
        }, 5000);
    }

    setupAudio() {
        this.bgm = document.getElementById('bgm');
        this.songAudio = document.getElementById('song-audio');
        
        // Setup BGM
        if (this.bgm) {
            this.bgm.volume = 0.3; // Set volume to 30%
            
            // Auto-play BGM after user interaction
            document.addEventListener('click', () => {
                if (this.bgm.paused) {
                    this.bgm.play().catch(e => console.log('BGM autoplay prevented'));
                }
            }, { once: true });
        }

        // Setup song audio
        if (this.songAudio) {
            this.songAudio.volume = 0.7;
            this.songAudio.addEventListener('loadedmetadata', this.updateSongDuration.bind(this));
            this.songAudio.addEventListener('timeupdate', this.updateProgress.bind(this));
            this.songAudio.addEventListener('ended', this.onSongEnd.bind(this));
        }
    }

    updateSongDuration() {
        const totalTime = document.getElementById('total-time');
        if (totalTime && this.songAudio) {
            totalTime.textContent = this.formatTime(this.songAudio.duration);
        }
    }

    updateProgress() {
        if (!this.songAudio) return;
        
        const progressFill = document.getElementById('progress-fill');
        const currentTime = document.getElementById('current-time');
        
        if (progressFill) {
            const progress = (this.songAudio.currentTime / this.songAudio.duration) * 100;
            progressFill.style.width = progress + '%';
        }
        
        if (currentTime) {
            currentTime.textContent = this.formatTime(this.songAudio.currentTime);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    onSongEnd() {
        this.isPlaying = false;
        const playPauseIcon = document.getElementById('play-pause-icon');
        if (playPauseIcon) {
            playPauseIcon.textContent = '▶';
        }
        
        // Stop music visualizer
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }
    
    rotateJokes() {
        const jokes = document.querySelectorAll('.joke');
        let currentJoke = 0;
        
        setInterval(() => {
            jokes[currentJoke].classList.remove('active');
            currentJoke = (currentJoke + 1) % jokes.length;
            jokes[currentJoke].classList.add('active');
        }, 2000);
    }

    createEnhancedConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#F29CB8', '#F48FB1', '#FCE4EC', '#F8BBD9', '#EC407A', '#FFB6C1', '#FFC0CB'];
        
        // Create 3 waves of enhanced confetti
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 120; i++) { // Increased from 80
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.className = 'confetti';
                        confetti.style.left = Math.random() * 100 + '%';
                        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                        confetti.style.animationDelay = Math.random() * 2 + 's';
                        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
                        
                        // More variety in shapes
                        const shapeType = Math.random();
                        if (shapeType > 0.8) {
                            confetti.style.borderRadius = '50%';
                        } else if (shapeType > 0.6) {
                            confetti.style.transform = 'rotate(45deg)';
                        } else if (shapeType > 0.4) {
                            confetti.style.width = '20px';
                            confetti.style.height = '8px';
                        } else if (shapeType > 0.2) {
                            confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                        }
                        
                        container.appendChild(confetti);
                        
                        setTimeout(() => {
                            if (confetti.parentNode) {
                                confetti.remove();
                            }
                        }, 5000);
                    }, i * 25); // Faster spawn rate
                }
            }, wave * 800);
        }
    }
    
    showQuestionScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const questionScreen = document.getElementById('question-screen');
        
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            questionScreen.style.display = 'flex';
            
            setTimeout(() => {
                questionScreen.classList.add('show');
                this.createRandomEmojis();
            }, 100);
        }, 800);
    }
    
    isBirthdayToday() {
        return this.currentDate.getMonth() + 1 === this.birthdayDate.month && 
               this.currentDate.getDate() === this.birthdayDate.day;
    }

    createRandomEmojis() {
        const birthdayEmojis = [
            '🎂', '🎈', '🎉', '🎊', '🥳', '🎁', '🌟', '✨', '💖', '💕', 
            '🦄', '🌸', '🌺', '🌷', '🌹', '💐', '🎀', '👑', '💎', '🦋',
            '🍰', '🧁', '🍭', '🍬', '🎪', '🎨', '🎭', '🎵', '🎶', '💫',
            '🌈', '☀️', '🌙', '⭐', '🎆', '🎇', '💃', '🕺', '👯‍♀️', '🥂'
        ];
        
        setInterval(() => {
            const emojiCount = Math.floor(Math.random() * 3) + 3;
            
            for (let i = 0; i < emojiCount; i++) {
                setTimeout(() => {
                    const emoji = document.createElement('div');
                    emoji.className = 'random-emoji';
                    emoji.textContent = birthdayEmojis[Math.floor(Math.random() * birthdayEmojis.length)];
                    
                    emoji.style.left = Math.random() * 100 + '%';
                    emoji.style.top = Math.random() * 100 + '%';
                    
                    document.getElementById('question-screen').appendChild(emoji);
                    
                    setTimeout(() => {
                        emoji.classList.add('show');
                    }, 50);
                    
                    setTimeout(() => {
                        emoji.classList.add('hide');
                        setTimeout(() => {
                            emoji.remove();
                        }, 800);
                    }, 1500);
                }, i * 200);
            }
        }, 800);
    }

    startContinuousConfetti() {
        this.confettiInterval = setInterval(() => {
            this.createSingleConfetti();
        }, 150); // Increased frequency
    }

    stopContinuousConfetti() {
        if (this.confettiInterval) {
            clearInterval(this.confettiInterval);
            this.confettiInterval = null;
        }
    }

    createSingleConfetti() {
        const container = document.getElementById('continuous-confetti');
        if (!container) return;

        const colors = ['#F29CB8', '#F48FB1', '#FCE4EC', '#F8BBD9', '#EC407A', '#FFB6C1', '#FFC0CB'];
        
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 5000);
    }

    createPartyConfetti() {
        const container = document.getElementById('party-confetti');
        if (!container) return;

        const colors = ['#F29CB8', '#F48FB1', '#FCE4EC', '#F8BBD9', '#EC407A', '#FFB6C1', '#FFC0CB'];
        
        // Create continuous party confetti
        const partyInterval = setInterval(() => {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'party-confetti-piece';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 1 + 's';
                    confetti.style.animationDuration = (Math.random() * 1.5 + 2.5) + 's';
                    
                    container.appendChild(confetti);
                    
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }, 4000);
                }, i * 50);
            }
        }, 300);

        // Stop party confetti after 10 seconds
        setTimeout(() => {
            clearInterval(partyInterval);
        }, 10000);
    }
}

// Song popup functions
function openSongPopup() {
    const popup = document.getElementById('song-popup');
    if (popup) {
        popup.classList.remove('hidden');
        
        // Pause BGM when song popup opens
        if (window.birthdayWebsite && window.birthdayWebsite.bgm) {
            window.birthdayWebsite.bgm.pause();
        }
    }
}

function closeSongPopup() {
    const popup = document.getElementById('song-popup');
    if (popup) {
        popup.classList.add('hidden');
        
        // Stop song and reset
        if (window.birthdayWebsite && window.birthdayWebsite.songAudio) {
            window.birthdayWebsite.songAudio.pause();
            window.birthdayWebsite.songAudio.currentTime = 0;
            window.birthdayWebsite.isPlaying = false;
            
            const playPauseIcon = document.getElementById('play-pause-icon');
            if (playPauseIcon) {
                playPauseIcon.textContent = '▶';
            }
            
            // Stop visualizer
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
        }
        
        // Resume BGM
        if (window.birthdayWebsite && window.birthdayWebsite.bgm) {
            window.birthdayWebsite.bgm.play().catch(e => console.log('BGM resume failed'));
        }
    }
}

function toggleSong() {
    if (!window.birthdayWebsite || !window.birthdayWebsite.songAudio) return;
    
    const songAudio = window.birthdayWebsite.songAudio;
    const playPauseIcon = document.getElementById('play-pause-icon');
    const bars = document.querySelectorAll('.bar');
    
    if (window.birthdayWebsite.isPlaying) {
        songAudio.pause();
        window.birthdayWebsite.isPlaying = false;
        if (playPauseIcon) playPauseIcon.textContent = '▶';
        
        // Pause visualizer
        bars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    } else {
        songAudio.play().then(() => {
            window.birthdayWebsite.isPlaying = true;
            if (playPauseIcon) playPauseIcon.textContent = '⏸';
            
            // Start visualizer
            bars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        }).catch(e => console.log('Song play failed:', e));
    }
}

function handleAnswer(answer) {
    const website = new BirthdayWebsite();
    const isBirthdayToday = website.isBirthdayToday();
    
    let emoji, title, message;
    
    if (answer === 'yes') {
        emoji = '🥰';
        if (isBirthdayToday) {
            title = 'YAAAY! I KNEW IT!';
            message = 'Happy Birthday, my amazing Udita! 🎂 I\'ve been secretly planning this surprise for weeks! Get ready for the most EPIC birthday celebration the internet has ever seen! Time to party like there\'s no tomorrow! 🥳✨🎊';
        } else {
            title = 'Haww! Really now?';
            message = 'Why would you fib about your birthday, you silly goose? 😅 That\'s not very nice, but I still adore you anyway! I guess we can pretend it\'s your birthday - because honestly, every day should be a celebration when you\'re this absolutely fantastic! 🎭✨';
        }
    } else {
        if (isBirthdayToday) {
            emoji = '🤨';
            title = 'Oh! Come on now...';
            message = 'I KNOW it\'s your birthday today! Don\'t try to fool me, you sneaky little birthday girl! 😏 I have it marked on my calendar with 47 different reminders and even asked Siri to remind me! Let\'s celebrate anyway because today is YOUR special day! 🎈🎊';
        } else {
            emoji = '😊';
            title = 'Aww, I know sweetie...';
            message = 'I know it\'s not your birthday today, I guess you\'re fashionably late to this party! 😄 But hey, no worries at all - you\'re worth celebrating every single day of the year! Let\'s make this moment special anyway because you deserve all the magic! 🌟💖';
        }
    }
    
    showResponse(emoji, title, message);
}

function showResponse(emoji, title, message) {
    document.getElementById('question-screen').style.display = 'none';
    document.getElementById('response-screen').style.display = 'flex';
    
    document.getElementById('response-emoji').textContent = emoji;
    document.getElementById('response-title').textContent = title;
    document.getElementById('response-message').textContent = message;
    
    createMassiveConfetti();
    createResponseEmojis();
    
    // Start party confetti
    if (window.birthdayWebsite) {
        window.birthdayWebsite.createPartyConfetti();
    }
}

function createResponseEmojis() {
    const responseEmojis = [
        '🎂', '🎈', '🎉', '🎊', '🥳', '🎁', '🌟', '✨', '💖', '💕', 
        '🦄', '🌸', '🌺', '🌷', '🌹', '💐', '🎀', '👑', '💎', '🦋',
        '🍰', '🧁', '🍭', '🍬', '🎪', '🎨', '🎭', '🎵', '🎶', '💫'
    ];
    
    setInterval(() => {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'random-emoji';
                emoji.textContent = responseEmojis[Math.floor(Math.random() * responseEmojis.length)];
                emoji.style.left = Math.random() * 100 + '%';
                emoji.style.top = Math.random() * 100 + '%';
                
                document.getElementById('response-screen').appendChild(emoji);
                
                setTimeout(() => {
                    emoji.classList.add('show');
                }, 50);
                
                setTimeout(() => {
                    emoji.classList.add('hide');
                    setTimeout(() => {
                        emoji.remove();
                    }, 800);
                }, 1500);
            }, i * 150);
        }
    }, 1000);
}

function createMassiveConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#F29CB8', '#F48FB1', '#FCE4EC', '#F8BBD9', '#EC407A', '#FFB6C1', '#FFC0CB'];
    
    for (let wave = 0; wave < 5; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 80; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 2 + 's';
                    confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
                    
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
                    }, 5000);
                }, i * 40);
            }
        }, wave * 1000);
    }
}

function showMainSite() {
    document.getElementById('response-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
    
    const website = new BirthdayWebsite();
    website.startContinuousConfetti();
    window.birthdayWebsite = website;
    
    // Trigger scroll animations
    setTimeout(() => {
        const elements = document.querySelectorAll('.main-content > *');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
}

// Rest of the functions remain the same...
function handleCakeClick(event) {
    event.preventDefault();
    
    if (window.birthdayWebsite) {
        window.birthdayWebsite.stopContinuousConfetti();
    }
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const cake = document.createElement('div');
            cake.className = 'falling-cake';
            cake.textContent = '🎂';
            cake.style.left = Math.random() * 100 + '%';
            cake.style.top = '-50px';
            
            document.body.appendChild(cake);
            
            setTimeout(() => {
                cake.remove();
            }, 3000);
        }, i * 200);
    }
    
    const popup = document.createElement('div');
    popup.className = 'cake-popup';
    popup.innerHTML = `
        <h3>🎂 Time to Cut the Cake! 🎂</h3>
        <p>Make a wish, Udita! May all your dreams come true! ✨</p>
        <button class="close-btn" onclick="this.parentElement.remove()">Yay! 🥳</button>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 5000);
    
    setTimeout(() => {
        if (window.birthdayWebsite) {
            window.birthdayWebsite.startContinuousConfetti();
        }
    }, 4000);
}

function handleConfettiClick(event) {
    event.preventDefault();
    
    if (window.birthdayWebsite) {
        window.birthdayWebsite.stopContinuousConfetti();
    }
    
    const container = document.getElementById('confetti-container');
    const colors = ['#F29CB8', '#F48FB1', '#FCE4EC', '#F8BBD9', '#EC407A', '#FFB6C1', '#FFC0CB'];
    
    for (let wave = 0; wave < 8; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 1 + 's';
                    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    
                    const shapeType = Math.random();
                    if (shapeType > 0.8) {
                        confetti.style.borderRadius = '50%';
                    } else if (shapeType > 0.6) {
                        confetti.style.transform = 'rotate(45deg)';
                    } else if (shapeType > 0.4) {
                        confetti.style.width = '20px';
                        confetti.style.height = '8px';
                    }
                    
                    container.appendChild(confetti);
                    
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }, 4000);
                }, i * 20);
            }
        }, wave * 300);
    }
    
    setTimeout(() => {
        if (window.birthdayWebsite) {
            window.birthdayWebsite.startContinuousConfetti();
        }
    }, 3000);
}

function handleStarClick(event) {
    event.preventDefault();
    
    if (window.birthdayWebsite) {
        window.birthdayWebsite.stopContinuousConfetti();
    }
    
    // Create glow wave effect
    const glowWave = document.createElement('div');
    glowWave.className = 'glow-wave';
    glowWave.style.left = event.clientX + 'px';
    glowWave.style.top = event.clientY + 'px';
    
    document.body.appendChild(glowWave);
    
    setTimeout(() => {
        glowWave.remove();
    }, 2000);
    
    // Create falling stars
    const starEmojis = ['⭐', '🌟', '✨', '💫', '🌠'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'falling-star';
            star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
            star.style.left = Math.random() * 100 + '%';
            star.style.top = '-50px';
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 4000);
        }, i * 150);
    }
    
    // Create additional floating emojis
    const magicEmojis = ['✨', '🌟', '💫', '⭐', '🎆', '🎇'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const magic = document.createElement('div');
            magic.className = 'floating-emoji';
            magic.textContent = magicEmojis[Math.floor(Math.random() * magicEmojis.length)];
            magic.style.left = Math.random() * 100 + '%';
            magic.style.top = '100%';
            magic.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
            
            document.body.appendChild(magic);
            
            setTimeout(() => {
                magic.remove();
            }, 3000);
        }, i * 100);
    }
    
    setTimeout(() => {
        if (window.birthdayWebsite) {
            window.birthdayWebsite.startContinuousConfetti();
        }
    }, 5000);
}

function createClickEffect(event) {
    const emojis = ['🎉', '✨', '💖', '🎂', '🎈', '🦄', '🌟', '💫', '🎊', '🥳'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.className = 'click-effect';
            effect.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            effect.style.left = (event.clientX + (Math.random() - 0.5) * 100) + 'px';
            effect.style.top = (event.clientY + (Math.random() - 0.5) * 100) + 'px';
            
            document.body.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 1000);
        }, i * 100);
    }
}

function wiggleStat(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'wiggle 0.6s ease-in-out';
    }, 10);
    
    // Create mini confetti burst
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 8px;
            height: 8px;
            background: #F29CB8;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall 2s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayWebsite();
});

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'b' || e.key === 'B') {
        createMassiveConfetti();
    } else if (e.key === 'h' || e.key === 'H') {
        alert('🎉 Happy Birthday Udita! 🎂\n\nSecret shortcuts:\nB - Confetti burst\nH - This message\nClick 🎂 - Falling cakes\nClick 🎉 - Big confetti\nClick ✨ - Glow wave & stars\n\nMade with ❤️ just for you!');
    } else if (e.key === 'c' || e.key === 'C') {
        // Secret cake rain
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const cake = document.createElement('div');
                cake.className = 'falling-cake';
                cake.textContent = '🎂';
                cake.style.left = Math.random() * 100 + '%';
                cake.style.top = '-50px';
                
                document.body.appendChild(cake);
                
                setTimeout(() => {
                    cake.remove();
                }, 3000);
            }, i * 100);
        }
    } else if (e.key === 'm' || e.key === 'M') {
        // Secret music toggle
        if (window.birthdayWebsite && window.birthdayWebsite.bgm) {
            if (window.birthdayWebsite.bgm.paused) {
                window.birthdayWebsite.bgm.play().catch(e => console.log('BGM play failed'));
            } else {
                window.birthdayWebsite.bgm.pause();
            }
        }
    }
});

// Add hover effects for cursor
document.addEventListener('mouseenter', (e) => {
    if (e.target.matches('button, .social-link, .wish-card, .stat, .answer-btn, .proceed-btn, .song-card')) {
        // Enhanced hover effect for coded heart cursor
        const heartTrail = document.querySelectorAll('.coded-heart-trail');
        heartTrail.forEach(heart => {
            heart.style.transform = 'scale(1.3)';
        });
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target.matches('button, .social-link, .wish-card, .stat, .answer-btn, .proceed-btn, .song-card')) {
        const heartTrail = document.querySelectorAll('.coded-heart-trail');
        heartTrail.forEach(heart => {
            heart.style.transform = 'scale(1)';
        });
    }
}, true);

// Prevent right-click context menu with fun message
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    const message = document.createElement('div');
    message.textContent = '🎉 No peeking at the code! Just enjoy the birthday magic! 🎂';
    message.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        background: rgba(242, 156, 184, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        transform: translate(-50%, -50%);
        pointer-events: none;
        box-shadow: 0 8px 25px rgba(242, 156, 184, 0.4);
        animation: popupAppear 0.3s ease-out forwards;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 2000);
});

// Easter egg: Triple click anywhere for surprise
let clickCount = 0;
let clickTimer = null;

document.addEventListener('click', (e) => {
    clickCount++;
    
    if (clickTimer) {
        clearTimeout(clickTimer);
    }
    
    clickTimer = setTimeout(() => {
        if (clickCount === 3) {
            // Triple click surprise
            const surpriseEmojis = ['🎊', '🥳', '🎉', '🎈', '🎂', '✨'];
            
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const surprise = document.createElement('div');
                    surprise.className = 'click-effect';
                    surprise.textContent = surpriseEmojis[Math.floor(Math.random() * surpriseEmojis.length)];
                    surprise.style.left = Math.random() * 100 + '%';
                    surprise.style.top = Math.random() * 100 + '%';
                    surprise.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                    
                    document.body.appendChild(surprise);
                    
                    setTimeout(() => {
                        surprise.remove();
                    }, 1000);
                }, i * 50);
            }
            
            // Show surprise message
            const surpriseMsg = document.createElement('div');
            surpriseMsg.innerHTML = `
                <h3 style="margin-bottom: 15px;">🎊 SURPRISE! 🎊</h3>
                <p>You found the secret triple-click easter egg!</p>
                <p style="margin-top: 10px;">🥳 Extra birthday magic just for you! ✨</p>
            `;
            surpriseMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                color: var(--text-pink-dark);
                padding: 30px;
                border-radius: 20px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 20px 40px rgba(242, 156, 184, 0.4);
                border: 3px solid var(--darkest-pink);
                animation: popupAppear 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(surpriseMsg);
            
            setTimeout(() => {
                surpriseMsg.remove();
            }, 4000);
        }
        
        clickCount = 0;
    }, 500);
});

// Performance optimization
let lastFrameTime = 0;
function optimizePerformance() {
    const now = performance.now();
    if (now - lastFrameTime > 16) { // ~60fps throttling
        // Cleanup old elements to prevent memory leaks
        const oldElements = document.querySelectorAll('.coded-heart-trail, .confetti, .falling-cake, .falling-star, .floating-emoji, .click-effect, .click-spawn-emoji');
        oldElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Remove elements that are off-screen or have opacity 0
            if (el.style.opacity === '0' || 
                rect.top > window.innerHeight + 100 || 
                rect.bottom < -100 || 
                rect.left > window.innerWidth + 100 || 
                rect.right < -100) {
                if (el.parentNode) {
                    el.remove();
                }
            }
        });
        
        // Cleanup old confetti pieces
        const confettiPieces = document.querySelectorAll('.confetti-piece, .party-confetti-piece');
        if (confettiPieces.length > 50) {
            // Remove oldest confetti pieces if too many exist
            for (let i = 0; i < confettiPieces.length - 50; i++) {
                if (confettiPieces[i].parentNode) {
                    confettiPieces[i].remove();
                }
            }
        }
        
        // Cleanup random emojis that are stuck
        const randomEmojis = document.querySelectorAll('.random-emoji');
        randomEmojis.forEach(emoji => {
            if (!emoji.classList.contains('show') && !emoji.classList.contains('hide')) {
                // Remove emojis that are in limbo state
                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.remove();
                    }
                }, 2000);
            }
        });
        
        lastFrameTime = now;
    }
    requestAnimationFrame(optimizePerformance);
}

// Start performance optimization loop
requestAnimationFrame(optimizePerformance);

// Memory cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Stop continuous confetti to prevent memory leaks
    if (window.birthdayWebsite) {
        window.birthdayWebsite.stopContinuousConfetti();
        
        // Pause all audio
        if (window.birthdayWebsite.bgm) {
            window.birthdayWebsite.bgm.pause();
        }
        if (window.birthdayWebsite.songAudio) {
            window.birthdayWebsite.songAudio.pause();
        }
    }
    
    // Clear all timeouts and intervals
    const highestTimeoutId = setTimeout(() => {}, 0);
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
    
    const highestIntervalId = setInterval(() => {}, 0);
    for (let i = 0; i < highestIntervalId; i++) {
        clearInterval(i);
    }
    
    // Remove all dynamic elements
    const dynamicElements = document.querySelectorAll('.coded-heart-trail, .confetti, .confetti-piece, .party-confetti-piece, .falling-cake, .falling-star, .floating-emoji, .click-effect, .random-emoji, .click-spawn-emoji');
    dynamicElements.forEach(el => {
        if (el.parentNode) {
            el.remove();
        }
    });
});

// Visibility change handler to pause animations when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause continuous confetti when tab is hidden
        if (window.birthdayWebsite) {
            window.birthdayWebsite.stopContinuousConfetti();
            
            // Pause BGM
            if (window.birthdayWebsite.bgm && !window.birthdayWebsite.bgm.paused) {
                window.birthdayWebsite.bgm.pause();
            }
        }
    } else {
        // Resume confetti when tab becomes visible again
        if (window.birthdayWebsite && document.getElementById('main-screen').style.display === 'block') {
            setTimeout(() => {
                window.birthdayWebsite.startContinuousConfetti();
                
                // Resume BGM
                if (window.birthdayWebsite.bgm) {
                    window.birthdayWebsite.bgm.play().catch(e => console.log('BGM resume failed'));
                }
            }, 1000);
        }
    }
});

// Throttled resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Cleanup elements that might be positioned incorrectly after resize
        const offScreenElements = document.querySelectorAll('.coded-heart-trail, .floating-emoji, .click-effect, .click-spawn-emoji');
        offScreenElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.left > window.innerWidth || rect.top > window.innerHeight) {
                if (el.parentNode) {
                    el.remove();
                }
            }
        });
    }, 250);
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.warn('Birthday website error caught:', e.error);
    // Continue running even if there are minor errors
});

// Console welcome message
console.log(`
🎂✨ UDITA'S ENHANCED BIRTHDAY WEBSITE ✨🎂

🎉 New Features loaded successfully:
   • Enhanced confetti system (more confetti on load)
   • Longer heart trail with single-click emoji spawn
   • Background music (bgm.mp3) auto-playing
   • Song dedication with "At My Worst" 
   • Music visualizer and controls
   • Confetti on Let's Party button page
   • Scroll animations for birthday wish page
   • Performance optimizations

🎮 Keyboard shortcuts:
   • B - Confetti burst
   • H - Help message  
   • C - Secret cake rain
   • M - Toggle background music
   • Triple-click - Easter egg surprise

🎵 Audio Features:
   • BGM plays automatically on loop
   • Song popup with visualizer
   • Music controls with progress bar
   • Sweet personal message

💖 Made with extra love for Udita's special day!
   All systems optimized and ready to celebrate! 🥳
`);

