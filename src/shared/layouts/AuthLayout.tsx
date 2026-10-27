import { Suspense } from 'react'
import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  )
}
