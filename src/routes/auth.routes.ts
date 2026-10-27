import type { RouteObject } from 'react-router'
import { paths } from '../shared/constants/paths'

export const authRoutes: RouteObject[] = [
  {
    path: paths.login,
    lazy: async () => {
      const { default: LoginPage } = await import('../pages/login/login')
      return { Component: LoginPage }
    },
  },
  {
    path: paths.register,
    lazy: async () => {
      const { default: RegisterPage } = await import('../pages/register/register')
      return { Component: RegisterPage }
    },
  },
]
