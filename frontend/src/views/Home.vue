<template>
  <div class="home-container">
    <el-header class="header">
      <h3>用户管理系统</h3>
      <div class="user-info">
        <span>{{ userStore.userInfo?.nickname || userStore.userInfo?.username }}</span>
        <el-button type="danger" size="small" @click="handleLogout">退出登录</el-button>
      </div>
    </el-header>
    
    <el-main>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>用户列表</span>
            <el-button type="primary" @click="loadUsers">刷新</el-button>
          </div>
        </template>
        
        <el-table :data="users" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="createdAt" label="创建时间" />
        </el-table>
      </el-card>
    </el-main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const users = ref([
  { id: 1, username: 'admin', email: 'admin@example.com', createdAt: '2024-01-01 10:00:00' },
  { id: 2, username: 'user1', email: 'user1@example.com', createdAt: '2024-01-02 11:00:00' },
  { id: 3, username: 'user2', email: 'user2@example.com', createdAt: '2024-01-03 12:00:00' }
])

const loadUsers = async () => {
  loading.value = true
  // 模拟加载数据，实际项目中调用 API
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const handleLogout = () => {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
}

onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
