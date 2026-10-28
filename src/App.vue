<template>
  <div id="app">
  

    <!-- 顶部渐变导航栏 -->
    <header class="app-header">
      <div class="logo">
        <span class="dog-icon">🐶</span>
        <h1>狗狗乐园</h1>
      </div>
      <nav class="main-nav">
        <router-link to="/" class="nav-link">
          <span class="nav-icon">🏠</span>
          所有狗狗
        </router-link>
        <router-link to="/AdoptedDogs" class="nav-link">
          <span class="nav-icon">💝</span>
          已收养
        </router-link>

        <!-- 登录状态相关按钮 -->
        <template v-if="isLogin">
          <button @click="handleLogout" class="logout-btn">退出登录</button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">登录</router-link>
          <router-link to="/register" class="nav-link">注册</router-link>
        </template>
      </nav>
    </header>
      <!-- 装饰气泡 -->
    <div class="decoration-top">
      <div class="bubble bubble-1">🐾</div>
      <div class="bubble bubble-2">🐕</div>
      <div class="bubble bubble-3">🦴</div>
    </div>

    <main class="app-main">
      <router-view />
    </main>

    <!-- 底部装饰元素 -->
    <div class="decoration-bottom">
      <div class="bubble bubble-4">🎾</div>
      <div class="bubble bubble-5">🥎</div>
      <div class="bubble bubble-6">🐾</div>
    </div>

    <!-- 光标粒子容器 -->
    <div class="js-cursor-container"></div>
  </div>
</template>

<!-- 优化后的仙女粉尘光标特效脚本 -->
<script>
function fairyDustCursor() {
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798", "#ff9d00", "#4ecdc4"];
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = { x: width / 2, y: height / 2 };
    var particles = [];

    function init() {
        bindEvents();
        loop();
    }

    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onMouseMove(e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        // 优化粒子生成频率和数量
        for (var i = 0; i < 2; i++) {
            addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
        }
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        for (var j = particles.length - 1; j >= 0; j--) {
            if (particles[j].lifeSpan < 0) {
                particles[j].die();
                particles.splice(j, 1);
            }
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    /**
     * 粒子类
     */
    function Particle() {
        // 更细小的字符
        this.characters = ["•", "·", "✦", "✧"];
        this.character = this.characters[Math.floor(Math.random() * this.characters.length)];
        this.lifeSpan = 60; // 缩短生命周期，更流畅
        this.initialStyles = {
            "position": "fixed",
            "display": "inline-block",
            "top": "0px",
            "left": "0px",
            "pointerEvents": "none",
            "touch-action": "none",
            "z-index": "10000000",
            "fontSize": "12px", // 减小粒子尺寸
            "will-change": "transform",
            "textShadow": "0 0 3px rgba(255,255,255,0.8)" // 减小阴影
        };

        this.init = function (x, y, color) {
            // 优化速度，更平滑的轨迹
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.2),
                y: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.2)
            };

            // 减小偏移范围
            this.position = {
                x: x + (Math.random() - 0.5) * 15,
                y: y + (Math.random() - 0.5) * 15
            };

            this.initialStyles.color = color;
            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();

            document.querySelector('.js-cursor-container').appendChild(this.element);
        };

        this.update = function () {
            // 减小重力效果
            this.velocity.y += 0.03;
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            // 更平滑的缩放和透明度变化
            var scale = this.lifeSpan / 60;
            this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${scale})`;
            this.element.style.opacity = scale * 0.8; // 降低最大透明度
        }

        this.die = function () {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    /**
     * 工具函数：应用样式
     */
    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    // 非触屏设备启用
    if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
}

// 初始化光标特效
fairyDustCursor();
</script>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isLogin = ref(!!localStorage.getItem('user')) // 登录状态

// 路由变化时同步登录状态（登录/退出后导航栏立即刷新）
watch(() => route.fullPath, () => {
  isLogin.value = !!localStorage.getItem('user')
})

// 退出登录处理
const handleLogout = () => {
  localStorage.removeItem('user')
  isLogin.value = false
  router.push('/')
  alert('退出登录成功！')
}
</script>

<style>
/* 全局样式（去掉scoped，让星星样式生效） */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: 'Arial', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  color: #333;
  background-image: url(./assets/imgs/bd2.jpg);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

#app {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
}

/* 光标粒子容器 */
.js-cursor-container {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none; /* 不遮挡鼠标事件 */
    z-index: 999999; /* 最顶层显示 */
}

/* 装饰气泡样式 */
.decoration-top {
  position: fixed; /* 改成fixed，不占用文档流 */
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  pointer-events: none;
  z-index: 1; /* 低于header */
}

.decoration-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  pointer-events: none;
  z-index: 2;
}

.bubble {
  position: absolute;
  font-size: 1.5rem;
  animation: float 6s ease-in-out infinite;
  opacity: 0.7;
}

.bubble-1 { left: 10%; animation-delay: 0s; }
.bubble-2 { left: 30%; animation-delay: 2s; }
.bubble-3 { left: 50%; animation-delay: 4s; }
.bubble-4 { right: 20%; animation-delay: 1s; }
.bubble-5 { right: 40%; animation-delay: 3s; }
.bubble-6 { right: 60%; animation-delay: 5s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

/* 头部样式 - 修改部分 */
.app-header {
  background: linear-gradient(135deg, #ff6b6b, #ffd93d);
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky; /* 改为 sticky 定位 */
  top: 0; /* 当滚动到顶部时粘性定位生效 */
  z-index: 10;
  margin: 0;
  transition: all 0.3s ease; /* 添加过渡效果 */
}

/* 添加媒体查询，在全屏/大屏幕时取消粘性定位 */
@media (min-width: 1200px) {
  .app-header {
    position: relative; /* 在大屏幕上恢复为相对定位 */
    top: auto; /* 重置top值 */
  }
  
  /* 可选：当页面很长时，重新启用粘性定位，但只在滚动超过一定距离后 */
  body.has-long-content .app-header {
    position: sticky;
    top: 0;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.logo .dog-icon {
  font-size: 2rem;
}

.logo h1 {
  color: #333;
  margin: 0;
  font-size: 1.8rem;
}

.main-nav {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  transition: all 0.4s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px) scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.nav-icon {
  font-size: 1.2rem;
}

.logout-btn {
  background-color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #f8f8f8;
  transform: translateY(-2px);
}

/* 主体样式 */
.app-main {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 1rem;
  position: relative;
  z-index: 10;
}

/* 底部样式 */
.app-footer {
  background: linear-gradient(135deg, #ff6b6b, #ffd93d);
  text-align: center;
  padding: 1.5rem;
  margin-top: 3rem;
  border-radius: 30px 30px 0 0;
  color: #333;
  position: relative;
  z-index: 10;
}
</style>