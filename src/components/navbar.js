import { Link } from "react-router-dom";
import { useContext } from "react";
import AccountContext from "../context/AccountContext";
import UserContext from "../context/UserContext";
import Button from "react-bootstrap/Button";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Bank Home
              </Link>
            </li>
            {user ? (
              ""
            ) : (
              <li className="nav-item">
                <Link to="/createaccount" className="nav-link">
                  Create Account
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/deposit">
                Deposit
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/withdraw">
                Withdraw
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/balance">
                Balance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/alldata">
                All Data
              </Link>
            </li>

            {user ? (
              <Button className="btn btn-light" onClick={() => setUser(null)}>
                Log Out
              </Button>
            ) : (
              <li className="nav-item navbar-toggler-right">
                <Link to="/login" className="nav-link">
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
