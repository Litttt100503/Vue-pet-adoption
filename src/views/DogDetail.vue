<template>
  <div v-if="dog" class="dog-detail-container">
    <div class="dog-header">
      <img :src="dog.image" :alt="dog.name" class="dog-detail-image" />
      <div class="dog-info">
        <h2>{{ dog.name }}</h2>
        <div class="dog-meta">
          <div class="meta-item">
            <span class="meta-label">品种：</span>
            <span class="meta-value">{{ dog.breed }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">年龄：</span>
            <span class="meta-value">{{ dog.age }} 岁</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">性别：</span>
            <span class="meta-value">{{ dog.gender }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="dog-description">
      <h3>关于 {{ dog.name }}</h3>
      <p>{{ dog.description }}</p>
    </div>
    
    <div class="personality-tags">
      <h3>性格特点</h3>
      <div class="tags">
        <span v-for="trait in dog.personality" :key="trait" class="tag">
          {{ trait }}
        </span>
      </div>
    </div>
    
    <div class="action-buttons">
      <!-- 统一使用 dog.id 作为参数；已收养的狗狗禁用申请按钮 -->
      <router-link v-if="!dog.adopted" :to="{ name: 'ShenQing', params: { id: dog.id } }">
        <button class="adopt-btn">申请领养</button>
      </router-link>
      <button v-else class="adopt-btn" disabled>已被收养</button>
    </div>
  </div>

  <div v-else class="loading">
    <p>未找到该狗狗的信息</p>
    <router-link to="/" class="back-home">返回首页</router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDogs } from "@/composables/useDogs";

const route = useRoute();
const { getDogById } = useDogs();

// 响应式解析路由参数并查找对应狗狗（参数变化时自动更新）
const dog = computed(() => getDogById(route.params.id));
</script>

<style scoped>
.dog-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.dog-header {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
}

.dog-detail-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
}

.dog-info h2 {
  font-size: 2.5rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.dog-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-label {
  font-weight: 600;
  color: #666;
}

.meta-value {
  color: #333;
}

.dog-description {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
}

.dog-description h3 {
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.personality-tags {
  margin: 2rem 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: #ffeaa7;
  color: #333;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.action-buttons {
  text-align: center;
  margin-top: 2rem;
}

.adopt-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #ff6b6b, #ffd93d);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.adopt-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.adopt-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.back-home {
  display: inline-block;
  margin-top: 1rem;
  color: #4a90e2;
  text-decoration: none;
}

.back-home:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 768px) {
  .dog-header {
    flex-direction: column;
    text-align: center;
  }
  
  .dog-detail-image {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
}
</style>