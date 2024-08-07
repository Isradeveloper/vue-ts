import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (
  email: string,
  password: string,
  fullName: string,
): Promise<RegisterSuccess | RegisterError> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: (error as Error).toString(),
    };
    // throw new Error('Ha ocurrido un problema al momento de hacer la petición');
  }
};
