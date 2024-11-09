import React from "react";

export default function UrlShort() {
  return (
    <div className="overflow-hidden top-1/2 absolute left-96">
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-6 w-[50vw]">
            <label
              htmlFor="default-input"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Paste the URL to be shortened
            </label>
            <input
              type="text"
              id="default-input"
              placeholder="Enter the link here......."
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* <input
            type="text"
            placeholder="Enter the link here......."
            className="border border-solid border-gray-300 p-2 "
          />{" "} */}
          <br />
          <button className="w-[20vw] text-xl">Shorten URL</button>
        </div>
      </div>
    </div>
  );
}
