document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // 返回顶部按钮
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 移动端菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    document.body.appendChild(mobileMenu);
    
    // 复制导航菜单到移动端菜单
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    
    navLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        mobileMenu.appendChild(newLink);
    });
    
    // 添加咨询按钮到移动端菜单
    const ctaButton = document.querySelector('.cta-button a').cloneNode(true);
    ctaButton.classList.add('btn-full');
    mobileMenu.appendChild(ctaButton);
    
    // 切换移动端菜单
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // 添加这一行，确保菜单显示/隐藏正确
        mobileMenu.style.display = mobileMenu.classList.contains('active') ? 'flex' : 'none';
    });
    
    // 点击移动端菜单项关闭菜单
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileMenu.style.display = 'none';
        });
    });
    
    // 服务选项卡
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 案例轮播
    const sliderTrack = document.querySelector('.slider-track');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const sliderDots = document.querySelector('.slider-dots');
    const cards = document.querySelectorAll('.case-card');
    
    if (sliderTrack && cards.length > 0) {
        let currentIndex = 0;
        const cardWidth = cards[0].offsetWidth + 30; // 包括margin
        const visibleCards = window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
        const maxIndex = cards.length - visibleCards;
        
        // 创建轮播点
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.setAttribute('data-index', i);
            sliderDots.appendChild(dot);
            
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                currentIndex = index;
                updateSlider();
            });
        }
        
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        sliderPrev.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        sliderNext.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
        
        // 响应窗口大小变化
        window.addEventListener('resize', function() {
            const newVisibleCards = window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
            const newMaxIndex = cards.length - newVisibleCards;
            
            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
                updateSlider();
            }
        });
    }
    
    // 数字动画
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 动画持续时间（毫秒）
            const startTime = Date.now();
            const startValue = 0;
            
            function updateCount() {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    const currentValue = Math.floor(startValue + progress * (target - startValue));
                    stat.textContent = currentValue;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            }
            
            updateCount();
        });
    }
    // 调整AI大脑动画尺寸
function resizeBrainCanvas() {
    const brainCanvas = document.getElementById('brainCanvas');
    if (brainCanvas) {
        brainCanvas.width = brainCanvas.offsetWidth;
        brainCanvas.height = brainCanvas.offsetHeight;
        
        // 如果在移动端，减少节点数量以提高性能
        if (window.innerWidth <= 768) {
            nodeCount = 50; // 减少节点数量
        } else {
            nodeCount = 100; // 恢复默认节点数量
        }
        
        // 重新初始化节点
        initNodes();
    }
}

// 添加窗口大小变化监听
window.addEventListener('resize', function() {
    resizeBrainCanvas();
});
    // 使用Intersection Observer检测元素是否在视口中
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // AI大脑动画
    const brainCanvas = document.getElementById('brainCanvas');
    if (brainCanvas) {
        const ctx = brainCanvas.getContext('2d');
        const width = brainCanvas.width = brainCanvas.offsetWidth;
        const height = brainCanvas.height = brainCanvas.offsetHeight;
        
        // 神经网络节点
        const nodes = [];
        const nodeCount = 100;
        const nodeRadius = 2;
        const nodeColor = '#0084FF';
        const connectionDistance = 100;
        const connectionColor = 'rgba(0, 132, 255, 0.2)';
        
        // 创建节点
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: nodeRadius + Math.random() * 1
            });
        }
        
        function drawNodes() {
            ctx.clearRect(0, 0, width, height);
            
            // 绘制连接线
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = connectionColor;
                        ctx.lineWidth = 1 - distance / connectionDistance;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            // 绘制节点
            for (let i = 0; i < nodes.length; i++) {
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();
                
                // 更新节点位置
                nodes[i].x += nodes[i].vx;
                nodes[i].y += nodes[i].vy;
                
                // 边界检测
                if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1;
                if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;
            }
            
            requestAnimationFrame(drawNodes);
        }
        
        drawNodes();
        
        // 响应窗口大小变化
        window.addEventListener('resize', function() {
            brainCanvas.width = brainCanvas.offsetWidth;
            brainCanvas.height = brainCanvas.offsetHeight;
        });
    }
    
    // 设置glitch文本效果
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.setAttribute('data-text', glitchText.textContent);
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动菜单（如果打开）
                if (mobileMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单表单验证
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                isValid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                isValid = false;
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }
            
            if (!message.value.trim()) {
                isValid = false;
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }
            
            if (isValid) {
                // 这里可以添加表单提交逻辑，例如AJAX请求
                alert('感谢您的留言！我们将尽快与您联系。');
                contactForm.reset();
            } else {
                alert('请填写所有必填字段并确保邮箱格式正确。');
            }
        });
        
        // 邮箱验证函数
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">微克科技</div>
            </div>
        `;
        document.body.appendChild(loader);
        
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 1000);
    });
    
    // 添加页面进入动画
    const animateElements = document.querySelectorAll('.hero-content, .hero-image, .solution-card, .about-content, .tab-content-inner, .case-card, .testimonial-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });
});