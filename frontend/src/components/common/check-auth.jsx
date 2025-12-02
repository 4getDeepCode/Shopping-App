// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//     const location = useLocation();

//     console.log(location.pathname, isAuthenticated);

//     if (location.pathname === "/") {
//         if (!isAuthenticated) {
//             return <Navigate to="/auth/login" />;
//         } else {
//             if (user?.role === "admin") {
//                 return <Navigate to="/admin/dashboard" />;
//             } else {
//                 return <Navigate to="/shop/home" />;
//             }
//         }
//     }

//     if (
//         !isAuthenticated &&
//         !(
//             location.pathname.includes("/login") ||
//             location.pathname.includes("/register")
//         )
//     ) {
//         return <Navigate to="/auth/login" />;
//     }

//     if (
//         isAuthenticated &&
//         (location.pathname.includes("/login") ||
//             location.pathname.includes("/register"))
//     ) {
//         if (user?.role === "admin") {
//             return <Navigate to="/admin/dashboard" />;
//         } else {
//             return <Navigate to="/shop/home" />;
//         }
//     }

//     if (
//         isAuthenticated &&
//         user?.role !== "admin" &&
//         location.pathname.includes("admin")
//     ) {
//         return <Navigate to="/unauth-page" />;
//     }

//     if (
//         isAuthenticated &&
//         user?.role === "admin" &&
//         location.pathname.includes("shop")
//     ) {
//         return <Navigate to="/admin/dashboard" />;
//     }

//     return <>{children}</>;
// }

// export default CheckAuth;































import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // ---------- 1. Root route ----------
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/shop/home" replace />;
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }

  // ---------- 2. Public SHOP routes (NO AUTH REQUIRED) ----------
  const publicShopRoutes = ["/shop/home", "/shop/listing", "/shop/search"];
  const isPublicShopRoute = publicShopRoutes.includes(path);

  if (isPublicShopRoute) {
    return <>{children}</>;
  }

  // ---------- 3. Protected SHOP routes ----------
  const protectedShopRoutes = ["/shop/checkout", "/shop/account"];
  const isProtectedShopRoute = protectedShopRoutes.includes(path);

  if (isProtectedShopRoute && !isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  // ---------- 4. Public auth pages ----------
  if (
    !isAuthenticated &&
    (path.includes("/login") || path.includes("/register"))
  ) {
    return <>{children}</>;
  }

  // ---------- 5. Prevent logged-in users from seeing login/register ----------
  if (
    isAuthenticated &&
    (path.includes("/login") || path.includes("/register"))
  ) {
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }

  // ---------- 6. Admin protection ----------
  if (path.startsWith("/admin")) {
    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
    if (user?.role !== "admin") return <Navigate to="/unauth-page" replace />;
  }

  // ---------- 7. If authenticated admin visits shop, redirect ----------
  if (isAuthenticated && user?.role === "admin" && path.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;

