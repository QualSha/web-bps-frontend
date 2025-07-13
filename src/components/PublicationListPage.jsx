// src/components/PublicationListPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePublications } from "../hooks/usePublications";

export default function PublicationListPage() {
  const { publications, deletePublication } = usePublications();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(null); // Lacak status loading per publikasi

  const handleEdit = (pub) => {
    navigate(`/publications/edit/${pub.id}`);
  };

  // Fungsi handleDelete yang disederhanakan, langsung dijalankan saat tombol diklik
  const handleDelete = async (publicationId) => {
    setDeleteLoading(publicationId);
    try {
      await deletePublication(publicationId);
    } catch (error) {
      console.error("Error deleting publication:", error);
    } finally {
      setDeleteLoading(null); // Reset status loading setelah selesai
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Daftar Publikasi BPS Provinsi Sumatera Utara
        </h1>
        <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
      </header>

      <div className="relative overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-slate-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-center w-16">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Judul
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Rilis
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Sampul
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                AKSI
              </th>
            </tr>
          </thead>

          <tbody>
            {publications.map((pub, idx) => (
              <tr
                key={pub.id}
                className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900 text-center">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {pub.title}
                </td>
                <td className="px-6 py-4 text-gray-600">{pub.releaseDate}</td>
                <td className="px-6 py-4 text-gray-600">
                  {pub.description || "Tidak ada deskripsi"}
                </td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <img
                    src={pub.coverUrl}
                    alt={`Sampul ${pub.title}`}
                    className="h-24 w-20 object-cover rounded shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/100x140/cccccc/ffffff?text=Error";
                    }}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(pub)}
                      className="px-3 py-1 text-sm font-medium text-white bg-yellow-400 rounded hover:bg-yellow-500 transition duration-200"
                      disabled={deleteLoading === pub.id}
                    >
                      Change
                    </button>
                    <button
                      // onClick sekarang langsung memanggil handleDelete
                      onClick={() => handleDelete(pub.id)}
                      className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      disabled={deleteLoading === pub.id}
                    >
                      {deleteLoading === pub.id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                          Loading...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kode Modal Konfirmasi Delete telah dihapus */}
    </div>
  );
}