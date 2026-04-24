import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7001/api',
  timeout: 5000
})

// 请求拦截器，添加 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function login(username, password) {
  // 模拟登录接口（实际项目中替换为真实 API）
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        resolve({
          code: 200,
          data: {
            token: 'mock-token-' + Date.now(),
            userInfo: { username, nickname: '管理员' }
          },
          message: '登录成功'
        })
      } else {
        reject(new Error('用户名或密码错误'))
      }
    }, 500)
  })
}

export function getUserList() {
  return api.get('/users')
}

export default api
