import agent from '../assets/images/gavel-and-document.png'
import '../assets/styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="row grey darken-4">
      <section className="container">
        <div className="col s12 m6 nav-left left-align">
          <img
              height={60}
              width={60}
              src={agent}
              alt="gavel-and-document.png"
          />
          <h2>Legalese</h2>
        </div>
        <div className="col s12 m6 right-align">
          <a href="#">
            <i className="fab fa-github fa-2xl"></i>
          </a>
          
        </div>
      </section>
    </nav>
  )
}

export default Navbar;