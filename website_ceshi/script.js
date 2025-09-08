document.addEventListener('DOMContentLoaded', function() {
    // Matrix背景效果
    createMatrixEffect();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 数字计数器动画
    initCounters();
    
    // 技能进度条动画
    initSkillBars();
    
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 页面加载动画
    initPageLoader();
    
    // 浮动元素动画
    initFloatingElements();
    
    // 照片弹窗功能
    initPhotoModal();
});

// Matrix背景效果
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixBg = document.getElementById('matrixBg');
    
    matrixBg.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 100);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 平滑滚动
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 数字计数器动画
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let started = false;
    
    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 20);
        });
    }
    
    // 触发条件：当统计部分进入视口时
    window.addEventListener('scroll', () => {
        if (!started) {
            const statsSection = document.querySelector('.stats');
            const sectionTop = statsSection.offsetTop;
            const sectionHeight = statsSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop + windowHeight > sectionTop + sectionHeight / 2) {
                started = true;
                startCounting();
            }
        }
    });
}

// 技能进度条动画
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    let skillsAnimated = false;
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    window.addEventListener('scroll', () => {
        if (!skillsAnimated) {
            const skillsSection = document.getElementById('skills');
            const sectionTop = skillsSection.offsetTop;
            const sectionHeight = skillsSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop + windowHeight > sectionTop + sectionHeight / 2) {
                skillsAnimated = true;
                animateSkills();
            }
        }
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 页面加载动画
function initPageLoader() {
    // 创建加载器
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    
    // 添加加载器样式
    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-color);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 255, 255, 0.3);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        .loader-text {
            color: var(--primary-color);
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            letter-spacing: 2px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(loader);
    
    // 移除加载器
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                styleSheet.remove();
            }, 500);
        }, 1000);
    });
}

// 浮动元素动画
function initFloatingElements() {
    const floatingBoxes = document.querySelectorAll('.floating-box');
    
    floatingBoxes.forEach((box, index) => {
        // 随机颜色
        const colors = ['#00ffff', '#ff00ff', '#00ff00'];
        box.style.borderColor = colors[index % colors.length];
        
        // 随机动画延迟
        box.style.animationDelay = `${-Math.random() * 6}s`;
        
        // 鼠标跟随效果
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const boxRect = box.getBoundingClientRect();
            const boxX = boxRect.left + boxRect.width / 2;
            const boxY = boxRect.top + boxRect.height / 2;
            
            const distance = Math.sqrt(Math.pow(mouseX - boxX, 2) + Math.pow(mouseY - boxY, 2));
            const maxDistance = 200;
            
            if (distance < maxDistance) {
                const influence = (maxDistance - distance) / maxDistance;
                const moveX = (mouseX - boxX) * influence * 0.1;
                const moveY = (mouseY - boxY) * influence * 0.1;
                
                box.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                box.style.transform = 'translate(0, 0)';
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 初始化滚动动画
window.addEventListener('load', initScrollAnimations);

// 按钮点击效果
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 添加涟漪效果样式
const rippleStyles = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-effect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

// 照片弹窗功能
function initPhotoModal() {
    const photoItems = document.querySelectorAll('.photo-item');
    const modal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');
    
    let currentPhotoIndex = 0;
    const photos = Array.from(photoItems).map(item => item.getAttribute('data-photo'));
    
    // 打开弹窗
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentPhotoIndex = index;
            showPhoto(currentPhotoIndex);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭弹窗
    closeModal.addEventListener('click', closePhotoModal);
    
    // 点击弹窗背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePhotoModal();
        }
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closePhotoModal();
        }
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevPhoto();
            } else if (e.key === 'ArrowRight') {
                showNextPhoto();
            }
        }
    });
    
    // 上一张照片
    prevBtn.addEventListener('click', showPrevPhoto);
    
    // 下一张照片
    nextBtn.addEventListener('click', showNextPhoto);
    
    function showPhoto(index) {
        if (index >= 0 && index < photos.length) {
            modalImage.src = photos[index];
            currentPhotoIndex = index;
        }
    }
    
    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        showPhoto(currentPhotoIndex);
    }
    
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        showPhoto(currentPhotoIndex);
    }
    
    function closePhotoModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // 触摸滑动支持
    let startX = 0;
    let endX = 0;
    
    modalImage.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    modalImage.addEventListener('touchmove', (e) => {
        e.preventDefault();
    });
    
    modalImage.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const difference = startX - endX;
        
        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                showNextPhoto();
            } else {
                showPrevPhoto();
            }
        }
    });
}