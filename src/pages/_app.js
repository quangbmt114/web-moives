import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { Provider } from 'react-redux'
import store from '../store/index'
import Layout from '@/component/layout'
import  '../styles/globals.css'
export default function App({ Component, pageProps }) {
  return( 
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </Provider>
    )

  
}
