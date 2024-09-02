"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function AuthForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    empId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!isSignUp) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          username: formData.empId,
          password: formData.password,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/cedel");
          console.log("Signed in successfully");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Signed up successfully");
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
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader style={{ display: "flex", flexDirection: "column" }}>
        <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        <CardDescription>
          {isSignUp
            ? "Create a new account to get started."
            : "Enter your credentials to access your account."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="empId">Employee ID</Label>
                <Input
                  id="empId"
                  name="empId"
                  type="number"
                  placeholder="Eg. 1001234"
                  required
                  value={formData.empId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          {isSignUp && (
            <>
              <Label htmlFor="empId">Employee ID</Label>
              <Input
                id="empId"
                name="empId"
                type="number"
                placeholder="Eg. 1001234"
                required
                value={formData.empId}
                onChange={handleInputChange}
              />
              <Label htmlFor="email">Employee Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-primary hover:underline focus:outline-none"
                  disabled={loading}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-primary hover:underline focus:outline-none"
                  disabled={loading}
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
