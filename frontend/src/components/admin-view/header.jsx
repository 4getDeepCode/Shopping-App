import React from "react";
import { Button } from "../ui/button";
import { LogOut, TextAlignJustify } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logoutAndClearCart } from "@/store/actions/logout-actions";

import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    toast.success("Logged out successfully!");
    navigate("/");
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    dispatch(logoutAndClearCart());

  }

  return (
    <header
      className="
        flex items-center justify-between
        px-4 py-3
        bg-gray-900
        border-b border-gray-800
        shadow-md shadow-black/40
      "
    >
      {/* Mobile menu button */}
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className="
          lg:hidden
          text-gray-300
          hover:text-yellow-400
          hover:bg-gray-800
        "
      >
        <TextAlignJustify className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Right section */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="
            inline-flex items-center gap-2
            bg-yellow-400 text-black
            hover:bg-yellow-300
            font-semibold
            px-4 py-2
            rounded-lg
            shadow-lg
          "
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
