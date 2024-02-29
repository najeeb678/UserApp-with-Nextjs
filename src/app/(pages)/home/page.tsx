"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Box } from "@mui/material";

import GlobalButton from "@/components/UI/GlobalButton";

const Home = () => {
  const router = useRouter();
  const logoutFunction = () => {
    localStorage.removeItem("token");
    console.log("logged out");
    router.push("/");
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h2>Welcome {}</h2>
      <Box sx={{ margin: "50px" }}>
        <GlobalButton
          title="Log Out"
          onClick={() => {

            logoutFunction();
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
