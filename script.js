// Global variables
let currentSection = 0;
const sections = document.querySelectorAll('.section');
let isTransitioning = false;
let musicPlaying = false;
let typewriterComplete = false;
let surpriseRevealed = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    startOpeningSequence();
});

// Initialize website components
function initializeWebsite() {
    // Set birthday date to September 29, 2025
    const birthdayDateElement = document.getElementById('birthdayDate');
    birthdayDateElement.textContent = 'September 29, 2025';
    
    // Initialize progress bar
    updateProgressBar();
    
    // Initialize photo slideshow
    initializePhotoSlideshow();
    
    // Initialize confetti particles
    createConfettiParticles();
    
    // Add floating hearts
    createFloatingHearts();
    
    // Initialize modern particle system
    createParticleSystem();
    
    // Add modern visual effects
    initializeModernEffects();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', () => navigateSection(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigateSection(1));
    
    // Music toggle
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);
    
    // Replay button
    document.getElementById('replayBtn').addEventListener('click', replayExperience);
    
    // Photo dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            navigateSection(1); // Swipe left - next
        }
        if (touchEndX > touchStartX + 50) {
            navigateSection(-1); // Swipe right - previous
        }
    }
}

// Start opening sequence
function startOpeningSequence() {
    setTimeout(() => {
        showSection(0);
    }, 500);
    
    // Auto-advance to birthday reveal after opening
    setTimeout(() => {
        if (currentSection === 0) {
            navigateSection(1);
        }
    }, 5000);
}

// Navigate between sections
function navigateSection(direction) {
    if (isTransitioning) return;
    
    const nextSection = currentSection + direction;
    
    if (nextSection >= 0 && nextSection < sections.length) {
        showSection(nextSection);
    }
}

// Show specific section with modern transitions
function showSection(sectionIndex) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Add leaving animation to current section
    sections[currentSection].classList.add('leaving');
    sections[currentSection].classList.remove('active');
    
    // Show new section with entering animation
    setTimeout(() => {
        sections[currentSection].classList.remove('leaving');
        currentSection = sectionIndex;
        sections[currentSection].classList.add('entering', 'active');
        
        // Remove entering class after animation
        setTimeout(() => {
            sections[currentSection].classList.remove('entering');
        }, 1200);
        
        // Trigger section-specific animations
        handleSectionAnimations(currentSection);
        
        // Update navigation
        updateNavigation();
        updateProgressBar();
        
        isTransitioning = false;
    }, 800);
}

// Handle section-specific animations
function handleSectionAnimations(sectionIndex) {
    switch(sectionIndex) {
        case 1: // Birthday reveal
            triggerConfetti();
            break;
        case 2: // Photos
            startPhotoSlideshow();
            break;
        case 3: // Message
            if (!typewriterComplete) {
                startTypewriter();
            }
            break;
        case 4: // Closing
            animateClosingHearts();
            break;
    }
}

// Update navigation buttons
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSection === 0;
    nextBtn.disabled = currentSection === sections.length - 1;
}

// Update progress bar
function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progress = ((currentSection + 1) / sections.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Keyboard navigation
function handleKeyNavigation(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        navigateSection(-1);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        navigateSection(1);
    }
}

// Music functionality
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicBtn = document.getElementById('musicToggle');
    
    if (musicPlaying) {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music-slash"></i>';
        musicPlaying = false;
    } else {
        music.play().catch(e => {
            console.log('Auto-play prevented by browser:', e);
        });
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicPlaying = true;
    }
}

// Confetti animation
function createConfettiParticles() {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#9370db', '#00ced1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 0;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            transform: rotate(${Math.random() * 360}deg);
        `;
        confettiContainer.appendChild(confetti);
    }
}

function triggerConfetti() {
    const confettiPieces = document.querySelectorAll('.confetti-piece');
    
    confettiPieces.forEach((piece, index) => {
        // Add random colors and sizes
        const colors = ['#ff69b4', '#ffd700', '#ff1493', '#9370db', '#00ced1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = 6 + Math.random() * 6;
        
        piece.style.background = `linear-gradient(45deg, ${randomColor}, ${colors[(Math.floor(Math.random() * colors.length))]}`;
        piece.style.width = randomSize + 'px';
        piece.style.height = randomSize + 'px';
        
        setTimeout(() => {
            piece.style.animation = `modernConfettiFall ${3 + Math.random() * 2}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
            piece.style.opacity = '1';
        }, index * 30);
    });
    
    // Create additional burst effect
    createConfettiBurst();
}

// Photo slideshow functionality
let currentSlide = 0;
let slideInterval;

function initializePhotoSlideshow() {
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Ensure first slide is active
    slides[0].classList.add('active');
    dots[0].classList.add('active');
}

function startPhotoSlideshow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Set new current slide
    currentSlide = slideIndex;
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % document.querySelectorAll('.photo-slide').length;
    goToSlide(nextIndex);
}

