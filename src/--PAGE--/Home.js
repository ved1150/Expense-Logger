import { Link } from 'react-router-dom';
import logo from "../assets/homeLogo.svg"
import React from 'react'

export default function Home() {
  return (
    <div className="home">
    <div className="homeHead">
        <div className="homeLogo">
            <img src={logo} alt="A rabbit inspired by Alice in wonderland. cr to Max Jiang"/>
        </div>

        <nav>
            <ul>
                <li>
                    <Link to= "/login">Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </nav>
    </div>

    <div className="homeText">
        <h1>EXPENSE LOGGER</h1>
        <h2>A handy tool that helps you track your expenses</h2>
    </div>
</div>
  )
}
