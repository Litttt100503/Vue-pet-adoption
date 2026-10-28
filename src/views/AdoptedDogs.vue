<template>
  <div class="adopted-dogs">
    <h1 class="page-title">💖 已收养的狗狗</h1>
    <p class="page-subtitle">这些幸运的狗狗已经找到了温暖的家</p>
    
    <div v-if="adoptedDogs.length > 0" class="dogs-grid">
      <div v-for="dog in adoptedDogs" :key="dog.id" class="dog-card adopted-card">
        <div class="dog-image-container">
          <div class="image-wrapper">
            <img 
              :src="dog.image" 
              :alt="dog.name" 
              class="dog-image" 
              loading="lazy"
            />
          </div>
          <div class="adopted-badge">🏠 已收养</div>
        </div>
        
        <div class="dog-info">
          <h3 class="dog-name">{{ dog.name }}</h3>
          <p class="dog-breed">🐾 品种：{{ dog.breed }}</p>
          <p class="dog-age">🎂 年龄：{{ dog.age }} 岁</p>
          <p class="dog-gender">⚧ 性别：{{ dog.gender }}</p>
          
          <div class="success-message">
            💕 感谢爱心人士的收养！
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="no-adoptions">
      <div class="sad-icon">😔</div>
      <h2>还没有狗狗被收养</h2>
      <p>快去给可爱的狗狗们一个温暖的家吧！</p>
      <RouterLink to="/" class="browse-dogs">浏览所有狗狗</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useDogs } from '@/composables/useDogs';

const { adoptedDogs } = useDogs();
</script>

<style scoped>
.adopted-dogs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  text-align: center;
  color: #27ae60;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.page-subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 3rem;
}

.dogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.dog-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.adopted-card {
  border: 3px solid #27ae60;
  position: relative;
  overflow: hidden;
}

.adopted-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(46, 204, 113, 0.1));
  z-index: 1;
}

/* 图片容器样式 */
.dog-image-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 关键：创建1:1的宽高比 */
  overflow: hidden;
  background: #f8f9fa;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dog-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键：保持图片比例，裁剪多余部分 */
  object-position: center; /* 居中显示图片 */
  transition: transform 0.5s ease;
}

.dog-card:hover .dog-image {
  transform: scale(1.05);
}

.adopted-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  z-index: 3; /* 确保在最上层 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dog-info {
  padding: 1.5rem;
  position: relative;
  z-index: 2;
}

.dog-name {
  color: #27ae60;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.dog-breed,
.dog-age,
.dog-gender {
  color: #555;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.success-message {
  background: linear-gradient(135deg, #ffeaa7, #fab1a0);
  color: #d63031;
  padding: 0.75rem;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(250, 177, 160, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(250, 177, 160, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(250, 177, 160, 0);
  }
}

.no-adoptions {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.sad-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.no-adoptions h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.no-adoptions p {
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.browse-dogs {
  display: inline-block;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.browse-dogs:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
}

@media (max-width: 768px) {
  .dogs-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .adopted-dogs {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .dogs-grid {
    grid-template-columns: 1fr;
  }
  
  .dog-image-container {
    padding-top: 100%; /* 保持正方形 */
  }
}
</style>