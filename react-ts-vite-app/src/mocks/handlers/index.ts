import { loginHandlers } from '@mocks/handlers/login';
import { postHandlers } from '@mocks/handlers/posts';

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [...postHandlers, ...loginHandlers];
