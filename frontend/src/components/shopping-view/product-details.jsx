

import { X } from "lucide-react";
import { StarIcon, } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const navigate = useNavigate();

  function handleRatingChange(r) {
    setRating(r);
  }

  function handleAddToCart(id, totalStock) {
    if (!user) {
      toast.error("Please login first!");
      navigate("/auth/login", { state: { from: "/shop/listing" } });
      return;
    }

    let items = cartItems.items || [];

    if (items.length) {
      const index = items.findIndex((item) => item.productId === id);
      if (index > -1) {
        const qty = items[index].quantity;
        if (qty + 1 > totalStock) {
          toast.error(`Only ${qty} quantity can be added for this item`);
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: id,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast("Product added to cart!");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast("Review added successfully!");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null)
      dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open}>
      <DialogContent
        className="
        p-6 sm:p-10 
        max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]
        max-h-[90vh] overflow-y-auto
        rounded-2xl

        bg-[#0a0a0a]/95 backdrop-blur-xl
        
        border border-yellow-400/40
        shadow-[0_0_25px_rgba(255,255,255,0.2),0_0_40px_rgba(255,220,0,0.4)]
        hover:shadow-[0_0_35px_rgba(255,255,255,0.4),0_0_55px_rgba(255,220,0,0.7)]

        transition-all duration-300

        grid grid-cols-1 md:grid-cols-2 gap-10
      "
      >


        {/* CLOSE BUTTON */}


        <button onClick={handleDialogClose} className=" absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-xl border border-yellow-400/70 text-yellow-300 shadow-[0_0_15px_rgba(255,255,0,0.6)] hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_25px_rgba(255,255,0,1)] transition-all duration-300 " > <X size={22} /> </button>



        {/* LEFT – IMAGE */}
        <div
          className="
          relative overflow-hidden rounded-xl 
          border border-yellow-400/60 
          shadow-[0_0_20px_rgba(255,255,0,0.4)]
        "
        >
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover rounded-lg"
          />
        </div>

        {/* RIGHT – DETAILS */}
        <div>
          {/* TITLE + DESCRIPTION */}
          <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-sm">
            {productDetails?.title}
          </h1>

          <p className="text-gray-300 text-lg mb-5 mt-4 leading-relaxed">
            {productDetails?.description}
          </p>

          {/* PRICE */}
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold ${productDetails?.salePrice > 0
                ? "line-through text-gray-500"
                : "text-yellow-400"
                }`}
            >
              ${productDetails?.price}
            </p>

            {productDetails?.salePrice > 0 && (
              <p className="text-3xl font-bold text-green-400 drop-shadow-sm">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-gray-400 text-sm">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* ADD TO CART BUTTON */}
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed bg-gray-800 text-gray-400">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="
                w-full text-lg py-3 rounded-lg
                bg-yellow-500 hover:bg-yellow-400
                text-black font-bold

                shadow-[0_0_15px_rgba(255,255,0,0.4)]
                hover:shadow-[0_0_25px_rgba(255,255,0,0.8)]

                transition-all duration-300
              "
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="bg-gray-700" />

          {/* REVIEWS */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-white">Reviews</h2>

            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div
                    key={reviewItem._id}
                    className="
                    flex gap-4 p-4 rounded-lg 
                    border border-yellow-300/20 
                    bg-[#111] shadow-[0_0_10px_rgba(255,255,0,0.2)]
                  "
                  >
                    <Avatar className="w-10 h-10 border border-yellow-400">
                      <AvatarFallback className="font-bold text-yellow-400">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid gap-1">
                      <h3 className="font-bold text-yellow-300">
                        {reviewItem?.userName}
                      </h3>

                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent
                          rating={reviewItem?.reviewValue}
                        />
                      </div>

                      <p className="text-gray-300 text-sm">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-gray-400">No Reviews</h1>
              )}
            </div>

            {/* ADD REVIEW */}
            <div
              className="
              mt-10 flex flex-col gap-2 p-4 
              border border-yellow-300/20 
              rounded-lg 
              bg-[#0e0e0e]
              shadow-[0_0_10px_rgba(255,255,0,0.2)]
            "
            >
              <Label className="font-semibold text-yellow-300">
                Write a review
              </Label>

              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>

              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
                className="
                bg-black text-white 
                border-yellow-400/40
                placeholder-gray-500
              "
              />

              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="
                bg-yellow-500 text-black font-bold
                hover:bg-yellow-400
                shadow-[0_0_10px_rgba(255,255,0,0.4)]
                hover:shadow-[0_0_20px_rgba(255,255,0,0.8)]
                transition-all duration-300
              "
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>


    </Dialog>
  );
}

export default ProductDetailsDialog;
