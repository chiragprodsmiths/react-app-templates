import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

interface ErrorData {
  message?: string;
}

export default function PageError(): JSX.Element {
  const error = useRouteError();
  let errorMessage = '';
  let errorInfo: ErrorData | undefined;

  if (isRouteErrorResponse(error)) {
    errorInfo = error.data as ErrorData;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="text-red-400">
      <h1 className="text-2xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>
        {isRouteErrorResponse(error)
          ? error.status + ' ' + error.statusText + ' ' + errorInfo?.message || ''
          : errorMessage}
      </i>
    </div>
  );
}
