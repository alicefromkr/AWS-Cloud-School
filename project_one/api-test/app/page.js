"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  console.log(name);
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/home");
  };
  return (
    <main className="flex min-h-screen flex-col gap-2 items-center p-24">
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
        <button className="btn btn-outline btn-accent" onClick={handleClick}>
          확인
        </button>
      </div>
    </main>
  );
}