// Typewriter effect
function startTypewriter() {
    const text = "My dearest love, every moment with you feels like a beautiful dream come true. You bring so much joy, laughter, and warmth into my life. Your smile lights up my world, and your love gives me strength every single day. On this special day, I want you to know how incredibly grateful I am to have you by my side. You are not just my girlfriend, you are my best friend, my partner, and the love of my life. I promise to cherish every moment we share together and to love you more with each passing day. Happy Birthday, my beautiful angel! 💕";
    
    const typewriterElement = document.getElementById('typewriterText');
    let i = 0;
    
    typewriterElement.textContent = '';
    
    function typeCharacter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeCharacter, 50);
        } else {
            typewriterComplete = true;
            // Remove cursor after typing is complete
            setTimeout(() => {
                typewriterElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    typeCharacter();
}

// Enhanced Surprise functionality
function triggerSurprise() {
    if (surpriseRevealed) return;
    
    surpriseRevealed = true;
    
    // Add click feedback
    const surpriseBtn = document.getElementById('surpriseBtn');
    surpriseBtn.style.transform = 'scale(0.95)';
    surpriseBtn.style.transition = 'all 0.1s ease';
    
    // Create button explosion effect
    createButtonExplosion(surpriseBtn);
    
    setTimeout(() => {
        // Hide surprise button with animation
        surpriseBtn.style.transform = 'scale(0) rotateY(180deg)';
        surpriseBtn.style.opacity = '0';
        surpriseBtn.style.filter = 'blur(10px)';
    }, 200);
    
    // Trigger enhanced fireworks
    setTimeout(() => {
        createFireworks();
        createMagicalSparkles();
    }, 500);
    
    // Show surprise message with enhanced animation
    setTimeout(() => {
        const surpriseMessage = document.getElementById('surpriseMessage');
        surpriseMessage.classList.add('show');
        surpriseMessage.style.animation = 'surpriseReveal 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
    }, 1000);
    
    // Auto-advance to closing after surprise
    setTimeout(() => {
        if (currentSection === 4) {
            navigateSection(1);
        }
    }, 7000);
}

// Button explosion effect
function createButtonExplosion(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create explosion particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const angle = (i / 20) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const size = 3 + Math.random() * 4;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, #ff69b4, #ffd700);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: buttonParticleExplode 1s ease-out forwards;
            --dx: ${Math.cos(angle) * velocity}px;
            --dy: ${Math.sin(angle) * velocity}px;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
    
    // Add explosion animation if not exists
    if (!document.querySelector('#button-explosion-style')) {
        const style = document.createElement('style');
        style.id = 'button-explosion-style';
        style.textContent = `
            @keyframes buttonParticleExplode {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0);
                    opacity: 0;
                }
            }
            @keyframes surpriseReveal {
                0% {
                    opacity: 0;
                    transform: scale(0.3) rotateY(-90deg);
                    filter: blur(20px);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.1) rotateY(0deg);
                    filter: blur(5px);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) rotateY(0deg);
                    filter: blur(0px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Magical sparkles effect
function createMagicalSparkles() {
    const sparkleContainer = document.querySelector('#surprise');
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${12 + Math.random() * 8}px;
                pointer-events: none;
                animation: magicalSparkle 2s ease-out forwards;
                z-index: 100;
            `;
            
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 100);
    }
    
    // Add magical sparkle animation
    if (!document.querySelector('#magical-sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'magical-sparkle-style';
        style.textContent = `
            @keyframes magicalSparkle {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fireworks animation
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#9370db', '#00ced1', '#ff6347'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createSingleFirework(fireworksContainer, colors);
        }, i * 200);
    }
}

function createSingleFirework(container, colors) {
    const firework = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
    
    firework.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 10px ${color};
    `;
    
    container.appendChild(firework);
    
    // Create explosion particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const angle = (i * 30) * Math.PI / 180;
        const velocity = 50 + Math.random() * 50;
        const particleX = Math.cos(angle) * velocity;
        const particleY = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 3px;
            height: 3px;
            background: ${color};
            border-radius: 50%;
            animation: fireworkParticle 1.5s ease-out forwards;
            --dx: ${particleX}px;
            --dy: ${particleY}px;
        `;
        
        container.appendChild(particle);
    }
    
    // Add firework particle animation
    if (!document.querySelector('#firework-style')) {
        const style = document.createElement('style');
        style.id = 'firework-style';
        style.textContent = `
            @keyframes fireworkParticle {
                to {
                    transform: translate(var(--dx), var(--dy));
                    opacity: 0;
                    scale: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove firework elements after animation
    setTimeout(() => {
        firework.remove();
        container.querySelectorAll('div').forEach(particle => {
            if (particle !== firework) particle.remove();
        });
    }, 2000);
}

function clearFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    fireworksContainer.innerHTML = '';
}

// Floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = Math.random() > 0.5 ? '💖' : '💕';
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: 100vh;
            font-size: ${15 + Math.random() * 10}px;
            animation: floatHeart 8s linear forwards;
            pointer-events: none;
            opacity: 0.7;
        `;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 2000);
}

// Animate closing hearts
function animateClosingHearts() {
    const hearts = document.querySelectorAll('.closing-hearts .heart');
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.animation = 'heartBeat 1.5s ease-in-out infinite, bounceIn 1s ease-out';
        }, index * 200);
    });
}

// Replay experience
function replayExperience() {
    // Reset all states
    currentSection = 0;
    typewriterComplete = false;
    
    // Reset sections
    sections.forEach(section => section.classList.remove('active'));
    
    // Reset typewriter
    const typewriterElement = document.getElementById('typewriterText');
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '2px solid #ff69b4';
    
    // Reset photo slideshow
    currentSlide = 0;
    clearInterval(slideInterval);
    goToSlide(0);
    
    // Restart experience
    startOpeningSequence();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedNavigate = debounce(navigateSection, 300);

// Add some extra magical touches
document.addEventListener('mousemove', function(e) {
    // Create sparkle effect on mouse move (throttled)
    if (Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 12px;
        pointer-events: none;
        animation: sparkleDisappear 1s ease-out forwards;
        z-index: 1000;
    `;
    
    document.body.appendChild(sparkle);
    
    // Add sparkle animation if not exists
    if (!document.querySelector('#sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkleDisappear {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add loading screen fade out
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some ambient sound control (if audio files are available)
function initializeAmbientSounds() {
    // This would be where you'd add ambient romantic sounds
    // For now, we'll just setup the structure
    const ambientSounds = {
        heartbeat: null,
        windChimes: null,
        softPiano: null
    };
    
    // You can add audio files later and uncomment this:
    /*
    ambientSounds.heartbeat = new Audio('sounds/heartbeat.mp3');
    ambientSounds.windChimes = new Audio('sounds/wind-chimes.mp3');
    ambientSounds.softPiano = new Audio('sounds/soft-piano.mp3');
    
    Object.values(ambientSounds).forEach(sound => {
        if (sound) {
            sound.loop = true;
            sound.volume = 0.3;
        }
    });
    */
}

// Modern particle system
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.body.appendChild(particleContainer);
    
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < 20) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 8000);
        }
    }, 300);
}

