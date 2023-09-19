import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// import { AppLayout, AppError } from '@components/Layouts';
import { AppLayout, AppError, NotFound } from '@components/App';
import Login from '@features/Login';
import Logout from '@features/Logout';

import Home from '@features/Home';
import HomePageError from '@features/Home/components/PageError';
import { fetchHomeData } from '@api/home';
import { loginAction } from '@api/login';

/**
 * The application's routes.
 */

export default function getRouter() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<AppLayout />} errorElement={<AppError />}>
          <Route index element={<Home />} loader={fetchHomeData} errorElement={<HomePageError />} />
          <Route path="login" element={<Login />} action={loginAction} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>
    )
  );
}
