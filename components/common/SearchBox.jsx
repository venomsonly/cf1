import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function SearchBox({ className, buttonStyle, service }) {
  let router = useRouter();
  const [input, setInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);

  //   Search Function
  const searchMe = async () => {
    const endpoint = `https://${
      process.env.NEXT_PUBLIC_API
    }/search?_sk=${input.toLowerCase()}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (input.length > 4) {
      setLoading(true);
      setSearchError("");
      const response = await fetch(endpoint, options);
      const data = await response.json();

      // Search type is zip
      if (/^\d+$/.test(input)) {
        const route = data.find((obj) => obj.zip_name === input);
        if (route) {
          router.push(
            `/${service}/${route["state_name"].replaceAll(" ", "-")}/${route[
              "county_name"
            ].replaceAll(" ", "-")}/${route["city_name"].replaceAll(
              " ",
              "-"
            )}/${input}`
          );
          setSearchError("");
        } else {
          setSearchError("Please enter correct zip");
        }
      }

      // Search type is city
      else {
        if (data.length > 0) {
          const route = data.find((obj) => obj.service_name === { service });
          router.push(`/${route.nation_type_city_route}`);
        } else {
          setSearchError("please enter correct city name");
        }
      }
      setInput("");
      setLoading(false);
    } else {
      setLoading(false);
      setSearchError("Please enter atleat 5 digits.");
    }
  };

  return (
    <div
      className={`lg:max-w-2xl relative w-full z-10 backdrop-blur-sm lg:bg-white lg:shadow ${className}`}
    >
      <div className="flex items-center flex-col lg:flex-row justify-center gap-2">
        <div className="flex items-center w-full appearance-none px-3 rounded-full bg-white text-black py-2 flex-1">
          <MagnifyingGlassIcon className="w-5 text-primary" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zip code"
            onKeyPress={(e) => e.key === "Enter" && searchMe()}
            type="number"
            className="bg-transparent flex-1 w-full outline-none ml-3 py-1 lg:py-0 appearance-none"
          />
        </div>
        <button
          onClick={searchMe}
          className={`btnPrimary lg:mt-2 lg:mt-0 w-full lg:w-auto ${buttonStyle}`}
        >
          Search
        </button>
      </div>
      <div className="absolute w-full flex items-center justify-center flex-col lg:items-start lg:pl-5">
        {searchError && (
          <p className=" bg-red-100 px-4 py-2 mt-3 rounded-md text-red-600 text-center">
            {searchError}
          </p>
        )}
        {loading && (
          <p className="bg-blue-50 text-primary px-4 py-2 mt-3 rounded-md mb-1 text-center">
            Looking for desired area...
          </p>
        )}
      </div>
    </div>
  );
}
