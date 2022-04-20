const githubApiBase = 'https://api.github.com'

export function getUser(username: string) {
  return githubApi(`/users/${username}`)
}

export function getUserRepos(username: string) {
  return githubApi(`/users/${username}/repos?sort=updated`)
}

async function githubApi(path: string) {
  const res = await fetch(githubApiBase + path)
  if (!res.ok) {
    throw new Error('ss')
  }
  const data = await res.json()
  return data
}
