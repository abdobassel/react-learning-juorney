import { useState } from "react";
import axios from "axios";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateForm = () => {
        if (!name || !email || !phone || !pass) {
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

        axios.post('http://127.0.0.1:8000/api/auth/register', {
            name: name,
            email: email,
            phone: phone,
            password: pass,
            codeType: "email"
        })
            .then((response) => {
                setLoading(false);
                setSuccess("Signup successful! Please check your email.");
                // Optionally, you could redirect the user or clear the form here
            })
            .catch((error) => {
                setLoading(false);
                setError("Signup failed. Please try again.");
                console.error(error);
            });
    }

    return (
        <div className="mb-3 row">
            <h1 className="text-center">SignUp</h1>
            <form className="form-control" onSubmit={submit}>
                <input
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    type="text"
                    placeholder="UserName"
                    aria-label=".form-control-lg example"
                />
                <input
                    className="form-control form-control-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    aria-label=".form-control-lg example"
                />
                <input
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="Email"
                    aria-label=".form-control-lg example"
                />
                <input
                    className="form-control form-control-lg"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Password"
                    aria-label=".form-control-lg example"
                />
                <br />
                <button className='btn btn-primary' type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
            </form>
        </div>
    );
}
