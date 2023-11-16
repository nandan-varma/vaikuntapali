import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(2, 10);
}

const buttonStyle = {
  padding: "2rem",
  width: "20rem"
}

const Index = () => {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "20px",
          }}
        >
          <button onClick={()=>{router.push('/board')}}>
            Play Over Board
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
