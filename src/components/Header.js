import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./logo";
import axios from "axios";
import { useContext, useState } from "react";
import { User } from "./context/AuthProvider";
export default function Header() {
    const { authToken, setAuthToken, setUserModel } = useContext(User);

    const navigateTo = useNavigate();

    function logout() {
        if (authToken) {
            axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then((response) => {
                    // نظف بيانات المستخدم
                    setAuthToken(null);
                    setUserModel({});

                    navigateTo('/login');
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Logout Error:', error.response.data);
                });
        }
    }
    return (
        <header className="App-header">
            {/* Logo on the left */}




            <nav className="nav-links">
                {/*   هنا بشوف لو فيه اميل متسجل او لا لو فيه يظهر فقط اللوج اوت */}
                {!authToken ? (
                    <>
                        <Link to="/register" className="nav-button">Register</Link>
                        <Link to="/login" className="nav-button">Login</Link>
                    </>
                ) : (
                    <Link to="/logout" className="nav-button" onClick={logout}>Logout</Link>
                )}
            </nav>
        </header>
    );
}
