import React, { useState } from "react";

// styling
import "./LoginForm.css";
import "./Modal.css";

interface LoginFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("Submitting login with:", formData);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Response error:", data);
        throw new Error(data.message || "Login failed");
      }

      // stores user data without JWT
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // checks for spooky onSuccess behaviour
      if (typeof onSuccess === "function") {
        onSuccess();
      } else {
        console.error("onSuccess is not a function:", onSuccess);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Username or Email</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="button-global">
            Login
          </button>
          <button type="button" className="button-global" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
