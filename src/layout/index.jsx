import React, { memo, Suspense } from "react";
import styles from './index.module.less'
import { Layout, Spin } from "antd";
import renderRoutes from "@/routes/renderRoutes";
import { useHistory } from "react-router-dom";

function BasicLayout({ route }) {

  const history = useHistory()

  const handleRoute = (url) => {
    history.push(url)
  }

  return (
    <Layout className={styles.Layout}>
      <div className={styles.header}>
        <span onClick={() => handleRoute('/home')}>首页</span>
        <span onClick={() => handleRoute('/test')}>测试页面</span>
      </div>
      <div className={styles.content}>
        <Suspense fallback={<div style={{ width: '100%', height: '100%', textAlign: "center", paddingTop: '30%' }}> <Spin /></div>}>
          {route.routes && renderRoutes(route.routes)}
        </Suspense>
      </div>
    </Layout>
  )
}
export default memo(BasicLayout)
