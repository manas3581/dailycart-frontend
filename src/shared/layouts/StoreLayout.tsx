import { Suspense } from 'react'
import { Outlet } from 'react-router'

export function StoreLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  )
}
