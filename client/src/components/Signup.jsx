import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/user";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/authSlice";

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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");
    const dispatch = useDispatch()
    
    const navigate = useNavigate();

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
        setApiError("");

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await register({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password
                });

                if (response?.data?.success) {
                    // Successful registration
                    dispatch(getUser())
                    navigate('/');
                } else {
                    setApiError("User already exists");
                }
            } catch (error) {
                if (error.response) {
                    // Server responded with an error
                    const serverError = error.response.data?.message || "Registration failed. Please try again.";
                    setApiError(serverError);

                    // Handle specific server validation errors if they exist
                    if (error.response.data?.errors) {
                        const serverErrors = error.response.data.errors;
                        const fieldErrors = {};
                        
                        // Map server errors to form fields
                        if (serverErrors.email) fieldErrors.email = serverErrors.email;
                        if (serverErrors.password) fieldErrors.password = serverErrors.password;
                        
                        setFormErrors(prev => ({...prev, ...fieldErrors}));
                    }
                } else if (error.request) {
                    // Network error
                    setApiError("Network error. Please check your connection and try again.");
                } else {
                    // Something else went wrong
                    setApiError("An unexpected error occurred. Please try again.");
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
    };

    return (
        <>
            <main className="max-w-md mx-auto p-6 flex flex-col">
                <h1 className="text-3xl font-bold text-[#4285F4] mb-8 text-center">Signup</h1>
                {apiError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                        {apiError}
                    </div>
                )}
                <form className="space-y-4">
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                        className="w-full bg-[#4285F4] text-white p-3 rounded-md hover:bg-[#3367D6] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing up..." : "Signup"}
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
                        className="w-full bg-[#4285F4] text-white p-3 rounded-md hover:bg-[#3367D6] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        Signup with Google
                    </button>
                </form>
            </main>
        </>
    );
}