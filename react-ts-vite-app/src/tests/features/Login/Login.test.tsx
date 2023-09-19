import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import Login from '@features/Login';
import { loginAction } from '@api/login';

function renderRouter() {
  const routes = [
    {
      path: 'login',
      element: (
        <HelmetProvider>
          <Login />
        </HelmetProvider>
      ),
      action: loginAction
    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/login']
  });

  render(<RouterProvider router={router} />);
  return;
}

describe('Login', () => {
  it('should render successfully', async () => {
    renderRouter();
    await waitFor(() => screen.getByText('Login here'));
    expect(screen.getByText('Login here')).toBeDefined();
  });

  it('should render success message', async () => {
    renderRouter();
    await waitFor(() => screen.getByText('Login here'));
    await userEvent.type(screen.getByPlaceholderText('Username'), 'kalagato');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'kalagatopassword');
    await userEvent.click(screen.getByText('Login'));
    await waitFor(() => screen.getByText('link generated'));
    expect(screen.getByText('link generated')).toBeDefined();
  });

  it('should render client side error message', async () => {
    renderRouter();
    await waitFor(() => screen.getByText('Login here'));
    await userEvent.click(screen.getByText('Login'));
    await waitFor(() => screen.getByText('Please enter username client side error'));
    expect(screen.getByText('Please enter username client side error')).toBeDefined();
    expect(screen.getByText('Please enter password client side error')).toBeDefined();
  });

  it('should render server side error message', async () => {
    renderRouter();
    await waitFor(() => screen.getByText('Login here'));
    await userEvent.type(screen.getByPlaceholderText('Username'), 'wrong');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'simple');
    await userEvent.click(screen.getByText('Login'));
    await waitFor(() => screen.getByText('Please enter username server side error'));
    expect(screen.getByText('Please enter username server side error')).toBeDefined();
    expect(screen.getByText('Please enter password server side error')).toBeDefined();
  });

  it('should render multiple server side error message', async () => {
    renderRouter();
    await waitFor(() => screen.getByText('Login here'));
    await userEvent.type(screen.getByPlaceholderText('Username'), 'wrong multiple');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'simple multiple');
    await userEvent.click(screen.getByText('Login'));
    await waitFor(() => screen.getByText('Please enter username server side error 1'));
    expect(screen.getByText('Please enter username server side error 1')).toBeDefined();
    expect(screen.getByText('Please enter username server side error 2')).toBeDefined();
    expect(screen.getByText('Please enter password server side error 1')).toBeDefined();
    expect(screen.getByText('Please enter password server side error 2')).toBeDefined();
  });
});
