import '../styles/globals.css'
import NavbarTop from '../common/components/Navbar'

function MyApp({ Component, pageProps }) {
  
  return (
  
    <NavbarTop>
      <Component {...pageProps} />
    </NavbarTop>)
}

export default MyApp
