import { ComponentType } from 'react'
import { Outlet } from 'react-router-dom'

type ContextLayoutProps = {
  provider: ComponentType<any>
}

function ContextLayout({ provider: Component } : ContextLayoutProps) {
  return (
    <>
      <Component>
        <Outlet />
      </Component>
    </>
  )
}

export default ContextLayout