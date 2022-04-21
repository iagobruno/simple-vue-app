import axios from 'axios'

const ghApi = axios.create({
  baseURL: 'https://api.github.com',
})

ghApi.interceptors.response.use((response) => {
  if (response.status < 200 || response.status > 299) {
    throw new Error('AXIOOOOS error')
  }
  return response.data
})

export default ghApi
