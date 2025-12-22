

import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(item, type) {
    if (type === "plus") {
      const currentCartItem = cartItems.items.find(
        (i) => i.productId === item.productId
      );
      const productIndex = productList.findIndex(
        (p) => p._id === item.productId
      );
      const totalStock = productList[productIndex]?.totalStock || 0;

      if (currentCartItem.quantity + 1 > totalStock) {
        toast.error(`Only ${totalStock} quantity can be added for this item`);
        return;
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: item.productId,
        quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success)
        toast.success("Cart item updated successfully");
    });
  }

  function handleCartItemDelete(item) {
    dispatch(deleteCartItem({ userId: user?.id, productId: item.productId })).then(
      (data) => {
        if (data?.payload?.success)
          toast.success("Cart item deleted successfully");
      }
    );
  }

  return (
    <div
      className="
      flex items-center space-x-4 
      bg-gray-900/60 backdrop-blur-md
      transition-shadow rounded-xl p-4
      mt-2
      border border-yellow-400/70
      shadow-[0_0_10px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,0,0.4)]
      hover:shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_25px_rgba(255,255,0,0.8)]
    "
    >
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-lg object-cover border border-yellow-400/60 shadow-lg"
      />

      <div className="flex-1">
        <h3 className="font-extrabold text-yellow-400">{cartItem?.title}</h3>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full border-yellow-400 text-yellow-400 hover:bg-yellow-500/20"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>

          <span className="font-semibold text-white">
            {cartItem?.quantity}
          </span>

          <Button
            variant="outline"
            className="h-8 w-8 rounded-full border-yellow-400 text-yellow-400 hover:bg-yellow-500/20"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold text-yellow-400">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>

        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-2 text-red-500 hover:text-red-600"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
