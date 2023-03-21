import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch } from "react-router-dom";
import {  Spin } from 'antd'
import routes from './routes';
import renderRoutes from './routes/renderRoutes';

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div style={{ width: '100%', height: '100%', background: "rgba(245, 251, 251, 0.9)", textAlign: "center", paddingTop: '30%' }}> <Spin /></div>}>
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </Suspense>
  </BrowserRouter>
)
export default App

