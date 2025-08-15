"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  CheckWhichCompetitionTheUserJoinned,
  GetCompetitionNameById,
  GetUsersByTeamNameAndCompetitionId,
  GetAllUsersInSelectedCompetition,
} from "@/lib/competition";
import { Users } from "@/types/users.md";
import PageGuard from "@/components/PageGuard";

function Page() {
  enum CompetitionId {
    CompetitiveProgramming = "1",
    PromptGpt = "2",
    TypeRacer = "3",
    BusinessPlan = "4",
  }

  const CompetitionName: Record<CompetitionId, string> = {
    [CompetitionId.CompetitiveProgramming]: "Competitive Programming",
    [CompetitionId.PromptGpt]: "Prompt GPT",
    [CompetitionId.TypeRacer]: "Type Racer",
    [CompetitionId.BusinessPlan]: "Business Plan",
  };
  // State untuk Panel Umum
  const [nisn, setNisn] = useState("");
  const [competitionId, setCompetitionId] = useState<string | null>(null);
  const [competitionName, setCompetitionName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [teamName, setTeamName] = useState("");
  const [teamCompetitionId, setTeamCompetitionId] = useState<
    CompetitionId | ""
  >("");
  const [users, setUsers] = useState<Users[] | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // State untuk Panel All Users
  const [selectedCompetition, setSelectedCompetition] = useState<
    CompetitionId | ""
  >("");
  const [allUsers, setAllUsers] = useState<Users[] | null>(null);
  const [allUsersError, setAllUsersError] = useState<string | null>(null);
  const [allUsersLoading, setAllUsersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  // Handler Panel Umum
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
    if (!teamName.trim() || !teamCompetitionId) {
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

  // Handler untuk Panel All Users
  const handleGetAllUsers = async () => {
    setAllUsersError(null);
    setAllUsers(null);
    setSearchQuery(""); // Reset search query when fetching new data
    if (!selectedCompetition) {
      setAllUsersError("Pilih lomba terlebih dahulu");
      return;
    }
    setAllUsersLoading(true);
    const res = await GetAllUsersInSelectedCompetition(selectedCompetition);
    setAllUsersLoading(false);
    if (res.error) {
      setAllUsersError(res.error);
    } else if (res.users && res.users.length > 0) {
      setAllUsers(res.users);
    } else {
      setAllUsersError("Tidak ada user terdaftar di lomba ini");
    }
  };

  // Filter users based on search query
  const filteredUsers = allUsers
    ? allUsers.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
          user.team_name?.toLowerCase().includes(query) ||
          false ||
          user.NISN?.toLowerCase().includes(query) ||
          false ||
          user.username?.toLowerCase().includes(query) ||
          false
        );
      })
    : null;

  return (
    <PageGuard checkAdmin redirectTo="/" shouldRedirectOnClose={true}>
      <div className="min-h-screen bg-slate-900 p-8 pt-[10%]">
        {/* Header */}
        <h1 className="text-3xl font-medium text-white mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Panel Umum */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cek Lomba Berdasarkan NISN */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4 pb-1 border-b border-gray-200">
                Cek Lomba Berdasarkan NISN
              </h3>
              <input
                type="text"
                placeholder="Masukkan NISN"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleCheck}
                className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
              >
                Cek Lomba User
              </button>

              {competitionId && (
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-100">
                  <p className="text-gray-700">User terdaftar di lomba:</p>
                  <p className="font-medium text-blue-700">
                    {CompetitionName[competitionId as CompetitionId] ||
                      competitionName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Competition ID: {competitionId}
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-3 p-3 bg-red-50 text-red-700 rounded border border-red-100 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Cari Anggota Tim */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4 pb-1 border-b border-gray-200">
                Cari Anggota Tim
              </h3>
              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={teamCompetitionId}
                onChange={(e) =>
                  setTeamCompetitionId(e.target.value as CompetitionId)
                }
                className="w-full mt-3 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Pilih Lomba</option>
                {Object.entries(CompetitionName).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleGetUsers}
                className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                disabled={loading}
              >
                {loading ? "Loading..." : "Dapatkan Users"}
              </button>

              {users && (
                <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200 text-sm">
                  <p className="font-medium mb-2">Users:</p>
                  <ul className="space-y-3">
                    {users.map((user, idx) => (
                      <li
                        key={idx}
                        className="p-2 bg-white rounded border border-gray-100"
                      >
                        <p>
                          <span className="font-medium">Nama:</span>{" "}
                          {user.username || "-"}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {user.email || "-"}
                        </p>
                        <p>
                          <span className="font-medium">NISN:</span>{" "}
                          {user.NISN || "-"}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {userError && (
                <div className="mt-3 p-3 bg-red-50 text-red-700 rounded border border-red-100 text-sm">
                  {userError}
                </div>
              )}
            </div>
          </div>

          {/* Panel Competitions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-6 pb-1 border-b border-gray-200">
              Panel Competitions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/business-plan"
                className="bg-blue-500 border p-4 text-white font-bold hover:bg-blue-700 transition-colors duration-200"
              >
                Business Plan
              </Link>
              <Link
                href="/competitive-programming"
                className="bg-blue-500 border p-4 text-white font-bold hover:bg-blue-700 transition-colors duration-200"
              >
                Competitive Programming
              </Link>
              <Link
                href="/prompt-gpt"
                className="bg-blue-500 border p-4 text-white font-bold hover:bg-blue-700 transition-colors duration-200"
              >
                Prompt GPT
              </Link>
              <Link
                href="/type-racer"
                className="bg-blue-500 border p-4 text-white font-bold hover:bg-blue-700 transition-colors duration-200"
              >
                Type Racer
              </Link>
            </div>
          </div>

          {/* Panel All Users from Competition - NEW */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-6 pb-1 border-b border-gray-200">
              Daftar Semua Peserta Lomba
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <select
                value={selectedCompetition}
                onChange={(e) =>
                  setSelectedCompetition(e.target.value as CompetitionId)
                }
                className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white flex-grow"
              >
                <option value="">Pilih Lomba</option>
                {Object.entries(CompetitionName).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleGetAllUsers}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition-colors sm:flex-grow-0 sm:flex-shrink-0"
                disabled={allUsersLoading}
              >
                {allUsersLoading ? "Loading..." : "Tampilkan Semua User"}
              </button>
            </div>

            {/* Search bar - NEW */}
            {allUsers && allUsers.length > 0 && (
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Search nama tim, NISN, atau nama peserta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}

            {filteredUsers && filteredUsers.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <p className="text-sm text-gray-500 mb-2">
                  Menampilkan {filteredUsers.length} dari {allUsers?.length}{" "}
                  peserta
                </p>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        NISN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tim
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sekolah
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Kontak
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.username || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.NISN || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.team_name || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.school_name || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.contact_person_number || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                {allUsersError ? (
                  <div className="p-3 bg-red-50 text-red-700 rounded border border-red-100 text-sm">
                    {allUsersError}
                  </div>
                ) : allUsers && searchQuery && filteredUsers?.length === 0 ? (
                  <div className="text-gray-500">
                    Tidak ada hasil yang cocok dengan pencarian {searchQuery}
                  </div>
                ) : allUsers && allUsers.length > 0 ? (
                  <div className="text-gray-500">
                    Tidak ada hasil yang cocok dengan pencarian
                  </div>
                ) : (
                  allUsers && (
                    <div className="text-gray-500">
                      Tidak ada user yang terdaftar di lomba ini
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageGuard>
  );
}

export default Page;
