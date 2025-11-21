import React from 'react'
import { Button } from '../ui/button'
import { LogOut, TextAlignJustify } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';
import { toast } from "sonner";


function AdminHeader({setOpen}) {
  const dispatch = useDispatch();

  function handleLogout() {
  toast.success("Logged out successfully!");
  dispatch(logoutUser());
}

  return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
    <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
      <TextAlignJustify />
      <span className="sr-only">Toggle Menu</span>
    </Button>

    <div className="flex flex-1 justify-end">
      <Button
        onClick={handleLogout}
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
      >

        <LogOut />
        Logout
      </Button>
    </div>
  </header>
}

export default AdminHeader