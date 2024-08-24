import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import "./App.css";

function PageTemplate() {
  return (
    <div className="min-h-screen bg-[#0B101B] text-white">
      <div className="bg-no-repeat bg-center bg-cover bg-[url('./assets/bg.png')] min-h-screen">
        <header className="flex justify-between items-center px-12 pt-10 text-white shadow-md">
          <div className="text-4xl font-bold bg-gradient-to-r from-[#EB568E] via-[#144EE3] to-[#EB568E] text-transparent bg-clip-text">
            Linkly
          </div>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="flex items-center bg-[#353C4A] text-[#FFFFFF] px-6 py-3 rounded-full text-sm hover:bg-gray-600 transition-all"
            >
              <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-2" />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center bg-blue-600 px-6 py-3 rounded-full text-sm hover:bg-blue-500 transition-all"
            >
              <FontAwesomeIcon icon={faPlus} className="w-5 h-5 mr-2" />
              Register Now
            </Link>
          </div>
        </header>

        <main className="p-5 mt-10 flex flex-col items-center space-y-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-text bg-[length:200%_100%] bg-[position:0%_50%]">
              Shorten Your Loooong Links :)
            </h1>

            <p className="text-gray-400 mt-10 max-w-xl text-center   mx-24 ">
              Linkly is an efficient and easy-to-use URL shortening service that
              streamlines your online experience.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center w-full max-w-lg bg-gray-800 rounded-full p-3 shadow-lg relative group">
            <input
              type="text"
              placeholder="Enter the link here"
              className="flex-grow bg-transparent border-none outline-none px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:ring-0 focus:outline-none"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-full text-sm mt-3 md:mt-0 md:ml-3 hover:bg-blue-500 transition-all">
              Shorten Now!
            </button>

            <div className="absolute inset-0 border-2 border-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div className="flex justify-center text-sm text-gray-400 mt-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 form-checkbox rounded text-blue-500"
              />
              Auto Paste from Clipboard
            </label>
          </div>

          <div className="text-gray-400">
            You can create <span className="text-pink-500">05</span> more links.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Register Now
            </a>{" "}
            to enjoy Unlimited usage.
          </div>

          <div className="overflow-x-auto w-4/5">
            <table className="min-w-full bg-transparent rounded-full shadow-lg">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wider bg-gray-700 bg-opacity-50 rounded-lg">
                  <th className="py-3 px-6 text-left">Short Link</th>
                  <th className="py-3 px-6 text-left">Original Link</th>
                  <th className="py-3 px-6 text-left">QR Code</th>
                  <th className="py-3 px-6 text-left">Clicks</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-700">
                <tr className="hover:bg-gray-700 transition-all">
                  <td className="py-3 px-6">
                    <a href="#" className="text-blue-500 mr-3 hover:underline">
                      https://linkly.com/8nA13cO1nq
                    </a>

                    <FontAwesomeIcon icon={faClipboard} className="w-5 h-5" />
                  </td>
                  <td className="py-3 px-6 flex items-center">
                    <img
                      src="./assets/twitter.png"
                      alt="Twitter"
                      className="w-8 h-8 mr-2"
                    />
                    <span className="truncate">
                      https://www.twitter.com/tweets/&hellip;
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <img
                      src="./assets/qr.png"
                      alt="QR Code"
                      className="w-8 h-8 mx-auto"
                    />
                  </td>
                  <td className="py-3 px-6">1313</td>
                  <td className="py-3 px-6 text-green-500">Active</td>
                  <td className="py-3 px-6">Oct - 10 - 2023</td>
                </tr>
                {/* Repeat rows for other links */}
              </tbody>
            </table>
          </div>
        </main>

        <footer className="text-center p-5 text-gray-400">
          &copy; 2023 Linkly. Registered users only.
        </footer>

        <button className="fixed bottom-5 right-5 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-500 transition-all">
          Dark Theme
        </button>
      </div>
    </div>
  );
}

export default PageTemplate;
