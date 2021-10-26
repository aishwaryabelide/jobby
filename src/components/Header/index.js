import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {activeTabId: ''}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <div>
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </div>
        <ul className="menu-container">
          <Link className="menu-items" to="/">
            <li>Home</li>
          </Link>
          <Link className="menu-items" to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </div>
    )
  }
}

export default withRouter(Header)
