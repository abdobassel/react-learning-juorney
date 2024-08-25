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
        // لو اي خطا حصل اللي هيرجع هيكون false 
        // فعشان كده احنا بنرجع في الاخر return true 
        // يعني لو رجع ترو اذن الفاليديشن تمام 
    };


    function submit(e) {
        e.preventDefault(); // لمنع ارسال البيانات غير بعد الفاليديشن

        if (!validateForm()) return; // لو رجع الفولس يبقى لازم نوقف الفانكشن


        setLoading(true); // تحت الزرار هيتغير التكست فيه 
        setError(""); //  هيتملي في حالة ان في ايرور
        setSuccess("");

        axios.post('http://127.0.0.1:8000/api/auth/register', {
            name: name,
            email: email,
            phone: phone,
            password: pass,
            codeType: "email"
            // الباك اند انا اللي عامله من  مشروع بلارافيل 
        })
            .then((response) => {
                // هنغير الحلة بتاع لودينج لفولس عشان الزرار يرجع لاصله طالما العملية تمت سواء نجاح او فشل
                setLoading(false);
                setSuccess("Signup successful! Please check your email."); // ملينا الsuccess
                // Optionally, you could redirect the user or clear the form here
            })
            .catch((error) => {
                setLoading(false);
                setError("Signup failed. Please try again.");
                console.error(error);
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
                <h1 className="text-center mb-4">SignUp</h1>
                <form className="form-control" onSubmit={submit}>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            type="text"
                            placeholder="UserName"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                        />
                    </div>
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
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                </form>
            </div>
        </div>
    );
}
