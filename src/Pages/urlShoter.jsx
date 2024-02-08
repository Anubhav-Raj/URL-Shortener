/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";

const UrlShoter = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [urlIdToEdit, setUrlIdToEdit] = useState(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchShortUrls = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/url/allurl",
          { userid: user.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShortUrls(response.data.allurl);
      } catch (error) {
        console.error("Error fetching shortened URLs:", error);
      }
    };

    if (token) {
      fetchShortUrls();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl(originalUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/url/shorten",
        { originalUrl, userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrls((prevShortUrls) => [...prevShortUrls, response.data.url]);
      setOriginalUrl("");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/url/deleteurl",
        { id: id },
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
      console.error("Error To Delete URL:", error);
    }
  };

  const validateUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(url)) {
      return false;
    }
    const protocol = url.split("://")[0];
    if (!["http", "https"].includes(protocol)) {
      return false;
    }
    const domain = url.split("://")[1].split("/")[0];
    if (!domain) {
      return false;
    }

    return true;
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

  // Function to handle updating the original URL
  const handleUpdateUrl = async () => {
    console.log(urlIdToEdit, originalUrl);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/url/updateurl",
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
      console.error("Error updating URL:", error);
    }
  };

  return (
    <>
      <div className="flex-1 h-full p-7 bg-gray-100">
        <ToastContainer />
        <h1 className="text-2xl font-semibold text-center">URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="originalUrl"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Original Url
            </label>
            <input
              type="url"
              id="originalUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-dark-purple"
              placeholder="Enter your email"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className=" bg-purple-950 text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>

        <Modal
          title="Edit Original URL"
          visible={editModalIsOpen}
          onCancel={closeEditModal}
          footer={[
            <Button key="cancel" onClick={closeEditModal}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={handleUpdateUrl}>
              Save
            </Button>,
          ]}
        >
          <Input
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </Modal>

        {shortUrls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Shortened URLs</h2>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th className="px-4 py-2 w-1/4">Original URL</th>
                  <th className="px-4 py-2 w-1/4">Shortened URL</th>
                  <th className="px-4 py-2 w-1/6">Date</th>
                  <th className="px-4 py-2 w-1/6">Clicks</th>
                  <th className="px-4 py-2 w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shortUrls.map((url) => (
                  <tr
                    key={url._id}
                    className=" bg-gray-100  hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    <td className="px-4 cursor-pointer py-2 text-center">
                      {url.originalUrl}
                    </td>
                    <td className="px-4 cursor-pointer py-2 text-center">
                      <a
                        href={url.shortCode}
                        target="_blank"
                        className="underline"
                      >
                        {url.shortCode}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {url.clicks.length}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex cursor-pointer gap-2 justify-center">
                        <button
                          onClick={() => copyToClipboard(url.shortCode)}
                          className="text-purple-600 hover:text-purple-800 transition duration-300 ease-in-out"
                        >
                          <CopyOutlined />
                        </button>
                        <button
                          onClick={() => openEditModal(url._id)}
                          className="text-green-600 hover:text-green-800 transition duration-300 ease-in-out"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(url._id)}
                          className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UrlShoter;
