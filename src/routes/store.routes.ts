import type { RouteObject } from 'react-router'
import { paths } from '../shared/constants/paths'

export const storeRoutes: RouteObject[] = [
  {
    path: paths.home,
    lazy: async () => {
      const { default: HomePage } = await import('../pages/home/home')
      return { Component: HomePage }
    },
  },
]
