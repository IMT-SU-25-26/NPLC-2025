"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckWhichCompetitionTheUserJoinned,
  GetCompetitionNameById,
  GetUsersByTeamNameAndCompetitionId,
} from "@/lib/competition";
import { Users } from "@/types/users.md";
import PageGuard from "@/components/PageGuard";

function Page() {
  const router = useRouter();
  const [nisn, setNisn] = useState("");
  const [competitionId, setCompetitionId] = useState<string | null>(null);
  const [competitionName, setCompetitionName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [teamName, setTeamName] = useState("");
  const [teamCompetitionId, setTeamCompetitionId] = useState("");
  const [users, setUsers] = useState<Users[] | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setError(null);
    setCompetitionId(null);
    setCompetitionName(null);
    if (!nisn.trim()) {
      setError("NISN harus diisi");
      return;
    }
    const res = await CheckWhichCompetitionTheUserJoinned({ NISN: nisn });
    if (res.error) {
      setError(res.error);
    } else if (res.success && res.success !== "0") {
      setCompetitionId(res.success);
      // Ambil nama lomba
      const nameRes = await GetCompetitionNameById(res.success);
      if (nameRes.error) {
        setCompetitionName(null);
        setError("Gagal mendapatkan nama lomba: " + nameRes.error);
      } else {
        setCompetitionName(nameRes.success);
      }
    } else {
      setError("User belum terdaftar di lomba manapun");
    }
  };

  const handleGetUsers = async () => {
    setUserError(null);
    setUsers(null);
    if (!teamName.trim() || !teamCompetitionId.trim()) {
      setUserError("Team name dan Competition ID harus diisi");
      return;
    }
    setLoading(true);
    const res = await GetUsersByTeamNameAndCompetitionId(
      teamName,
      teamCompetitionId
    );
    setLoading(false);
    if (res.error) {
      setUserError(res.error);
    } else if (res.users && res.users.length > 0) {
      setUsers(res.users);
    } else {
      setUserError("Tidak ada user ditemukan");
    }
  };

  return (
    <PageGuard checkAdmin>
      <div className="pt-[5%] flex flex-col justify-center items-center min-h-screen w-screen bg-[url('/backgrounds/main-color-background.svg')]">
        {/* Panel utama */}
        <div className="flex flex-col gap-6 bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md mt-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Cek Lomba Berdasarkan NISN
          </h2>
          <input
            type="text"
            placeholder="Masukkan NISN"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <button
            onClick={handleCheck}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Cek Lomba User
          </button>
          {competitionId && competitionName && (
            <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center">
              User terdaftar di lomba: <b>{competitionName}</b> <br />
              <span className="text-xs text-gray-500">
                (Competition ID: {competitionId})
              </span>
            </div>
          )}
          {error && (
            <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md mt-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Cari Anggota Tim
          </h2>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <input
            type="text"
            placeholder="Competition ID"
            value={teamCompetitionId}
            onChange={(e) => setTeamCompetitionId(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <button
            onClick={handleGetUsers}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Dapatkan Users"}
          </button>
          {users && (
            <div className="text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              <b>Users:</b>
              <ul className="list-disc ml-6 mt-2">
                {users.map((user, idx) => (
                  <li key={idx} className="text-sm break-all mb-2">
                    <div>
                      <b>Nama:</b> {user.name || "-"}
                    </div>
                    <div>
                      <b>Email:</b> {user.email || "-"}
                    </div>
                    <div>
                      <b>NISN:</b> {user.NISN || "-"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {userError && (
            <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center">
              {userError}
            </div>
          )}
        </div>
      </div>
    </PageGuard>
  );
}

export default Page;