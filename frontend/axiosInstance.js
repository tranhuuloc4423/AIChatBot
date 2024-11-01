import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://172.16.65.29:3000',
  baseURL: 'https://aichatbot-smoky.vercel.app',
  // baseURL:
  //   'https://aichatbot-git-master-tranhuuloc4423s-projects.vercel.app/?vercelToolbarCode=zRFiyvtTt_uS9UV',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
