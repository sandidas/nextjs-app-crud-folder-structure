"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [isDirty, setIsDirty] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // signUp
  const onLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      console.log("Login successful", res.data);
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error?.message);
    } finally {
    }
  };

  useEffect(() => {
    if (user.email.length > 5 && user.password.length > 5) {
      setIsDirty(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col px-5 gap-3 text-lg max-w-xl mx-auto py-10">
      Login
      <hr />
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input required minLength={5} className="bg-slate-200 p-2" type="email" name="" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input required minLength={5} className="bg-slate-200 p-2" type="text" name="" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      </div>
      <div className="flex flex-col">
        <button onClick={onLogin} disabled={!isDirty} className="px-5 p-2 bg-slate-200 hover:bg-purple-300">
          {!isDirty ? "..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
