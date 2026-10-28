<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">用户登录</h2>
      <form @submit.prevent="handleLogin">
        
        <div class="form-group">
          <label class="form-label">用户名：</label>
          <input 
            type="text" 
            v-model="form.username" 
            required 
            placeholder="请输入用户名" 
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">密码：</label>
          <input
            type="password"
            v-model="form.password"
            required
            placeholder="请输入密码"
            autocomplete="current-password"
            class="form-input"
          />
        </div>
        
        <button type="submit" class="auth-btn">登录</button>
        
        <p class="auth-link">
          没有账号？<router-link to="/register">立即注册</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { RouterLink } from 'vue-router';

const router = useRouter();
const route = useRoute();
const form = ref({
  username: "",
  password: "",
});

const handleLogin = () => {
  // 从本地存储获取已注册用户
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  // 验证用户是否存在、密码是否正确
  const user = registeredUsers.find(
    (u) => u.username === form.value.username && u.password === form.value.password
  );
  
  if (!user) {
    alert("用户名或密码错误！");
    return;
  }
  
  // 登录成功：存储用户状态到本地存储
  localStorage.setItem("user", JSON.stringify(user));
  // 跳转到之前需要登录的页面（如收养申请页），无则跳首页
  const redirectPath = route.query.redirect || "/";
  router.push(redirectPath);
  alert(`欢迎回来，${user.username}！`);
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding: 2rem;
}

.auth-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
}

.auth-title {
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #ff9a9e;
}

.auth-btn {
  width: 100%;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%);
  color: #333;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.auth-btn:hover {
  box-shadow: 0 4px 12px rgba(255,154,158,0.4);
}

.auth-link {
  text-align: center;
  margin: 0;
  color: #666;
}

.auth-link a {
  color: #4a90e2;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>