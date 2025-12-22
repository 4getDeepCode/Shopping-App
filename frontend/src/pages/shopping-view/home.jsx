import { Button } from "@/components/ui/button";

import { ChevronLeftIcon, ChevronRightIcon, } from "lucide-react";

import menImg from "../../assets/categories/men.png";
import womenImg from "../../assets/categories/women.png";
import kidsImg from "../../assets/categories/kids.png";
import accessoriesImg from "../../assets/categories/accessories.png";
import footwearImg from "../../assets/categories/footwear.png";

import nikeImg from "../../assets/brands/nike.png";
import adidasImg from "../../assets/brands/adidas.png";
import pumaImg from "../../assets/brands/puma.png";
import leviImg from "../../assets/brands/levi.png";
import zaraImg from "../../assets/brands/zara.png";
import hmImg from "../../assets/brands/hm.png";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails, } from "../../store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { toast } from "sonner";
import Footer from "../../components/shopping-view/footer";



const categoriesWithImage = [
  { id: "men", label: "Men", image: menImg },
  { id: "women", label: "Women", image: womenImg },
  { id: "kids", label: "Kids", image: kidsImg },
  { id: "accessories", label: "Accessories", image: accessoriesImg },
  { id: "footwear", label: "Footwear", image: footwearImg },
];



const brandsWithImage = [
  { id: "nike", label: "Nike", image: nikeImg },
  { id: "adidas", label: "Adidas", image: adidasImg },
  { id: "puma", label: "Puma", image: pumaImg },
  { id: "levi", label: "Levi's", image: leviImg },
  { id: "zara", label: "Zara", image: zaraImg },
  { id: "h&m", label: "H&M", image: hmImg },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(id) {
    dispatch(fetchProductDetails(id));
  }

  function handleAddtoCart(productId) {
    if (!user) {
      toast.error("Please login first!");
      navigate("/auth/login");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart");
      }
    });
  }

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  // 🔥 Auto slider
  useEffect(() => {
    if (featureImageList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % featureImageList.length
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [featureImageList.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-gray-200">

      <div className="relative w-full h-[600px] overflow-hidden">

        {/* Slides */}
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              className={`${index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700`}
            />
          ))
          : null}

        {/* Soft gradient overlay (fixes dark-mode visibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>

        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 
               bg-white/50 dark:bg-white/20 hover:bg-white/70 dark:hover:bg-white/40
               text-black dark:text-white backdrop-blur-md rounded-full shadow"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 -translate-y-1/2
               bg-white/50 dark:bg-white/20 hover:bg-white/70 dark:hover:bg-white/40
               text-black dark:text-white backdrop-blur-md rounded-full shadow"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featureImageList.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index
                ? "bg-yellow-400 dark:bg-yellow-300 scale-110"
                : "bg-gray-400 dark:bg-gray-200 opacity-70"
                }`}
            ></div>
          ))}
        </div>
      </div>


      {/* 🌟 CATEGORY SECTION */}
      <section className="py-14 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-yellow-400 drop-shadow mb-10">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithImage.map((item) => {
              return (

                <Card
                  key={item.id}
                  onClick={() => handleNavigateToListingPage(item, "category")}
                  className="group relative h-48 md:h-56 overflow-hidden rounded-xl cursor-pointer
                   border border-gray-800 bg-black
                   hover:border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-xl transition"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t 
                  from-black/80 via-black/40 to-transparent"></div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-1">
                    <div className="bg-black/60 backdrop-blur-md rounded-md text-center 
                    border border-yellow-400/30">
                      <span className="block text-lg font-extrabold text-yellow-400 tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </Card>


              );

            })}
          </div>
        </div>
      </section>

      {/* 🌟 BRAND SECTION */}
      <section className="py-14 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-10">
            Shop by Brand
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithImage.map((item) => {

              return (

                <Card
                  key={item.id}
                  onClick={() => handleNavigateToListingPage(item, section)}
                  className="group relative h-48 md:h-56 overflow-hidden rounded-xl cursor-pointer
             border border-gray-800 bg-black
             hover:border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-xl transition"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover
               transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t 
                  from-black/80 via-black/40 to-transparent"></div>

                  {/* Bottom Highlighted Label */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-1">
                    <div className="bg-black/70 backdrop-blur-md rounded-md 
                    border border-yellow-400/40 text-center ">
                      <span className="text-lg font-extrabold text-yellow-400 tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </Card>


              );


            })}
          </div>
        </div>
      </section>

      {/* 🌟 FEATURE PRODUCTS */}
      <section className="py-14 bg-gradient-to-t from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-10">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList?.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      <Footer />
    </div>
    
  );
}

export default ShoppingHome;
