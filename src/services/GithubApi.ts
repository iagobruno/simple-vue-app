import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import type { Endpoints } from '@octokit/types'

const ONE_MINUTE = 1000 * 60
const cache = setupCache({
  maxAge: ONE_MINUTE * 10,
  exclude: {
    query: false,
  },
})

export const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  adapter: cache.adapter,
})

export default {
  getByUsername(username: string) {
    return githubAPI
      .get(`/users/${username}`)
      .then((res) => res.data as GithubUser)
  },

  getReposFromUser(username: string) {
    return githubAPI
      .get(`/users/${username}/repos?sort=updated`)
      .then((res) => res.data as GithubReposList)
  },

  getRepo(username: string, reponame: string) {
    return githubAPI
      .get(`/repos/${username}/${reponame}`)
      .then((res) => res.data as GithubRepo)
  },

  getReadme(username: string, reponame: string) {
    return githubAPI
      .get(`/repos/${username}/${reponame}/readme`, {
        headers: {
          Accept: 'application/vnd.github.VERSION.raw',
        },
      })
      .then((res) => res.data as string)
  },
}

type GithubUser = Endpoints['GET /users/{username}']['response']['data']
type GithubReposList =
  Endpoints['GET /users/{username}/repos']['response']['data']
type GithubRepo = Endpoints['GET /repos/{owner}/{repo}']['response']['data']
