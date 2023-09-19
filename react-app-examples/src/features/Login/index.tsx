import { useCallback } from 'react';
import { Form, useActionData, useNavigation, useRevalidator } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import type { ILoginActionData } from '@entities/login';
import PageTransition from '@features/FramerMotion/PageTransition';

function ErrorMessage({ message }: { message: string | string[] }) {
  const messages = Array.isArray(message) ? message : [message];
  return (
    <div className="text-red-500">
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  );
}

export default function Login(): JSX.Element {
  const revalidator = useRevalidator();
  const navigationState = useNavigation();
  const actionsData = useActionData() as ILoginActionData | undefined;
  const errors = actionsData?.errors;
  const submitting = navigationState.state === 'submitting';

  const onFormChange = useCallback(() => {
    revalidator.revalidate();
  }, [revalidator]);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <PageTransition>
        <div className="space-y-5 bg-gray-300 p-5">
          <h1>Login here</h1>
          <Form id="login-form" method="post" className="space-y-5" onChange={onFormChange}>
            <div>
              <div className="flex items-center gap-x-5 relative">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Username" autoComplete="username" />
              </div>
              {errors?.username && <ErrorMessage message={errors.username} />}
            </div>
            <div>
              <div className="flex items-center gap-x-5">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
              {errors?.password && <ErrorMessage message={errors.password} />}
            </div>
            <button type="submit" className="p-2 border flex items-center space-x-2" disabled={submitting}>
              <span>Login</span>
              {submitting && <span className="animate-spin">🔄</span>}
            </button>
          </Form>
          {!errors && actionsData && <div>link generated</div>}
        </div>
      </PageTransition>
    </>
  );
}
