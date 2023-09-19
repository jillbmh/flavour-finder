import { Link } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'
import NewLogo from '../images/new-logo.png'


export default function Footer() {
  return (
    <footer>
      &copy; <img src={NewLogo} className='footer-logo' />
      <nav>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/cookie-policy">Cookie Policy</Link>
        <SocialIcon url="https://twitter.com" bgColor='#e99254' style={{ height: 40, width: 40 }} />
        <SocialIcon url="https://facebook.com" bgColor='#e99254' style={{ height: 40, width: 40 }} />
        <SocialIcon url="https://tiktok.com" bgColor='#e99254' style={{ height: 40, width: 40 }} />
        <SocialIcon url="https://instagram.com" bgColor='#e99254' style={{ height: 40, width: 40 }} />
      </nav>
    </footer>
  )

}
