import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.email) {
            toast.error("Email is required");
            return false;
        }
        if (!formData.password) {
            toast.error("Password is required");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            toast.error("Invalid Email");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const data = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });
        const response = await data.json();
        if (response.success) {
            localStorage.setItem("authToken", response.authToken);
            toast.success("Login Successfull");
            setLoading(false);
            navigate("/");
            return;
        }
        toast.error("Login failed");
        setLoading(false);
    };

    return (
        <>
            <div className="container h-75 d-flex justify-content-center align-content-center">
                <form className="d-flex flex-column justify-content-center align-content-center">
                    <h3 className="text-white w-100 text-center">Login</h3>

                    <div className="mb-3">
                        <label className="text-white mb-2">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="text-white mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>
                            {loading ? (
                                <div className="w-100 text-center">
                                    <Spinner className="" animation="border" variant="light" />
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Login;