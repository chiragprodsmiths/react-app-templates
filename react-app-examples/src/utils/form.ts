import * as yup from 'yup';

export type IFormErrors<K> = { [key in keyof K]?: string | string[] };

export async function validateForm<T>(formData: T, validationSchema: yup.Schema): Promise<IFormErrors<T> | undefined> {
  let formErrors: IFormErrors<T>;
  try {
    await validationSchema.validate(formData, { abortEarly: false });
  } catch (error) {
    const errors = error as yup.ValidationError;
    formErrors = errors.inner.reduce<IFormErrors<T>>((acc, err) => {
      acc[err.path as keyof T] = err.errors;
      return acc;
    }, {});
    return formErrors;
  }
}
