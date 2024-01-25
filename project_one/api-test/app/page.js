"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [apiCheck, setApiCheck] = useState(false);
  const [currentIP, setCurrentIP] = useState("");
  const [logData, setLogData] = useState([]);

  async function getData() {
    const response = await fetch("http://192.168.0.129/api/hello");
    const ip_text = await response.text();
    const myIP = ip_text === "" ? {} : JSON.parse(ip_text);
    setCurrentIP(myIP.ip);
    setApiCheck(true);
  }

  useEffect(() => {
    console.log(logData);
  }, [logData]);

  async function getLog() {
    const response = await fetch(`http://192.168.0.129/log/?addr=${currentIP}`);
    const log_text = await response.text();
    const myLog = log_text === "" ? {} : JSON.parse(log_text);
    setLogData((prevLogData) => myLog.data);
    //console.log(logData);
  }
  const handleClick = (e) => {
    getData();
  };

  const handleClickData = (e) => {
    getLog();
  };

  const renderRow = () => {
    {
      logData.map((d, i) => {
        d.split().map((t) => {
          var temp = t.split(" ");
          return (
            <>
              <tr>
                <td>{temp[0]}</td>
                <td>{temp[0]}</td>
                <td>{temp[0]}</td>
                <td>{temp[0]}</td>
                <td>{temp[0]}</td>
              </tr>
            </>
          );
        });
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center p-24">
      {apiCheck ? (
        <>
          <div>
            <strong>{name}</strong>님 API Gateway 모니터링 시스템에 오신 것을
            환영합니다!
          </div>
          <p>현재 IP {currentIP}</p>
          <button
            className="btn btn-outline btn-accent"
            onClick={handleClickData}
          >
            로그 갱신
          </button>

          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Local Time</th>
                  <th>HTTP Method</th>
                  <th>Request</th>
                  <th>HTTP Status Code</th>
                </tr>
              </thead>
              <tbody>
                {logData.reverse().length != 0 ? (
                  logData.map((t, i) => {
                    var temp = t.split(" ");
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{temp[2]}</td>
                        <td>{temp[4].substring(1)}</td>
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
        </>
      ) : (
        <>
          <div>
            안녕하세요! 2조의 API Gateway 모니터 시스템에 오신것을 환영합니다!
          </div>
          <div>
            모니터링에 접속하기 위해 <strong>이름</strong>을 알려주세요!
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="이름을 입력해주세요!"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              className="btn btn-outline btn-accent"
              onClick={handleClick}
            >
              확인
            </button>
            {/* <button
              className="btn btn-outline btn-accent"
              onClick={handleClickT}
            >
              test2
            </button> */}
          </div>
        </>
      )}
    </main>
  );
}
