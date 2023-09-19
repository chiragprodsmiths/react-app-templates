import { API_URL } from './constants';

export async function fetchHomeData() {
  const response = await fetch(`${API_URL}/posts/`, {
    method: 'GET'
  });
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}
