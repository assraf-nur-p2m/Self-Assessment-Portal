import React, { useEffect, useState } from "react";

export default function Level1() {
  const [question1, setQuestion1] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/question/1")
      .then((res) => res.json())
      .then((data) => {
        setQuestion1(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="p-2 shadow-lg rounded-xl border">
      <h1 className="text-center text-4xl font-semibold mb-0">
        Level-1 Question Set
      </h1>
      <div className="divider mt-0"></div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="">ID</th>
              <th>Questions</th>
              <th>Options</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {question1.map((item, index) => (
              <tr
                key={index}
                className="hover bg-slate-100 border-b border-gray-300"
              >
                <th>{item.id}</th>
                <td>{item.context}</td>
                <td>
                  <div>
                    <p
                      className={
                        item.answer.correctAnswer === "A"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      A. {item.answer.a}
                    </p>
                    <p
                      className={
                        item.answer.correctAnswer === "B"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      B. {item.answer.b}
                    </p>
                    <p
                      className={
                        item.answer.correctAnswer === "C"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      C. {item.answer.c}
                    </p>
                    <p
                      className={
                        item.answer.correctAnswer === "D"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      D. {item.answer.d}
                    </p>
                  </div>
                </td>
                <td width="30">
                  <div className="flex gap-5">
                    <button className="btn btn-sm bg-blue-200">Edit</button>
                    <button className="btn btn-sm bg-red-200">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
