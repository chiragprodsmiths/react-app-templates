import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import PageTransition from '@features/FramerMotion/PageTransition';
import type { FetchGhostsResult } from '@api/ghosts';
import { IGhost } from '@entities/ghosts';
import ApiError from '@features/DeferLoading/ApiError';

export default function DeferLoading(): JSX.Element {
  const { ghosts } = useLoaderData() as FetchGhostsResult;

  return (
    <PageTransition>
      <div className="space-y-5">
        <div className="flex items-center gap-x-5">
          <span>So, a list of ghost will be displayed here</span>
          <button
            type="button"
            onClick={() => {
              alert('hello');
            }}
          >
            Hello
          </button>
        </div>
        <Suspense fallback={<div>loading.....</div>}>
          <Await resolve={ghosts} errorElement={<ApiError />}>
            {(list: IGhost[]) => (
              <ul>
                {list.map((ghost) => (
                  <li key={ghost.id}>{ghost.title}</li>
                ))}
              </ul>
            )}
          </Await>
        </Suspense>
      </div>
    </PageTransition>
  );
}
