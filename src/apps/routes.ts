import { createBrowserRouter } from 'react-router'
import { AuthLayout } from '../shared/layouts/AuthLayout'
import { StoreLayout } from '../shared/layouts/StoreLayout'
import { authRoutes } from '../routes/auth.routes'
import { storeRoutes } from '../routes/store.routes'

export const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: authRoutes,
  },
  {
    Component: StoreLayout,
    children: storeRoutes,
  },
])
