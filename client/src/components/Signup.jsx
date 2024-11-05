import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate()

    const validateForm = () => {
        let errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = "First Name is required.";
        }
        if (!formData.lastName.trim()) {
            errors.lastName = "Last Name is required.";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid.";
        }
        if (!formData.password) {
            errors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match.";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {

            const res = await axios.post('http://localhost:8000/api/register', {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password
            },
            { withCredentials: true })
            console.log(res.data.createdUser)
            //save the user in redux
            navigate('/')

        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/api/auth/google";
    };

    return (
        <>
            <main className="max-w-md mx-auto  p-6 flex flex-col">
                <h1 className="text-3xl font-bold text-[#4285F4] mb-8 text-center">Signup</h1>
                <form  className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                required
                            />
                            {formErrors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                required
                            />
                            {formErrors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                            />
                            {formErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                required
                            />
                            {formErrors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-[#4285F4] text-white p-3 rounded-md hover:bg-[#3367D6] transition-colors"
                    >
                        Signup
                    </button>

                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-[#4285F4] hover:underline">
                            Login
                        </Link>
                    </p>

                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="w-full bg-[#4285F4] text-white p-3 rounded-md hover:bg-[#3367D6] transition-colors"
                    >
                        Signup with Google
                    </button>
                </form>
            </main>
        </>
    );
}
