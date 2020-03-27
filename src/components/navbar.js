import React from "react";
//import { Link } from "react-router-dom"

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a className="navbar-brand text-light" href="/">
          EZ Movie Search
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
             <li className="nav-item dropdown">
             <button
                className="btn dropdown-toggle text-light"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Movies
              </button>
              <div
                className="dropdown-menu w-50"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <button
                  className="btn dropdown-item"
                  value={"trending"}
                  onClick={event => {
                    props.handleGetMovie(event);
                  }}
                >
                  Trending
                </button>
                <button
                  className="btn dropdown-item"
                  value={"popular"}
                  onClick={event => {
                    props.handleGetMovie(event);
                  }}
                >
                  Popular
                </button>
                <button
                  className="btn dropdown-item"
                  value={"top_rated"}
                  onClick={event => {
                    props.handleGetMovie(event);
                  }}
                >
                  Top Rated
                </button> 
              </div>
            </li> 
            <li className="nav-item">
              {/* <Link className="nav-link text-light" to="/about">
                About
              </Link> */}
                </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
