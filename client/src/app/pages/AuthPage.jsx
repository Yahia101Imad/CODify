import { useState } from "react";
import { useNavigate } from "react-router";
// import { ShoppingBag, Mail, Lock, User, Store } from "lucide-react";
import { FaShoppingBag, FaUser, FaStore } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { toast } from "sonner";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useApp();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    username: "",
    storeName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) newErrors.email = "Email is required";
    if (!loginData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = login(loginData.email, loginData.password);
    if (success) {
      toast.success("Welcome back!", {
        description: "Redirecting to your dashboard...",
      });
      setTimeout(() => navigate("/dashboard"), 500);
    } else {
      setErrors({ general: "Invalid credentials" });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerData.name) newErrors.name = "Name is required";
    if (!registerData.email) newErrors.email = "Email is required";
    if (!registerData.username) newErrors.username = "Username is required";
    if (!registerData.storeName) newErrors.storeName = "Store name is required";
    if (!registerData.password) newErrors.password = "Password is required";
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (registerData.password && registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = register(
      {
        name: registerData.name,
        email: registerData.email,
        username: registerData.username,
        storeName: registerData.storeName,
      },
      registerData.password,
    );

    if (success) {
      toast.success("Account created successfully!", {
        description: "Welcome to CODify! Setting up your dashboard...",
      });
      setTimeout(() => navigate("/dashboard"), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaShoppingBag className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              CODify
            </span>
          </div>
          <p className="text-gray-600">Start your selling journey today</p>
        </div>

        <Card className="p-8 rounded-2xl shadow-xl">
          <Tabs defaultValue="login" className="w-full">
  <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-200 p-1 rounded-md">
    <TabsTrigger value="login" onClick={() => setErrors({})}>
      Login
    </TabsTrigger>
    <TabsTrigger value="register" onClick={() => setErrors({})}>
      Register
    </TabsTrigger>
  </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <MdEmail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 h-11 rounded-lg"
                      value={loginData.email}
                      onChange={(e) => {
                        setLoginData({ ...loginData, email: e.target.value });
                        setErrors({ ...errors, email: "" });
                      }}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="login-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <RiLockPasswordLine
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-11 rounded-lg"
                      value={loginData.password}
                      onChange={(e) => {
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        });
                        setErrors({ ...errors, password: "" });
                      }}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                {errors.general && (
                  <p className="text-sm text-red-500">{errors.general}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 h-11 rounded-lg text-base"
                >
                  Login to Dashboard
                </Button>

                <p className="text-center text-sm text-gray-600">
                  <a href="#" className="text-violet-600 hover:underline">
                    Forgot password?
                  </a>
                </p>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="register-name"
                    className="text-sm font-medium"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <FaUser
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-11 rounded-lg"
                      value={registerData.name}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        });
                        setErrors({ ...errors, name: "" });
                      }}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="register-email"
                    className="text-sm font-medium"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <MdEmail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 h-11 rounded-lg"
                      value={registerData.email}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        });
                        setErrors({ ...errors, email: "" });
                      }}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="register-username"
                    className="text-sm font-medium"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <FaUser
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="johndoe"
                      className="pl-10 h-11 rounded-lg"
                      value={registerData.username}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          username: e.target.value
                            .toLowerCase()
                            .replace(/\s/g, ""),
                        });
                        setErrors({ ...errors, username: "" });
                      }}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-red-500">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="register-store"
                    className="text-sm font-medium"
                  >
                    Store Name
                  </Label>
                  <div className="relative">
                    <FaStore
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="register-store"
                      type="text"
                      placeholder="My Fashion Store"
                      className="pl-10 h-11 rounded-lg"
                      value={registerData.storeName}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          storeName: e.target.value,
                        });
                        setErrors({ ...errors, storeName: "" });
                      }}
                    />
                  </div>
                  {errors.storeName && (
                    <p className="text-sm text-red-500">{errors.storeName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="register-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <RiLockPasswordLine
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-11 rounded-lg"
                      value={registerData.password}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        });
                        setErrors({ ...errors, password: "" });
                      }}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="register-confirm"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <RiLockPasswordLine
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-11 rounded-lg"
                      value={registerData.confirmPassword}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        });
                        setErrors({ ...errors, confirmPassword: "" });
                      }}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 h-11 rounded-lg text-base"
                >
                  Create Account
                </Button>

                <p className="text-center text-xs text-gray-600">
                  By registering, you agree to our{" "}
                  <a href="#" className="text-violet-600 hover:underline">
                    Terms of Service
                  </a>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
