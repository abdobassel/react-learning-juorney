import { Link } from "react-router-dom";

export default function DashboardHeader() {
    return (
        <header className="dashboard-header d-flex justify-content-between align-items-center p-3 bg-dark text-white">
            {/* Left side: Admin links */}
            <nav className="nav-links">
                <div className="website-name">
                    <h1>BasseL&Store</h1>
                </div>
            </nav>

            {/* Right side: Go to Website link */}
            <div className="website-link">
                <Link to="/" className="nav-link">Go to Website</Link>
            </div>
        </header>
    );
}
