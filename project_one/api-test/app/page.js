"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [apiCheck, setApiCheck] = useState(false);
  const [currentIP, setCurrentIP] = useState("");
  const [logData, setLogData] = useState([]);
  const [showError, setShowError] = useState(false);

  async function getData() {
    try {
      const response = await fetch("http://192.168.0.129/api/hello");
      const ip_text = await response.text();
      const myIP = ip_text === "" ? {} : JSON.parse(ip_text);
      setCurrentIP(myIP.ip);
      setApiCheck(true);
    } catch (error) {
      setShowError(true);
    }
  }

  // useEffect(() => {
  //   console.log(logData);
  // }, [logData]);

  async function getLog() {
    try {
      const response = await fetch(
        `http://192.168.0.129/log/?addr=${currentIP}`
      );
      const log_text = await response.text();
      const myLog = log_text === "" ? {} : JSON.parse(log_text);
      const myData = myLog.data.reverse();
      setLogData((prevLogData) => myData);
    } catch (error) {
      setShowError(true);
    }
    //console.log(logData);
  }

  const handleClick = (e) => {
    getData();
  };

  const handleClickData = (e) => {
    getLog();
  };

  return (
    <main className="flex flex-col gap-4 items-center px-24">
      <div
        className={`card w-96 bg-red-100 shadow-xl ${
          showError ? "visible" : "invisible"
        }`}
      >
        <div className="card-body">
          <h2 className="card-title">앗!</h2>
          <p>
            서버에 오류가 있습니다. 2조에게 연락을 하셔서 서버 확인을
            요청하세요!
          </p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-error"
              onClick={() => setShowError(false)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
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
                {logData.length != 0 ? (
                  logData.map((t, i) => {
                    var temp = t.split(" ");
                    return (
                      <tr key={i}>
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
          </div>
        </>
      )}
    </main>
  );
}
