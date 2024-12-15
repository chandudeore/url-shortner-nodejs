import { useEffect, useRef, useState } from "react";
import { postData } from "../utils/APICalls";

interface UrlResponse {
  _id: string; // The unique identifier for the record
  urlId: string; // The shortened identifier for the URL
  origUrl: string; // The original URL
  shortUrl: string; // The shortened URL
  clicks: number; // The number of clicks on the shortened URL
  date: string; // Human-readable date when the URL was created
  createdAt: string; // ISO 8601 timestamp for when the record was created
  updatedAt: string; // ISO 8601 timestamp for the last update
}

export default function UrlShort() {
  const [file, setFile] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [copyUrl, setCopyUrl] = useState<string>("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    postData("short-url", { origUrl: file })
      .then((res: UrlResponse) => {
        setCopyUrl(res.shortUrl);
      })
      .catch((error) => console.log(error));
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(copyUrl)
      .then(() => {
        setCopySuccess(true);
      })
      .catch(() => {
        setCopySuccess(false);
      });
  };

  return (
    <main className="flex flex-col overflow-hidden">
      <section className="my-8">
        <div className="flex flex-col m-auto w-1/2">
          <label
            htmlFor="default-input"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Paste the URL to be shortened
          </label>
          <div className="flex ">
            <input
              type="text"
              id="default-input"
              ref={inputRef}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFile(event.target.value)
              }
              placeholder="Enter the link here......."
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="w-[30%]">
              <button className="text-xl py-4 w-full" onClick={handleClick}>
                Shorten URL
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex w-1/2 m-auto my-20">
          <input
            type="text"
            placeholder="Enter the link here......."
            className="border border-solid border-gray-300 p-4 w-full rounded-lg"
            value={copyUrl ?? ""}
          />
          <div className="">
            <button className="py-4 px-12" onClick={handleCopy}>
              {copySuccess ? "COPIED" : "COPY"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
