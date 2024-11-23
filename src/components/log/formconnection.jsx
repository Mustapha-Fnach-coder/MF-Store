import { useState } from "react";

const Formconnection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => setShowModal(!showModal);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
        onClick={handleToggleModal}
      >
        Connection
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <button
              onClick={handleToggleModal}
              className="mt-4 w-full text-red-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formconnection;
