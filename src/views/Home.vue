<template>
  <div class="home-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>🐕狗狗列表</h3>
        <p>点击查看详情</p>
      </div>
      <div class="dogs-list">
        <div 
          v-for="dog in dogs" 
          :key="dog.id" 
          class="dog-item"
          :class="{ active: selectedDog && selectedDog.id === dog.id }"
          @click="selectDog(dog)"
        >
          <img :src="dog.image" :alt="dog.name" class="dog-avatar" />
          <div class="dog-info">
            <h4 class="dog-name">{{ dog.name }}</h4>
            <p class="dog-breed">{{ dog.breed }}</p>
            <span :class="['status-dot', dog.adopted ? 'adopted' : 'available']"></span>
          </div>
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <div v-if="selectedDog" class="dog-detail-card">
        <div class="dog-hero">
          <img :src="selectedDog.image" :alt="selectedDog.name" class="dog-hero-img" />
          <div :class="['adoption-badge', selectedDog.adopted ? 'adopted' : 'available']">
            {{ selectedDog.adopted ? '🏠 已收养' : '💝 待收养' }}
          </div>
        </div>
        
        <div class="dog-details">
          <div class="dog-header">
            <h2 class="dog-title">{{ selectedDog.name }}</h2>
            <div class="dog-gender">
              {{ selectedDog.gender === '公' ? '♂' : '♀' }}
            </div>
          </div>
          
          <div class="dog-meta">
            <div class="meta-item">
              <span class="meta-label">品种</span>
              <span class="meta-value">{{ selectedDog.breed }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">年龄</span>
              <span class="meta-value">{{ selectedDog.age }} 岁</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">性别</span>
              <span class="meta-value">{{ selectedDog.gender }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">性格特点</span>
              <span class="meta-value">
                <span 
                  v-for="(trait, index) in selectedDog.personality" 
                  :key="index"
                  class="personality-tag"
                >
                  {{ trait }}
                </span>
              </span>
            </div>
          </div>
          
          <div class="action-buttons">
            <router-link 
              :to="{ name: 'DogDetail', params: { id: selectedDog.id } }" 
              class="btn btn-primary"
            >
              <i class="fas fa-info-circle"></i> 查看详细信息
            </router-link>
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDogs } from '@/composables/useDogs'

const { dogs } = useDogs()
const selectedDog = ref(null)

// 选择狗狗
const selectDog = (dog) => {
  selectedDog.value = dog
}

// 默认选择第一只推荐狗狗
onMounted(() => {
  selectedDog.value = dogs.find((dog) => dog.featured) || dogs[0] || null
})
</script>

<style scoped>
.home-layout {
  display: flex;
  min-height: 80vh;
  gap: 2rem;
  margin-top: 1rem;
}

/* 侧边栏样式 */
.sidebar {
  width: 400px;
  background: rgba(249, 247, 246, 0.7);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.15);
}

.sidebar-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 107, 107, 0.2);
}

.sidebar-header h3 {
  color: #ff6b6b;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.sidebar-header p {
  color: #666;
  font-size: 0.9rem;
}

.dogs-list {
  display: flex;
  margin: auto;
  flex-direction: column;
  gap: 0.8rem;
}

.dog-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.dog-item:hover {
  transform: translateX(5px);
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dog-item.active {
  background: linear-gradient(135deg, #ff6b6b, #ffd93d);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #fc4b4b;
}

.dog-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 3px solid #ff9a9e;
}

.dog-info {
  flex: 1;
  position: relative;
}

.dog-name {
  margin: 0 0 0.3rem 0;
  color: #333;
  font-size: 1.1rem;
}

.dog-breed {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
}

/* 收养状态圆点样式 */
.status-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.status-dot.available {
  background: #4cd964;
  animation: pulse 2s infinite;
}

.status-dot.adopted {
  background: #95a5a6;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 217, 100, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 6px rgba(76, 217, 100, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 217, 100, 0);
  }
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.dog-detail-card {
  background: rgba(249, 247, 246, 0.7);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: all 0.3s ease;
}

.dog-detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.dog-hero {
  position: relative;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
}

.dog-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dog-detail-card:hover .dog-hero-img {
  transform: scale(1.05);
}

/* 收养状态徽章样式 */
.adoption-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid white;
  animation: float 3s ease-in-out infinite;
}

.adoption-badge.available {
  background: linear-gradient(135deg, #4cd964, #2ecc71);
  color: white;
}

.adoption-badge.adopted {
  background: rgba(249, 247, 246, 0.9);
  color: #555;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.dog-details {
  padding: 2rem;
}

.dog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dog-title {
  font-size: 2.2rem;
  color: #fd852e;
  margin: 0;
}

.dog-gender {
  font-size: 2rem;
  color: #666;
}

.dog-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.3rem;
}

.meta-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
}

.personality-tag {
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  margin-right: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn-primary {
  background: linear-gradient(135deg, #ffe139 0%, #f34d20 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    order: 2;
  }
  
  .main-content {
    order: 1;
  }
  
  .dog-meta {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }

  .adoption-badge {
    top: 1rem;
    right: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>