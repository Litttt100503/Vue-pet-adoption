<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">用户注册</h2>
      <form @submit.prevent="handleRegister">
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
            placeholder="请输入密码（至少6位）"
            minlength="6"
            autocomplete="new-password"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">确认密码：</label>
          <input
            type="password"
            v-model="form.confirmPwd"
            required
            placeholder="请再次输入密码"
            autocomplete="new-password"
            class="form-input"
          />
        </div>
        
        <button type="submit" class="auth-btn">注册</button>
        
        <p class="auth-link">
          已有账号？<router-link to="/login">立即登录</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RouterLink } from 'vue-router';

const router = useRouter();
const form = ref({
  username: "",
  password: "",
  confirmPwd: "",
});

const handleRegister = () => {
  // 验证密码一致性
  if (form.value.password !== form.value.confirmPwd) {
    alert("两次密码输入不一致！");
    return;
  }
  
  // 验证密码长度
  if (form.value.password.length < 6) {
    alert("密码长度不能少于6位！");
    return;
  }
  
  // 验证用户名
  if (!form.value.username.trim()) {
    alert("用户名不能为空！");
    return;
  }

  // 从本地存储获取已注册用户（无则初始化空数组）
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

  // 验证用户名是否已存在
  const userExists = registeredUsers.some((u) => u.username === form.value.username);
  if (userExists) {
    alert("用户名已被占用！");
    return;
  }
  
  // 保存新用户到本地存储
  registeredUsers.push({
    username: form.value.username,
    password: form.value.password,
  });
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));//JSON.stringify转成json
  
  // 注册成功，跳转到登录页
  alert("注册成功！请登录");
  router.push("/login");
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
  border-color: #84fab0;
}

.auth-btn {
  width: 100%;
  background: linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%);
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
  box-shadow: 0 4px 12px rgba(132,250,176,0.4);
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