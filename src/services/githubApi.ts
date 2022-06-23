import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const ONE_MINUTE = 1000 * 60
const cache = setupCache({
  maxAge: ONE_MINUTE * 10,
  exclude: {
    query: false,
  },
})

const ghApi = axios.create({
  baseURL: 'https://api.github.com',
  adapter: cache.adapter,
})

ghApi.interceptors.response.use((response) => {
  if (response.status < 200 || response.status > 299) {
    throw new Error('AXIOOOOS error')
  }
  return response.data
})

export default ghApi
