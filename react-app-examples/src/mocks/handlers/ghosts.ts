import { rest } from 'msw';
import ghosts from '@mocks/fixtures/ghosts.json';
import { API_URL } from '@mocks/constants';

// Define handlers that catch the corresponding requests and returns the mock data.

export const getSuccess = rest.get(`${API_URL}/ghosts/`, async (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(ghosts));
});

export const getFailure = rest.get(`${API_URL}/ghosts/`, (_, res, ctx) => {
  return res(ctx.status(400), ctx.json({ message: 'Failed to fetch ghosts' }));
});

export const getFailureThrown = rest.get(`${API_URL}/ghosts/`, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(ghosts));
});

export const ghostsHandlers = [getSuccess];
