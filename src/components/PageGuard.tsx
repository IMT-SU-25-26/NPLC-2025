"use client";
import { CheckWhichCompetitionTheUserJoinned, CheckPageLock } from "@/lib/competition";
import { GetCurrentUser, GetUserById } from "@/lib/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageGuardProps } from "@/types/pageGuard.md";

export default function PageGuard({
  children,
  checkAdmin,
  competitionId,
  redirectIfRegistered,
  shouldRedirectOnClose,
  redirectTo = "/",
  should_use_is_page_locked,
  is_page_locked,
}: PageGuardProps) {
  const [checking, setChecking] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDenied, setShowDenied] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const user = await GetCurrentUser();
      if (!user) {
        setErrorMsg("You must be logged in to access this page.");
        setChecking(false);
        return;
      }
      if (checkAdmin) {
        const userTable = await GetUserById(user.id);
        if (!userTable || userTable.isAdmin === false) {
          setErrorMsg("You do not have admin access.");
          setChecking(false);
          return;
        }
      }
      if (competitionId) {
        const userTable = await GetUserById(user.id);
        if (!userTable || !userTable.NISN) {
          setErrorMsg("Your NISN is not registered. Please complete your profile.");
          setChecking(false);
          return;
        }
        const res = await CheckWhichCompetitionTheUserJoinned({ NISN: userTable.NISN.toString() });
        if (redirectIfRegistered && res.success && res.success !== "0") {
          setErrorMsg("You have already registered for a competition!");
          setChecking(false);
          return;
        }
        if (
          !redirectIfRegistered &&
          (!res.success || res.success === "0" || res.success.toString() !== competitionId.toString())
        ) {
          setErrorMsg("You are not registered for this competition.");
          setChecking(false);
          return;
        }
        if(should_use_is_page_locked){
          is_page_locked = (await CheckPageLock({ competition_id: competitionId })).locked;

          if(is_page_locked){
            setErrorMsg("This page is not accessible yet!.");
            setChecking(false);
            return;
          }
        }
      }
      setFadeOut(true);
      setTimeout(() => setChecking(false), 400);
    };
    checkAccess();
  }, [checkAdmin, competitionId, redirectIfRegistered]);

  const handleClose = () => {
    setShowDenied(false);
    if (shouldRedirectOnClose) {
      router.push(redirectTo);
    }
  };

  if (checking) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-400 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-white text-lg font-medium">
            Checking access...
          </span>
        </div>
      </div>
    );
  }

  if (errorMsg && showDenied) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
        <div className="bg-white rounded-lg shadow-lg p-8 min-w-[300px] max-w-[90vw] flex flex-col items-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="mb-6 text-gray-700 text-center">{errorMsg}</p>
          <button
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
