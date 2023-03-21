import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import store from '@/store'
import ErrorBoundary from '@/components/ErrorBoundary';
import App from './App'

const Index =
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <ErrorBoundary>
       <App />
      </ErrorBoundary>
    </ConfigProvider>
  </Provider>

ReactDOM.render(
    Index,
   document.getElementById('root')
 )
 