import React, { useState } from "react";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-black">
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex flex-1 flex-col bg-gray-900">
        <AdminHeader setOpen={setOpenSidebar} />

        <main
          className="
            flex-1
            p-4 md:p-6
            bg-gradient-to-br
            from-gray-900
            via-gray-900
            to-black
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
