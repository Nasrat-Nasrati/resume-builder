// ===========================
// src/auth/context/jwt/auth-provider.tsx
// ===========================

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      // ✅ قبلاً از sessionStorage می‌خواند؛ ولی setSession در localStorage ذخیره می‌کند
      const accessToken = localStorage.getItem(JWT_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        // هدر Authorization را روی axios ست کن
        setSession(accessToken);

        // ✅ این endpoint را در src/lib/axios طوری تنظیم کن که با بک‌اندت یکی باشد
        // مثلا JHipster:  endpoints.auth.me = '/api/account'
        const res = await axios.get(endpoints.auth.me);

        // بعضی بک‌اندها { user: {...} } می‌دهند، بعضی‌ها خود یوزر را برمی‌گردانند
        const raw = (res.data && (res.data.user ?? res.data)) || null;

        if (!raw) {
          throw new Error('User payload is empty');
        }

        const user = {
          id: raw.id ?? raw.login ?? raw.username,
          displayName: raw.displayName ?? raw.name ?? raw.login ?? raw.username,
          email: raw.email,
          role: raw.role ?? (Array.isArray(raw.authorities) ? raw.authorities[0] : undefined),
          photoURL: raw.photoURL ?? raw.imageUrl,
          accessToken,
        };

        setState({
          user,
          loading: false,
        });
      } else {
        // توکن نداریم یا نامعتبر است ⇒ کاربر لاگین نیست
        setSession(null);
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error('checkUserSession error:', error);
      setSession(null);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const status = state.loading
    ? 'loading'
    : state.user
      ? 'authenticated'
      : 'unauthenticated';

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
