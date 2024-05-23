import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
// import { useDispatch } from "react-redux";

interface FormData {
  username: string;
  password: string;
}

interface ApiResponse {
  token: string;
  existingUser: {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  message: string;
  success: boolean;
}

export function Login() {
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:3000/signin",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      const { token, existingUser } = response.data;
      localStorage.setItem("user", JSON.stringify(existingUser));
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      toast({
        title: "Logged in Successfully",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error Logging In",
      });
    }
  };

  return (
    <div className="w-full lg:grid lg:h-[100vh] lg:grid-cols-2 xl:min-h-full">
      {/* image */}
      <div className="hidden bg-muted lg:block">
        <img
          src="/pic-2.jpg"
          alt="Background"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/"
                    className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
