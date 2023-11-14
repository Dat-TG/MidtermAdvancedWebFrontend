// MainLayout.tsx
import React, { useState } from "react";
import Sidebar from "../common/Sidebar";

import Appbar from "../common/Appbar";
import { Button } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogOut = (): void => {
    setIsLoggedIn(false);
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Appbar
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogOut}
      />

      <div style={{ display: "flex" }}>
        {isLoggedIn && <Sidebar open={isSidebarOpen} />}
        <main style={{ flex: 1, transition: "margin-left 0.3s" }}>
        <Button
            sx={{
              ml: 2,
              mt: 2
            }}
            variant="outlined"
            onClick={() => {
              setIsLoggedIn(!isLoggedIn);
            }}
          >
            Change Login Mode
          </Button>
          {children}
          
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
