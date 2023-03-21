

import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Home = lazy(()=>import('@/pages/Home'))
const NotFind = lazy(() => import('@/pages/NotFound'))
const Test = lazy(()=>import('@/pages/Test'))
const BasicLayout = lazy(()=>import('@/layout'))
const routes = [
  {
    path: '/', component: BasicLayout,  routes: [
      { path: '/', exact: true,render: () => <Redirect to={'/home'} /> },
      { path: '/home', exact: true, component: Home },
      { path: '/test', exact: true, component: Test },
    ]
  },
  { path: '/404', exact: true, component: NotFind }
]


export default routes
