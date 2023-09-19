import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { server } from '@mocks/server';
import { getFailure } from '@mocks/handlers/posts';
import { fetchHomeData } from '@api/home';
import Home from '@features/Home';
import PageError from '@features/Home/components/PageError';

function renderRouter(loader?: () => Promise<void>) {
  const routes = [
    {
      path: '/',
      element: <Home />,
      loader: loader ?? fetchHomeData,
      errorElement: <PageError />
    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/']
  });

  render(<RouterProvider router={router} />);
  return;
}

describe('Home', () => {
  it('should render successfully', async () => {
    renderRouter();
    await waitFor(() => screen.getByText('Home text here'));
    expect(screen.getByText('Home text here')).toBeDefined();
  });

  it('should render error element when api fails', async () => {
    server.use(getFailure);
    renderRouter();
    await waitFor(() => screen.getByText('400 Bad Request Failed to fetch posts'));
    expect(screen.getByText('400 Bad Request Failed to fetch posts')).toBeDefined();
  });

  it('should render error element for custom thrown error', async () => {
    server.use(getFailure);
    renderRouter(() => Promise.reject(new Error('Post 10 not found')));
    await waitFor(() => screen.getByText('Post 10 not found'));
    expect(screen.getByText('Post 10 not found')).toBeDefined();
  });
});
