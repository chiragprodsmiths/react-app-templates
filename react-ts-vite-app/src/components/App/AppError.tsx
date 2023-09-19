import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function AppError(): JSX.Element {
  const error = useRouteError();

  return (
    <div className="mx-auto my-10 flex w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-medium">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isRouteErrorResponse(error) ? error.status + error.statusText + error.data : 'Unknown Error'}</i>
      </p>
    </div>
  );
}
