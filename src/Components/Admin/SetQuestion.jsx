import React from "react";

export default function SetQuestion() {
  return (
    <div className="p-2 shadow-lg rounded-xl">
      <div className="p-2">
        <div className="form-control p-4">
          <label className="label mb-0">
            <span className="label-text mb-0">Write your Question here </span>
          </label>
          <input
            type="text"
            placeholder="Question....."
            className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
          />
        </div>

        <div className="mt-2">
          <div className="grid grid-cols-2">
            <div className="p-4">
              <label className="label mb-0">
                <span className="label-text mb-0">
                  Options for the Question
                </span>
              </label>
              <div className="grid grid-cols-1 gap-5">
                <input
                  type="text"
                  placeholder="Option A"
                  className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
                />
                <input
                  type="text"
                  placeholder="Option B"
                  className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
                />
              </div>
            </div>
            <div>
              <div className="p-4 h-full">
                <label className="label mb-0">
                  <span className="label-text mb-0">Description of answer</span>
                </label>

                <textarea
                  className="textarea textarea-bordered w-full h-[15.7rem] shadow-md text-lg"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
