

import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  return (
    <Card className="w-full max-w-xs mx-auto space-y-2 bg-[#0a0a0a] border border-yellow-400/30 shadow-[0_0_15px_rgba(255,255,0,0.2)] hover:shadow-[0_0_25px_rgba(255,255,0,0.6)] transition-all duration-300 rounded-xl overflow-hidden">
      
      <div onClick={() => handleGetProductDetails(product?._id)} className=" cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[220px] object-cover rounded-t-xl"
          />

          {/* BADGES */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,0,0.7)]">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-black shadow-[0_0_10px_rgba(255,255,0,0.7)]">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 text-black shadow-[0_0_10px_rgba(0,255,0,0.5)]">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          {/* TITLE */}
          <h2 className="text-lg font-bold mb-2 text-yellow-300 drop-shadow-sm">
            {product?.title}
          </h2>

          {/* CATEGORY & BRAND */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-gray-400">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          {/* PRICE */}
          <div className="flex justify-between items-center">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-500" : "text-yellow-400"
              } text-base font-semibold`}
            >
              ${product?.price}
            </span>

            {product?.salePrice > 0 && (
              <span className="text-base font-semibold text-green-400 drop-shadow-sm">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* ADD TO CART BUTTON */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed bg-gray-800 text-gray-400">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="
              w-full
              bg-yellow-500 hover:bg-yellow-400
              text-black font-bold
              shadow-[0_0_10px_rgba(255,255,0,0.4)]
              hover:shadow-[0_0_20px_rgba(255,255,0,0.8)]
              transition-all duration-300
            "
          >
            Add to cart
          </Button>
        )}
      </CardFooter>

      
    </Card>
  );
}

export default ShoppingProductTile;
