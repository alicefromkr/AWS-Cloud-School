import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar px-24  bg-neutral text-neutral-content sticky">
      <div className="navbar-start">2조 API Gateway Monitor</div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <Link className="btn btn-ghost" href="/">
          내 로그
        </Link>
        <Link className="btn btn-ghost" href="/fullLog">
          모든 로그
        </Link>
        <Link className="btn btn-ghost" href="/searchLog">
          로그 검색
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
