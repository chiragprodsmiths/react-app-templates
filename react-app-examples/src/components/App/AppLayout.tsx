import { ReactComponent as Sample } from '@assets/icons/sample.svg';
import classNames from 'classnames';
import { NavLink, Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';

export default function AppLayout(): JSX.Element {
  const navigation = useNavigation();
  const loading = navigation.state === 'loading';

  return (
    <>
      <header className="flex items-center gap-x-10 p-4 bg-cyan-100">
        <Sample className="w-10 h-10" />
        <nav className="flex items-center gap-x-4 text-blue-500">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/defer">Defer Data</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </nav>
      </header>
      <main className="my-5 mx-4 bg-gray-50 min-h-[50%] p-4">
        <Outlet />
      </main>
      <div className={classNames('fixed inset-0 bg-gray-500/70 h-full w-full z-50', loading ? 'block' : 'hidden')} />
      <ScrollRestoration />
    </>
  );
}
