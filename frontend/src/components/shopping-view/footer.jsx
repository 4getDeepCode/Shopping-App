import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone
} from "lucide-react";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-800 mt-20">

      {/* Soft glow */}
      <div className="absolute inset-0 bg-yellow-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-xl font-extrabold text-yellow-400 mb-3">
              DEEP Marketplace
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for premium products at the best prices.
              Shop smart. Shop fast. Shop Deep.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/shop/home" className="hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop/listing" className="hover:text-yellow-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/shop/account" className="hover:text-yellow-400 transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/shop/cart" className="hover:text-yellow-400 transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Accessories</li>
              <li>Footwear</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-yellow-400" />
                support@deepmarketplace.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                +91 98765 43210
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Deep Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
