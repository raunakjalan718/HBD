class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.colors = [
            'rgba(233, 30, 99, 0.6)',   // Primary pink
            'rgba(255, 107, 107, 0.6)', // Coral
            'rgba(255, 149, 0, 0.6)',   // Orange
            'rgba(255, 171, 145, 0.6)', // Peach
            'rgba(255, 255, 255, 0.4)'  // White
        ];
        
        this.setupCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.setupCanvas());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        const container = document.getElementById('particles');
        if (container) {
            container.innerHTML = '';
            container.appendChild(this.canvas);
        }
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 1.2,
                speedY: (Math.random() - 0.5) * 1.2,
                opacity: Math.random() * 0.6 + 0.2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                originalX: 0,
                originalY: 0,
                magnetism: Math.random() * 0.1 + 0.05
            });
            
            // Set original position for mouse interaction
            this.particles[i].originalX = this.particles[i].x;
            this.particles[i].originalY = this.particles[i].y;
        }
    }
    
    handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        this.particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.x -= dx * force * particle.magnetism;
                particle.y -= dy * force * particle.magnetism;
            }
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen
            if (particle.x < -10) particle.x = this.canvas.width + 10;
            if (particle.x > this.canvas.width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = this.canvas.height + 10;
            if (particle.y > this.canvas.height + 10) particle.y = -10;
            
            // Gentle opacity variation
            particle.opacity += (Math.random() - 0.5) * 0.02;
            particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
            
            // Gentle size variation
            particle.size += (Math.random() - 0.5) * 0.1;
            particle.size = Math.max(0.5, Math.min(5, particle.size));
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Draw main particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('0.6)', particle.opacity + ')');
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Draw connections between nearby particles
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100 && distance > 0) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    // Method to add burst effect
    addBurst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 5 + 2;
            
            this.particles.push({
                x: x,
                y: y,
                size: Math.random() * 3 + 2,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                opacity: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                life: 60, // frames to live
                originalX: x,
                originalY: y,
                magnetism: 0.1
            });
        }
    }
}

// Enhanced particle system for special effects
class ConfettiParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = Math.random() * -15 - 5;
        this.gravity = 0.3;
        this.friction = 0.99;
        this.size = Math.random() * 8 + 4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.colors = ['#E91E63', '#FF6B6B', '#FF9500', '#FFAB91'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        this.vx *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
    
    isDead() {
        return this.life <= 0;
    }
}

// Birthday-themed particle shapes
class BirthdayParticle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'heart', 'star', 'balloon'
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.size = Math.random() * 20 + 10;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulseSpeed = Math.random() * 0.1 + 0.05;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += this.pulseSpeed;
        
        // Wrap around screen
        if (this.x < -50) this.x = window.innerWidth + 50;
        if (this.x > window.innerWidth + 50) this.x = -50;
        if (this.y < -50) this.y = window.innerHeight + 50;
        if (this.y > window.innerHeight + 50) this.y = -50;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.opacity + Math.sin(this.pulsePhase) * 0.2;
        
        const size = this.size + Math.sin(this.pulsePhase) * 3;
        
        switch (this.type) {
            case 'heart':
                this.drawHeart(ctx, size);
                break;
            case 'star':
                this.drawStar(ctx, size);
                break;
            case 'balloon':
                this.drawBalloon(ctx, size);
                break;
        }
        
        ctx.restore();
    }
    
    drawHeart(ctx, size) {
        ctx.fillStyle = '#E91E63';
        ctx.beginPath();
        ctx.moveTo(0, size / 4);
        ctx.bezierCurveTo(-size / 2, -size / 4, -size, size / 4, 0, size);
        ctx.bezierCurveTo(size, size / 4, size / 2, -size / 4, 0, size / 4);
        ctx.fill();
    }
    
    drawStar(ctx, size) {
        ctx.fillStyle = '#FF9500';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            
            const innerAngle = ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;
            const innerX = Math.cos(innerAngle) * size * 0.4;
            const innerY = Math.sin(innerAngle) * size * 0.4;
            ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
    }
    
    drawBalloon(ctx, size) {
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.6, size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Balloon string
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, size);
        ctx.lineTo(0, size + 20);
        ctx.stroke();
    }
}
