<template>
  <div class="adoption-form-page">
    <div class="form-container">
      <h1 class="page-title">💖 收养申请表</h1>
      
      <div v-if="selectedDog" class="selected-dog-info">
        <div class="dog-card">
          <img :src="selectedDog.image" :alt="selectedDog.name" class="dog-image" />
          <div class="dog-details">
            <h3>您要收养的狗狗：{{ selectedDog.name }}</h3>
            <p>品种：{{ selectedDog.breed }}</p>
            <p>年龄：{{ selectedDog.age }} 岁</p>
            <p>性别：{{ selectedDog.gender }}</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitAdoptionForm" class="adoption-form">
        <div class="form-section">
          <h3>👤 个人信息</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="name">姓名 *</label>
              <input 
                id="name"
                v-model="formData.name" 
                type="text" 
                required 
                placeholder="请输入您的姓名"
              >
            </div>
            <div class="form-group">
              <label for="phone">电话 *</label>
              <input 
                id="phone"
                v-model="formData.phone" 
                type="tel" 
                required 
                placeholder="请输入您的联系电话"
              >
            </div>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input 
                id="email"
                v-model="formData.email" 
                type="email" 
                placeholder="请输入您的邮箱"
              >
            </div>
            <div class="form-group">
              <label for="address">居住地址 *</label>
              <input 
                id="address"
                v-model="formData.address" 
                type="text" 
                required 
                placeholder="请输入您的详细地址"
              >
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>🏠 居住环境</h3>
          <div class="form-group">
            <label>居住类型 *</label>
            <div class="radio-group">
              <label class="radio-option">
                <input v-model="formData.residenceType" type="radio" value="apartment" required>
                <span>公寓</span>
              </label>
              <label class="radio-option">
                <input v-model="formData.residenceType" type="radio" value="house" required>
                <span>独栋房屋</span>
              </label>
              <label class="radio-option">
                <input v-model="formData.residenceType" type="radio" value="other" required>
                <span>其他</span>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="experience">养宠经验</label>
            <textarea 
              id="experience"
              v-model="formData.experience" 
              rows="3" 
              placeholder="请描述您之前的养宠经验（如无经验可留空）"
            ></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3>💝 收养承诺</h3>
          <div class="checkbox-group">
            <label class="checkbox-option">
              <input v-model="formData.agreements.care" type="checkbox" required>
              <span>我承诺会为狗狗提供充足的食物、水和医疗照顾</span>
            </label>
            <label class="checkbox-option">
              <input v-model="formData.agreements.love" type="checkbox" required>
              <span>我承诺会给狗狗足够的关爱和陪伴</span>
            </label>
            <label class="checkbox-option">
              <input v-model="formData.agreements.forever" type="checkbox" required>
              <span>我承诺会对狗狗负责到底，不离不弃</span>
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="goBack" class="back-button">← 返回</button>
          <button type="submit" class="submit-button" :disabled="submitting">
            {{ submitting ? '正在提交...' : '提交收养申请' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDogs } from '@/composables/useDogs'

const router = useRouter()
const route = useRoute()
const { getDogById, adopt } = useDogs()
const selectedDog = ref(null)
const submitting = ref(false)
const formData = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  residenceType: '',
  experience: '',
  agreements: {
    care: false,
    love: false,
    forever: false
  }
})

onMounted(() => {
  // 从路由参数获取狗狗ID
  const foundDog = getDogById(route.params.id)

  if (!foundDog) {
    alert('未找到狗狗信息，请重新选择')
    router.push('/')
    return
  }

  if (foundDog.adopted) {
    alert('这只狗狗已经被收养了')
    router.push('/')
    return
  }

  selectedDog.value = foundDog
})

const submitAdoptionForm = () => {
  if (submitting.value) return

  // 验证表单
  if (!formData.value.name || !formData.value.phone || !formData.value.address || !formData.value.residenceType) {
    alert('请填写所有必填字段')
    return
  }

  if (!formData.value.agreements.care || !formData.value.agreements.love || !formData.value.agreements.forever) {
    alert('请确认所有收养承诺')
    return
  }

  if (!selectedDog.value) {
    alert('请先选择要收养的狗狗')
    return
  }

  submitting.value = true
  // 更新收养状态并写入收养记录（统一由数据层处理）
  const success = adopt(selectedDog.value.id, formData.value)

  if (success) {
    alert(`🎉 恭喜您！收养申请提交成功！\n我们会在3个工作日内联系您。`)
    // 跳转到已收养页面
    router.push('/AdoptedDogs')
  } else {
    submitting.value = false
    alert('该狗狗已被收养或信息有误，请刷新页面重试')
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.adoption-form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.form-container {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.page-title {
  text-align: center;
  color: #ff6b6b;
  margin-bottom: 2rem;
  font-size: 2.2rem;
}

.selected-dog-info {
  margin-bottom: 2rem;
}

.dog-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  border: 2px solid #ff6b6b;
}

.dog-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 15px;
}

.dog-details h3 {
  color: #ff6b6b;
  margin-bottom: 0.5rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f1f3f4;
}

.form-section h3 {
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6b6b;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-option,
.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-option input,
.checkbox-option input {
  width: auto;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.back-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #6c757d;
  background: white;
  color: #6c757d;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #6c757d;
  color: white;
}

.submit-button {
  padding: 0.75rem 2rem;
  border: none;
  background: linear-gradient(135deg, #ff6b6b, #ffd93d);
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .dog-card {
    flex-direction: column;
    text-align: center;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>