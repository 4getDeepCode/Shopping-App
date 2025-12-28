import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { X } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  return (
    <SheetContent className="sm:max-w-md px-6 flex flex-col h-full bg-black/80 backdrop-blur-md rounded-xl shadow-xl">

      <SheetClose asChild>
        <button className=" absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-xl border border-yellow-400/70 text-yellow-300 shadow-[0_0_15px_rgba(255,255,0,0.6)] hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_25px_rgba(255,255,0,1)] transition-all duration-300 " > <X size={22} /> </button>
      </SheetClose>


      <SheetHeader>
        <SheetTitle className="text-xl font-semibold text-yellow-400">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      {/* Scrollable Cart Items */}
      <div className="mt-6 flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent
              key={item.productId || item._id}
              cartItem={item}
              className="bg-gray-900/60 hover:shadow-neon transition-shadow rounded-xl p-3"
            />
          ))
        ) : (
          <p className="text-center text-gray-400">Your cart is empty</p>
        )}
      </div>

      {/* Bottom fixed block */}
      <div className="  mt-4 pt-4  rounded-b-xl">
        <div className="flex justify-between font-bold text-lg mb-4 text-yellow-400">
          <span>Total</span>
          <span>${totalCartAmount.toFixed(2)}</span>
        </div>

        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full py-5 mb-4 text-lg rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 transition-all"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
