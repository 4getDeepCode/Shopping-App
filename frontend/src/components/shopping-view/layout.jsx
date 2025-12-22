
import React from 'react';
import { Outlet } from 'react-router-dom';
import ShoppingHeader from './header';

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 relative overflow-hidden">

      {/* Yellow Glow Behind Layout */}
      <div className="absolute inset-0 bg-yellow-500/5 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <ShoppingHeader />

      {/* Main Content */}
      <main className="flex flex-col w-full px-4 md:px-6 pt-6 relative z-10">
        {/* Wrap content in a shadowed container for consistency with header */}
        <div className="bg-gray-900/70 backdrop-blur-xl shadow-xl shadow-black/40 rounded-xl p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ShoppingLayout;
