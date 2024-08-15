import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces';
import { AuthStatus } from '../interfaces/auth.status.enum';
import { LoginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { checkAuthAction } from '../actions/check-auth.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await LoginAction(email, password);

      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    try {
      const registerResp = await registerAction(email, password, fullName);

      if (!registerResp.ok) {
        logout();
        return { ok: false, message: registerResp.message };
      }

      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return {
        ok: true,
        message: 'Registro completado exitosamente',
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Error al registrar el usuario',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      user.value = statusResp.user;
      token.value = statusResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),

    //Todo: Saber si es administrador o no

    username: computed(() => user.value?.fullName),

    //actions
    login,
    register,
    checkAuthStatus,
    logout,
  };
});
