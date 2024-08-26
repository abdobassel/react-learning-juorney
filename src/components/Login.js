import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const validateForm = () => {
        if (!email || !pass) {
            setError("Please fill in all fields");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format");
            return false;
        }
        if (pass.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    function submit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setSuccess("");

        axios.post('http://127.0.0.1:8000/api/auth/login', {
            email: email,
            password: pass
        })
            .then((response) => {
                setLoading(false);

                setSuccess("Login successful!");
                if (response.status === 200) {
                    window.localStorage.setItem('email', email);

                    console.log(response.data.result.token.access_token);
                    console.log(response.data.result);
                    const token = response.data.result.token.access_token;

                    window.localStorage.setItem('token', token);
                    window.location.pathname = "/";
                }

                // Optionally, you could redirect the user or clear the form here
            })
            .catch((error) => {
                setLoading(false);
                setError("Login failed. Please try again.");
                console.error(error);
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
                <h1 className="text-center mb-4">Login</h1>
                <form className="form-control" onSubmit={submit}>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
