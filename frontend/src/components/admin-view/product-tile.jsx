import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card
      className="
        w-full max-w-sm mx-auto
        bg-gray-900
        border border-gray-800
        text-gray-100
        overflow-hidden
      "
    >
      {/* PRODUCT IMAGE */}
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[280px] object-cover"
        />

        {product?.salePrice > 0 && (
          <span className="
            absolute top-3 right-3
            bg-yellow-400 text-black
            text-xs font-bold
            px-3 py-1 rounded-full
          ">
            SALE
          </span>
        )}
      </div>

      {/* CONTENT */}
      <CardContent className="pt-4">
        <h2 className="text-lg font-semibold mb-2 truncate">
          {product?.title}
        </h2>

        <div className="flex items-center justify-between">
          <span
            className={`text-lg font-semibold ${
              product?.salePrice > 0
                ? "line-through text-gray-500"
                : "text-yellow-400"
            }`}
          >
            ${product?.price}
          </span>

          {product?.salePrice > 0 && (
            <span className="text-lg font-bold text-yellow-400">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      {/* ACTIONS */}
      <CardFooter className="flex justify-between gap-3 pt-2">
        <Button
          className="
            flex-1
            bg-yellow-400
            text-black
            hover:bg-yellow-500
          "
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>

        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => handleDelete(product?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
