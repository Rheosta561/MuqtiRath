import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginNgo = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://localhost:3000/verifyAdmin", {
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage("Login successful!");
      console.log(response.data.user._id); // You can store this ID in localStorage/sessionStorage for persistent login if needed.
      
      // Redirect to the dashboard page
      navigate(`/organisations/dashboard/${response.data.user._id}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-gray-900 text-center">Login to your account</h1>

        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2.5 border rounded-lg"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2.5 border rounded-lg"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-zinc-950 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-700 text-center">
            Don't have an account? <a href="/organisations/signup" className="text-pink-950 hover:underline">Sign up here</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginNgo;
