import { Link } from "react-router-dom";
import "../index.css"

const Navigation = () => {
  return (
    <nav className="nav">
      <div className='logo'>
        <p>Logo</p>
      </div>
      <div className='links'>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/login'>Login</Link>
      </div>
    </nav>
  )
}

export default Navigation
