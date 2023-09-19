import { defer } from 'react-router-dom';

import { IGhost } from '@entities/ghosts';
import { API_URL } from './constants';
import { sleep } from '@mocks/utils';

export interface FetchGhostsResult {
  ghosts: Promise<IGhost[]>;
}

export function fetchGhosts() {
  const promise = fetch(`${API_URL}/ghosts/`, {
    method: 'GET'
  }).then(async (response) => {
    await sleep(4000);
    return response.json();
  });
  return defer({ ghosts: promise });
}
