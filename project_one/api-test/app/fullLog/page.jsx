"use client";

import { useState } from "react";
const page = () => {
  const [fullData, setFullData] = useState([]);
  async function getAllLog() {
    try {
      const response = await fetch(`http://192.168.0.129/log/all`);
      const log_text = await response.text();
      const myLog = log_text === "" ? {} : JSON.parse(log_text);
      const fData = myLog.data.reverse();
      fData.shift();
      setFullData((prevLogData) => fData);
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
      <p>여기서는 전체 Access Log를 볼 수 있어요!</p>

      <button className="btn btn-outline btn-accent" onClick={handleClickData}>
        로그 갱신
      </button>
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
