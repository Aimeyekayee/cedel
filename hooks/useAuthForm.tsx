import { signIn } from "next-auth/react";
import { useState } from "react";

interface FormData {
  empId: string;
  password: string;
  email?: string;
  name?: string;
}

const useAuthForm = (isSignUp: boolean) => {
  const [formData, setFormData] = useState<FormData>({
    empId: "",
    password: "",
    email: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!isSignUp) {
      // Sign In
      try {
        const result = await signIn("credentials", {
          redirect: false,
          empId: formData.empId,
          password: formData.password,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          // Handle successful sign in (e.g., redirect to dashboard)
          console.log("Signed in successfully");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      }
    } else {
      // Sign Up
      try {
        // Here you would typically make an API call to your backend to create a new user
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Signed up successfully");
          // Optionally sign in the user immediately after sign up
          await signIn("credentials", {
            redirect: false,
            empId: formData.empId,
            password: formData.password,
          });
        } else {
          const data = await response.json();
          setError(data.message || "Failed to sign up. Please try again.");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleSubmit, handleInputChange, error };
};

export default useAuthForm;