// Enhanced confetti burst
function createConfettiBurst() {
    const burstContainer = document.querySelector('.confetti');
    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#9370db', '#00ced1'];
    
    for (let i = 0; i < 30; i++) {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: 50%;
            top: 20%;
            border-radius: 50%;
            animation: burstParticle ${1 + Math.random()}s ease-out forwards;
            --angle: ${Math.random() * 360}deg;
            --distance: ${50 + Math.random() * 100}px;
        `;
        
        burstContainer.appendChild(burst);
        
        setTimeout(() => burst.remove(), 2000);
    }
    
    // Add burst animation
    if (!document.querySelector('#burst-style')) {
        const style = document.createElement('style');
        style.id = 'burst-style';
        style.textContent = `
            @keyframes burstParticle {
                0% {
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--distance))) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize modern effects
function initializeModernEffects() {
    // Add smooth cursor trail
    let mouseTrail = [];
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
        if (mouseTrail.length > 10) mouseTrail.shift();
        
        // Create occasional sparkle trail
        if (Math.random() > 0.98) {
            createModernSparkle(e.clientX, e.clientY);
        }
    });
    
    // Add section transition sound effects (visual representation)
    sections.forEach(section => {
        section.addEventListener('transitionstart', () => {
            createTransitionEffect();
        });
    });
}

// Modern sparkle effect
function createModernSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 105, 180, 0.8) 50%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: modernSparkleEffect 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        z-index: 1000;
        box-shadow: 0 0 10px rgba(255, 105, 180, 0.8);
    `;
    
    document.body.appendChild(sparkle);
    
    if (!document.querySelector('#modern-sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'modern-sparkle-style';
        style.textContent = `
            @keyframes modernSparkleEffect {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                    filter: blur(0px);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5) rotate(180deg);
                    filter: blur(1px);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                    filter: blur(3px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => sparkle.remove(), 1500);
}

// Transition effect
function createTransitionEffect() {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 105, 180, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        animation: transitionPulse 0.8s ease-out forwards;
        z-index: 50;
    `;
    
    document.body.appendChild(effect);
    
    if (!document.querySelector('#transition-style')) {
        const style = document.createElement('style');
        style.id = 'transition-style';
        style.textContent = `
            @keyframes transitionPulse {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-50%, -50%) scale(5);
                    opacity: 0.3;
                }
                100% {
                    transform: translate(-50%, -50%) scale(10);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => effect.remove(), 800);
}

// Call ambient sounds initialization
initializeAmbientSounds();
