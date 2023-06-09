import React from "react";

function detailsModal({ data, closeModal }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center bg-black bg-opacity-50 p-8">
      <div className="">
        <div className="min-h-[12rem] w-[300px] md:w-[600px] bg-white rounded-[32px] flex flex-col justify-center p-4 md:p-6 relative">
          <div>
            <div className="flex gap-x-4 items-center mb-2">
              <img
                className="h-10 w-10"
                src={data.flags.svg}
                alt={`Flag of ${data.name.common}`}
              />
              <span className="font-bold text-base">{data.name.common}</span>
            </div>
            <div className="mb-2">
              <span>Continent</span> :
              <span className="font-medium "> {data.continents}</span>
            </div>
            <div className="mb-2">
              <span>Official name</span> :
              <span className="font-medium "> {data.name.official}</span>
            </div>
          </div>

          <div className="flex gap-x-10 justify-end">
            <button
              type="button"
              className="flex justify-end rounded-md border border-darkBlue mt-4 shadow-sm px-8 py-2 md:px-10 md:py-2 bg-red-500 text-sm font-medium text-white  sm:ml-3 sm:w-auto sm:text-sm mb-4 sm:mb-0"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default detailsModal;
