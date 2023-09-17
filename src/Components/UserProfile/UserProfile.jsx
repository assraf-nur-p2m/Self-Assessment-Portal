import React from "react";

export default function UserProfile() {
  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="flex justify-center items-center">
              <img
                className="rounded-full w-36"
                src="https://cdn-icons-png.flaticon.com/512/560/560199.png"
                alt=""
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-3xl font-bold">Assrafuzzaman Nur</p>
              <p className="font-semibold">assraf.nur@gmail.com</p>
            </div>
          </div>
          <div className="divider divider-horizontal my-4 md:my-0"></div>
          <div className="md:w-1/2 flex justify-center items-center px-4 accent-color rounded-lg">
            <div className="px-6 bg-slate-50 py-6 rounded-lg shadow-xl">
              <p className="text-2xl font-bold">Quiz Average: 78%</p>
              <p className="text-2xl font-bold">Quiz Attempts: 3</p>
              <p className="text-2xl font-bold">Last quiz mark: 20</p>
            </div>
          </div>
        </div>

        <div className="p-5 mt-5">
          <div className="flex gap-5">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
