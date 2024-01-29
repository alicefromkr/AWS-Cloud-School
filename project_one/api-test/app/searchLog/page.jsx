"use client";

import { useState } from "react";
const page = () => {
  const [fullData, setFullData] = useState([]);
  const [IP, setIP] = useState("");
  async function getAllLog() {
    try {
      const response = await fetch(`http://192.168.0.129/log/?addr=${IP}`);
      const log_text = await response.text();
      const myLog = log_text === "" ? {} : JSON.parse(log_text);
      const myData = myLog.data.reverse();
      setFullData((prevLogData) => myData);
    } catch (error) {
      //setShowError(true);
    }
    //console.log(logData);
  }
  const handleClickData = (e) => {
    getAllLog();
  };
  return (
    <main className="flex flex-col gap-4 items-center p-24">
      <p>여기서는 Log를 검색 할 수 있어요!</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="IP 주소를 입력해주세요!"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            setIP(e.target.value);
          }}
        />
        <button
          className="btn btn-outline btn-accent"
          onClick={handleClickData}
        >
          검색
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>IP Address</th>
              <th>Local Time</th>
              <th>HTTP Method</th>
              <th>Request</th>
              <th>HTTP Status Code</th>
            </tr>
          </thead>
          <tbody>
            {fullData.length != 0 ? (
              fullData.map((t, i) => {
                var temp = t.split(" ");
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{temp[0]}</td>
                    <td>{temp[2]}</td>
                    <td>{String(temp[4]).substring(1)}</td>
                    <td>{temp[5]}</td>
                    <td>{temp[7]}</td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default page;
