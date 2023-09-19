import { rest } from 'msw';
import posts from '@mocks/fixtures/posts.json';
import { API_URL } from '@mocks/constants';

// Define handlers that catch the corresponding requests and returns the mock data.

export const getSuccess = rest.get(`${API_URL}/posts/`, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(posts));
});

export const getFailure = rest.get(`${API_URL}/posts/`, (_, res, ctx) => {
  return res(ctx.status(400), ctx.json({ message: 'Failed to fetch posts' }));
});

export const getFailureThrown = rest.get(`${API_URL}/posts/`, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(posts));
});

export const postHandlers = [getSuccess];
