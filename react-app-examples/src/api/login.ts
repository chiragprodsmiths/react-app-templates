import { json, type ActionFunctionArgs } from 'react-router-dom';

import type { ILoginForm, ILoginFormErrors } from '@entities/login';
import { loginValidationSchema } from '@validations/login';

import { API_URL } from './constants';
import { validateForm } from '@utils/form';

export async function loginAction({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const formData = Object.fromEntries(form) as unknown as ILoginForm;
  const formErrors: ILoginFormErrors | undefined = await validateForm<ILoginForm>(formData, loginValidationSchema);

  if (formErrors) {
    return json({ data: null, errors: formErrors }, { status: 400 });
  }

  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    return response.json();
  }

  if (response.status === 400) {
    return response.json();
  }

  return Promise.reject(response);
}
