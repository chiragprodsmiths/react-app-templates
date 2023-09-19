import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { AppLayout, AppError, NotFound } from '@components/App';

import Home from '@features/Home';
import HomePageError from '@features/Home/components/PageError';
import { fetchHomeData } from '@api/posts';

import Login from '@features/Login';
import { loginAction } from '@api/login';

import Logout from '@features/Logout';

import DeferLoading from '@features/DeferLoading';
import { fetchGhosts } from '@api/ghosts';

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
          <Route path="defer" element={<DeferLoading />} loader={fetchGhosts} />
          <Route path="login" element={<Login />} action={loginAction} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>
    )
  );
}
