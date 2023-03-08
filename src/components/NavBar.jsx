import React, { Fragment } from "react"
import {useGlobalContext} from "../context"
import { useAuthUser } from "react-auth-kit"
import {BiHomeAlt2} from "react-icons/bi"
import {Link} from "react-router-dom"

const NavBar = () => {
  const {handleLogout} = useGlobalContext()
  const auth = useAuthUser()

  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/dashboard",
      icon: "home"

    },
    {
      id: 2,
      name: "Add Student",
      path: "/addstudent",
      icon: "plus-circle"

    },
    {
      id: 3,
      name: "Student Stats",
      path: "/stats",
      icon: "chart-pie"

    },

  ]
  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/dashboard">
            <img
              src="https://img.freepik.com/free-vector/creative-data-logo-template_23-2149212796.jpg"
              width="112"
            />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
          {navItems.map((item)=>(
            <Fragment>
            <Link to={item.path} key = {item.id} className="navbar-item">
              <span class="icon is-small">
                <i class={`fas fa-${item.icon}`}></i>
              </span>
              <span> {item.name}</span>
              </Link>
            </Fragment>
            
            
          ))}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
            {auth().username}
              <div className="buttons">
                <button className="button">
                  <span className="icon is-small">
                    <i className="fas fa-user"></i>
                  </span>
                </button>
               
                <a className="button is-light" onClick={handleLogout}>
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
