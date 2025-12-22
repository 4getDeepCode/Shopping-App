
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />
  }
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-6 flex flex-col gap-1">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="
            flex items-center gap-3
            cursor-pointer
            rounded-lg px-3 py-2
            text-gray-400
            hover:bg-gray-800
            hover:text-yellow-400
            transition-colors
          "
        >
          <span className="text-lg">{menuItem.icon}</span>
          <span className="text-base font-medium">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="
            w-64
            bg-gray-900
            border-r border-gray-800
            text-gray-100
          "
          aria-describedby={undefined}
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-gray-800">
              <SheetTitle
                className="flex items-center gap-3 mt-4 mb-4 cursor-pointer"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ChartNoAxesCombined size={28} className="text-yellow-400" />
                <span className="text-xl font-extrabold text-yellow-400">
                  Admin Panel
                </span>
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className="
          hidden lg:flex w-64 flex-col
          bg-gray-900
          border-r border-gray-800
          p-6
          text-gray-100
        "
      >
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-3 cursor-pointer mb-6"
        >
          <ChartNoAxesCombined size={28} className="text-yellow-400" />
          <h1 className="text-xl font-extrabold text-yellow-400">
            Admin Panel
          </h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
