import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";

const API_BASE_URL = "http://191.96.57.27:5000/api/url";

const Mainpage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [urlIdToEdit, setUrlIdToEdit] = useState(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const token = user?.token;

  useEffect(() => {
    const fetchShortUrls = async () => {
      if (!token) return;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/allurl`,
          { userid: user.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShortUrls(response.data.allurl);
        console.log(response.data.allurl);
      } catch (error) {
        toast.error("Error fetching shortened URLs. Please try again.");
        console.error("Error fetching shortened URLs:", error);
      }
    };

    fetchShortUrls();
  }, [token, user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) {
      toast.error("URL cannot be empty");
      return;
    }
    if (!validateUrl(originalUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/shorten`,
        { originalUrl, userId: user?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrls((prevShortUrls) => [...prevShortUrls, response.data.url]);
      setOriginalUrl(""); // Reset the input field after submission
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error shortening URL. Please try again.");
      console.error("Error shortening URL:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this URL?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/deleteurl`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrls((prevShortUrls) =>
        prevShortUrls.filter((url) => url._id !== id)
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error deleting URL. Please try again.");
      console.error("Error deleting URL:", error);
    }
  };

  const validateUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(url)) return false;

    const protocol = url.split("://")[0];
    if (!["http", "https"].includes(protocol)) return false;

    const domain = url.split("://")[1]?.split("/")[0];
    return !!domain;
  };

  const copyToClipboard = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Shortened URL copied to clipboard"))
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  const openEditModal = (urlId) => {
    const urlToEdit = shortUrls.find((url) => url._id === urlId);
    if (urlToEdit) {
      setOriginalUrl(urlToEdit.originalUrl);
      setUrlIdToEdit(urlId);
      setEditModalIsOpen(true);
    }
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setUrlIdToEdit(null);
  };

  const handleUpdateUrl = async () => {
    if (!validateUrl(originalUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/updateurl`,
        { id: urlIdToEdit, updateUrl: originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrls((prevShortUrls) =>
        prevShortUrls.map((url) =>
          url._id === urlIdToEdit ? { ...url, originalUrl } : url
        )
      );
      toast.success(response.data.message);
      closeEditModal();
    } catch (error) {
      toast.error("Error updating URL. Please try again.");
      console.error("Error updating URL:", error);
    }
  };

  const getStatusCounts = () => {
    return shortUrls.reduce((counts, url) => {
      counts[url.status] = (counts[url.status] || 0) + 1;
      return counts;
    }, {});
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-[#0B101B] text-white">
      <div className="bg-no-repeat bg-center bg-cover bg-[url('../assets/bg.png')] min-h-screen">
        <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white">
          <header className="w-full py-4 px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#EB568E] via-[#144EE3] to-[#EB568E] text-transparent bg-clip-text">
              Linkly
            </div>
            <div className="flex items-center space-x-4 w-full max-w-4xl px-4 mt-4 md:mt-0">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row items-center w-full bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
              >
                <input
                  type="text"
                  placeholder="Enter the link here"
                  className="flex-grow bg-gray-900 border border-gray-700 rounded-full px-6 py-4 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-8 py-4 rounded-full text-sm mt-3 md:mt-0 md:ml-3 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  Shorten Now!
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <button className="flex items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-lg">
                  <span className="mr-2">Welcome, {user?.name}</span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full">
                    {shortUrls.length}
                  </span>
                </button>
              </div>
            </div>
          </header>

          <main className="w-full md:w-4/5 mt-8 px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-transparent rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-[#1D2537] text-sm uppercase">
                    <th className="py-3 px-6 text-left">Original Link</th>
                    <th className="py-3 px-6 text-left">Short Link</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Clicks</th>
                    <th className="py-3 px-6 text-left">QR Code</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shortUrls.map((url) => (
                    <tr key={url._id} className="border-b border-[#3E4978]">
                      <td className="py-3 px-6">
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-400 hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                          style={{ maxWidth: "300px" }} // Ensure the width is set to control the overflow
                        >
                          {url.originalUrl}
                        </a>
                      </td>

                      <td className="py-3 px-6 break-words max-w-xs">
                        <a
                          href={`${url.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                          style={{ maxWidth: "300px" }}
                        >
                          {`${url.shortCode}`}
                        </a>
                      </td>
                      <td
                        className={`py-3 px-6 ${
                          url.status === "active"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {url.status}
                      </td>
                      <td className="py-3 px-6">{url.clicks || 0}</td>
                      <td className="py-3 px-6">
                        <QRCode value={url.originalUrl} size={50} />
                      </td>
                      <td className="py-3 px-6 flex justify-between items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(`${url.shortCode}`)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FontAwesomeIcon icon={faClipboard} />
                        </button>
                        <button
                          onClick={() => openEditModal(url._id)}
                          className="text-yellow-400 hover:text-yellow-300"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button
                          onClick={() => handleDelete(url._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit URL</h2>
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-700 rounded-md text-gray-200 bg-gray-800 focus:outline-none"
              placeholder="Enter new URL"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdateUrl}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Update
              </button>
              <button
                onClick={closeEditModal}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mainpage;
