"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SignUp = () => {
  const router = useRouter();
  const [isDirty, setIsDirty] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  //
  useEffect(() => {
    if (user.email.length > 5 && user.password.length > 5 && user.username.length > 1) {
      setIsDirty(true);
    }
  }, [user]);

  // signUp
  const onSignUp = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log("SignUp successful", res.data);
    } catch (error: any) {
      console.log("Signup failed", error?.message);
    } finally {
    }
  };

  return (
    <div className="flex flex-col px-5 gap-3 text-lg max-w-xl mx-auto py-10">
      SighUp
      <hr />
      <div className="flex flex-col">
        <label htmlFor="username">User Name</label>
        <input required minLength={5} className="bg-slate-200 p-2" type="text" name="" id="username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input required minLength={5} className="bg-slate-200 p-2" type="email" name="" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input required minLength={5} className="bg-slate-200 p-2" type="text" name="" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      </div>
      <div className="flex flex-col">
        <button onClick={onSignUp} disabled={!isDirty} className="px-5 p-2 bg-slate-200 hover:bg-purple-300">
          {!isDirty ? "..." : "SignUp"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
