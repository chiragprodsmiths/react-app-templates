import { sleep } from '@mocks/utils';

import { API_URL } from './constants';

export async function fetchHomeData() {
  await sleep(4000);
  const response = await fetch(`${API_URL}/posts/`, {
    method: 'GET'
  });
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}
