import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpNgo = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginClick = ()=>{
    navigate('/organisations/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }


    if (!formData.termsAccepted) {
      setErrorMessage("You must accept the terms and conditions");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("https://muqtirath-wiegnite.onrender.com/createAdmin", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data.createdUser._id);

      setSuccessMessage("Account created successfully!");
      navigate(`/organisations/registration/${response.data.createdUser._id}`);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-gray-900 text-center">Create an account</h1>

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

          <div>
            <label className="block text-sm font-medium text-gray-900">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2.5 border rounded-lg"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              name="termsAccepted"
              className="mr-2"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-gray-500">
              I accept the <a href="#" className="text-primary-600 hover:underline text-zinc-950">Terms and Conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-zinc-950 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create an account"}
          </button>

          <p className="text-sm text-gray-700 text-center">
            Already have an account? <a onClick={handleLoginClick} className="text-pink-950 hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUpNgo;
