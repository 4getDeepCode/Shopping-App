
import {
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { logoutAndClearCart } from "@/store/actions/logout-actions";
import Logo from "@/assets/logo/deep10.png";
import { resetTokenAndCredentials } from "@/store/auth-slice";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");




  function handleNavigate(item) {
    const filter =
      item.id !== "home" &&
        item.id !== "products" &&
        item.id !== "search"
        ? { category: [item.id] }
        : null;

    if (filter) {
      sessionStorage.setItem("filters", JSON.stringify(filter));
    } else {
      sessionStorage.removeItem("filters");
    }

    if (location.pathname.includes("listing") && filter) {
      setSearchParams({ category: item.id });
    } else {
      navigate(item.path);
    }
  }



  return (

    <nav className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center mb-3 lg:mb-0">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive =
          (menuItem.id === "home" && location.pathname === "/shop/home") ||
          (menuItem.id === "products" &&
            location.pathname.includes("/listing") &&
            !categoryFromUrl) ||
          menuItem.id === categoryFromUrl;

        return (
          <button
            key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            className={`
          relative px-5 py-2 rounded-full text-sm font-semibold
          transition-all duration-300 ease-out
          group
          ${isActive
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-500/40 scale-105"
                : "text-gray-300 hover:text-yellow-400 hover:bg-white/10"
              }
        `}
          >
            {/* Glow ring */}
            {isActive && (
              <span className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md -z-10" />
            )}

            {/* Hover underline */}
            <span
              className={`
            absolute bottom-0 left-1/2 h-[2px] bg-yellow-400 rounded-full
            transition-all duration-300
            ${isActive
                  ? "w-4/5 -translate-x-1/2"
                  : "w-0 group-hover:w-4/5 group-hover:-translate-x-1/2"
                }
          `}
            />

            {menuItem.label}
          </button>
        );
      })}
    </nav>


  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    dispatch(logoutAndClearCart());

  }

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user.id));
  }, [dispatch, user?.id]);

  return (

    <div className="flex lg:items-center lg:flex-row flex-col gap-4">

      {/* CART */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="
        relative
        border border-gray-700
        bg-gray-900
        hover:bg-gray-800
        transition-all duration-300
        hover:scale-105
        hover:shadow-lg hover:shadow-yellow-500/30
      "
        >
          {/* Glow */}
          <span className="absolute inset-0 rounded-md bg-yellow-500/20 blur-md opacity-0 hover:opacity-100 transition" />

          <ShoppingCart className="w-6 h-6 text-gray-300 relative z-10" />

          {/* Badge */}
          <span className="
        absolute -top-2 -right-2
        min-w-[18px] h-[18px]
        flex items-center justify-center
        text-[10px] font-bold
        bg-yellow-500 text-black
        rounded-full
        shadow-md shadow-yellow-500/40
      ">
            {cartItems?.items?.length || 0}
          </span>
        </Button>

        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items ?? []}
        />
      </Sheet>

      {/* USER DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="
        relative
        cursor-pointer
        bg-black
        border border-gray-700
        shadow-lg shadow-yellow-500/10
        transition-all duration-300
        hover:scale-105
        hover:shadow-yellow-500/30
      ">
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-full bg-yellow-500/20 blur-md opacity-0 hover:opacity-100 transition" />

            <AvatarFallback className="
          relative z-10
          bg-gray-900
          text-yellow-400
          font-bold uppercase
        ">
              {user?.userName?.[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          className="
        w-56
        bg-gray-900/95
        backdrop-blur-xl
        border border-gray-700
        text-gray-200
        rounded-xl
        shadow-xl shadow-black/60
        animate-in fade-in zoom-in-95
      "
        >
          <DropdownMenuLabel className="text-gray-400">
            Logged in as{" "}
            <span className="text-white font-semibold">
              {user?.userName}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-700" />

          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="
          cursor-pointer
          rounded-md
          hover:bg-yellow-500/20
          hover:text-yellow-400
          transition
        "
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-700" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="
          cursor-pointer
          rounded-md
          text-red-400
          hover:bg-red-500/20
          hover:text-red-500
          transition
        "
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>

  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setOpenMobileMenu(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (


    <header className="
             sticky top-0 w-full z-50
             border-b border-white/10
             bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90
             backdrop-blur-xl
             shadow-xl shadow-black/60
           ">

      {/* Soft yellow ambient glow */}
      <div className="absolute inset-0 bg-yellow-500/10 blur-3xl opacity-20 pointer-events-none" />

      <div className="relative z-10 flex h-16 items-center justify-between px-4 md:px-6">

        {/* LOGO */}
        <Link
          to="/shop/home"
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            {/* Logo glow */}
            <span className="absolute inset-0 rounded-xl bg-yellow-500/30 blur-md opacity-0 group-hover:opacity-100 transition" />

            <img
              src={Logo}
              alt="Deep Marketplace Logo"
              className="
            relative z-10
            h-12 w-36
            rounded-xl
            object-cover
            border border-gray-700
            shadow-lg shadow-yellow-500/10
            transition-transform duration-300
            group-hover:scale-105
          "
            />
          </div>
        </Link>

        {/* MOBILE MENU */}
        <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="
            lg:hidden
            border border-gray-700
            bg-gray-900/80
            hover:bg-gray-800
            transition-all duration-300
            hover:scale-105
            hover:shadow-lg hover:shadow-yellow-500/20
          "
            >
              <Menu className="h-6 w-6 text-gray-200" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="
          w-full max-w-xs
          bg-gray-900/95
          backdrop-blur-xl
          text-gray-200
          border-r border-gray-800
          shadow-xl shadow-black/60
        "
          >
            <MenuItems />
            <div className="mt-6">
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* DESKTOP */}
        <div className="hidden lg:flex gap-10 items-center">
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>

  );
}

export default ShoppingHeader;
