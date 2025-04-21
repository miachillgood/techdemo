// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create a particle background effect on the hero section
    const hero = document.querySelector('.hero');
    createParticleBackground(hero);
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filter functionality with animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects with animations
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form submission handling with enhanced validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add validation classes to form elements
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Add validation styles on blur
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                } else {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                }
            });
            
            // Remove validation styles on focus
            input.addEventListener('focus', function() {
                this.classList.remove('invalid');
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Check for empty fields
            let isValid = true;
            formInputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.classList.add('invalid');
                    isValid = false;
                }
            });
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email').classList.add('invalid');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification('Please fill in all fields correctly', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                showNotification('Your message has been sent successfully!', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Remove all validation classes
                formInputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
            }, 1500);
        });
    }

    // Create a notification system
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after timeout
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Advanced typing effect for the hero section
    const typingElement = document.querySelector('.hero-content h2');
    const words = ['Software Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    // Clear initial text
    typingElement.textContent = '';
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove a character
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Add a character
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        // If word is complete, start deleting after pause
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        }
        
        // If deletion is complete, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            // If section is in viewport
            if (sectionTop < windowHeight - 100) {
                section.classList.add('in-view');
            }
        });
        
        // Animate section titles
        const titles = document.querySelectorAll('.section-title');
        titles.forEach(title => {
            const titleTop = title.getBoundingClientRect().top;
            
            if (titleTop < windowHeight - 50) {
                title.classList.add('animate');
            }
        });
        
        // Animate skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight - 50) {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 100); // Staggered animation
            }
        });
        
        // Animate project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < windowHeight - 50) {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 200); // Staggered animation
            }
        });
    };
    
    // Set initial animation states with CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .section-title {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .section-title.animate {
            opacity: 1;
            transform: translateY(0);
        }
        .skill-item, .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .skill-item.animate, .project-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 15px 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .notification.success {
            border-left: 4px solid #00f7b5;
        }
        .notification.error {
            border-left: 4px solid #ff5370;
        }
        .notification.success i {
            color: #00f7b5;
        }
        .notification.error i {
            color: #ff5370;
        }
        .notification i {
            font-size: 24px;
        }
        .notification p {
            color: #fff;
            margin: 0;
        }
        input.invalid, textarea.invalid {
            border-color: #ff5370 !important;
            box-shadow: 0 0 0 3px rgba(255, 83, 112, 0.1) !important;
        }
        input.valid, textarea.valid {
            border-color: #00f7b5 !important;
            box-shadow: 0 0 0 3px rgba(0, 247, 181, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Particle background effect function
    function createParticleBackground(element) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        
        // Style canvas
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none';
        
        // Add canvas to element
        element.style.position = 'relative';
        element.insertBefore(canvas, element.firstChild);
        
        // Particle settings
        const particleCount = 100;
        const particles = [];
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25
            });
        }
        
        // Animate particles
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                // Move particle
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
            
            // Connect particles that are close
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance/500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = element.offsetWidth;
            canvas.height = element.offsetHeight;
        });
    }
}); 