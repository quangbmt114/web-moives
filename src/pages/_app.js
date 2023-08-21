import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Layout from '@/component/layout'
import  '../styles/globals.css'
export default function App({ Component, pageProps }) {
  return( 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )

  
}
