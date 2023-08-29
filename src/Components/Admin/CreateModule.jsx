import React from "react";

export default function CreateModule() {
  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-[96vh]">
        <div>
          <div className="form-control p-4">
            <label className="label mb-0">
              <span className="label-text mb-0">
                Write your Module name....{" "}
              </span>
            </label>
            <input
              name="question"
              type="text"
              placeholder="Module Name.."
              className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
            />
          </div>

          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
