import { Link } from "react-router-dom";
import { Logo } from "./logo";

export default function Header() {
    return (
        <header className="App-header">
            {/* Logo on the left */}


            {/* Navigation links on the right */}
            <nav className="nav-links">
                <Link to="/register" className="nav-link">Register</Link>
                <Link to="/login" className="nav-link">Login</Link>
            </nav>
        </header>
    );
}
