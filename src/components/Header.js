import { Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "axios";

export default function Header() {
    function logout() {
        const token = window.localStorage.getItem('token');

        if (token) {
            axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    window.location.pathname = '/login';
                    window.localStorage.removeItem('email');
                    window.localStorage.removeItem('token');
                    console.log(response);
                    // توجيه المستخدم إلى صفحة تسجيل الدخول



                });
        }
    }
    return (
        <header className="App-header">
            {/* Logo on the left */}




            <nav className="nav-links">
                {/*   هنا بشوف لو فيه اميل متسجل او لا لو فيه يظهر فقط اللوج اوت */}
                {!window.localStorage.getItem('email') ? <>
                    <Link to="/register" className="nav-button" >Register</Link>
                    <Link to="/login" className="nav-button">Login</Link>
                </> :
                    <Link to="/logout" className="nav-button" onClick={logout}>Logout</Link>
                }
            </nav>
        </header>
    );
}
