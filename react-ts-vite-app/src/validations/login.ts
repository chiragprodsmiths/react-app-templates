import type { ILoginForm } from '@entities/login';
import { object, string, ObjectSchema } from 'yup';

export const loginValidationSchema: ObjectSchema<ILoginForm> = object({
  username: string().nullable().required('Please enter username client side error'),
  password: string().nullable().required('Please enter password client side error')
});
