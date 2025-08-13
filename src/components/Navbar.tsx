"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="fixed z-[50] h-[10vh] w-screen flex justify-center items-center">
      <Link href="/" className="hover:cursor-pointer">
        <Image
          src={"/buttons/home.svg"}
          alt="home"
          width={150}
          height={150}
          className="w-[6rem] sm:w-[10rem] h-auto "
        />
      </Link>
      {!user && (
        <Link href="/login" className="hover:cursor-pointer">
          <Image
            src={"/buttons/LoginButton.svg"}
            alt="login"
            width={150}
            height={150}
            className="w-[6rem] sm:w-[10rem] h-auto "
          />
        </Link>
      )}
      {user && (
        <button
          onClick={handleLogout}
          className="hover:cursor-pointer w-fit"
        >
          <Image
            src={"/buttons/LogoutButton.svg"}
            alt="logout"
            width={150}
            height={150}
            className="w-[6rem] sm:w-[10rem] h-auto "
          />
        </button>
      )}
    </nav>
  );
}
