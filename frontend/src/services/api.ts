export async function api(path: string, init?: RequestInit) {
    const baseURL = 'http://localhost:8000/'
    const url = new URL(path, baseURL)
  
      init = init || {}
      init.headers = {
        'Content-Type': 'application/json',
        ...init.headers,
      }
  
    const response = await fetch(url, init)
  
    return response
}