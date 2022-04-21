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

const githubApiBase = 'https://api.github.com'

export function getUser(username: string) {
  return githubApi(`/users/${username}`)
}

export function getUserRepos(username: string) {
  return githubApi(`/users/${username}/repos?sort=updated`)
}

export function getRepo(owner: string, repo: string) {
  return githubApi(`/repos/${owner}/${repo}`)
}

export function getRepoReadme(owner: string, repo: string) {
  return githubApi(`/repos/${owner}/${repo}/readme`)
}

async function githubApi(path: string) {
  const res = await fetch(githubApiBase + path, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/vnd.github.VERSION.raw; charset=utf-8',
    }),
  })
  if (!res.ok) {
    throw new Error('ss')
  }
  const data = await res.json()
  return data
}
