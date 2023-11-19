// MainLayout.tsx
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";

import Appbar from "../../common/Appbar";
import { Outlet } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import { logoutUser } from '@/store/user/thunkApi';

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { user } = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(user);
  }, [user]);

  const onLogout = () => {
    logoutUser();
  };

  return (
    <>
      <Appbar
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />
      <div style={{ display: 'flex' }}>
        {isLoggedIn && <Sidebar open={isSidebarOpen} />}
        <main
          style={{ flex: 1, transition: 'margin-left 0.3s', marginTop: '64px' }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;
