import { rest } from 'msw';
import { API_URL } from '@mocks/constants';
import { ILoginForm } from '@entities/login';

// Define handlers that catch the corresponding requests and returns the mock data.
export const loginHandlers = [
  rest.post(`${API_URL}/login/`, async (req, res, ctx) => {
    const { username, password } = await req.json<ILoginForm>();
    if (username === 'wrong' && password === 'simple') {
      return res(
        ctx.status(400),
        ctx.json({
          errors: {
            username: 'Please enter username server side error',
            password: 'Please enter password server side error'
          }
        })
      );
    }
    if (username === 'wrong multiple' && password === 'simple multiple') {
      return res(
        ctx.status(400),
        ctx.json({
          errors: {
            username: ['Please enter username server side error 1', 'Please enter username server side error 2'],
            password: ['Please enter password server side error 1', 'Please enter password server side error 2']
          }
        })
      );
    }

    return res(ctx.status(200), ctx.json({ link: 'https://www.google.com' }));
  })
];
