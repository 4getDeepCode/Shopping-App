

import ProductFilter from '@/components/shopping-view/filter';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { sortOptions } from '@/config';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import {
  fetchAllFilteredProducts,
  fetchProductDetails
} from '@/store/shop/products-slice';
import { ArrowUpDownIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(','))}`);
    }
  }
  return queryParams.join('&');
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [filters, setFilters] = useState(() => {
    const stored = JSON.parse(sessionStorage.getItem('filters')) || {};
    if (categoryFromUrl) {
      return { ...stored, category: categoryFromUrl.split(',') };
    }
    return stored;
  });

  const [sort, setSort] = useState('price-lowtohigh');
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  /* =========================
     SYNC URL → FILTERS
  ========================== */
  useEffect(() => {
    if (categoryFromUrl) {
      const updatedFilters = {
        ...filters,
        category: categoryFromUrl.split(',')
      };
      setFilters(updatedFilters);
      sessionStorage.setItem('filters', JSON.stringify(updatedFilters));
    }
  }, [categoryFromUrl]);

  /* =========================
     SYNC FILTERS → URL
  ========================== */
  useEffect(() => {
    if (Object.keys(filters).length === 0) return;
    const queryString = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(queryString));
  }, [filters, setSearchParams]);

  /* =========================
     FETCH PRODUCTS
  ========================== */
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: filters,
        sortParams: sort
      })
    );
  }, [dispatch, filters, sort]);

  /* =========================
     OPEN DETAILS MODAL
  ========================== */
  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleSort = (value) => setSort(value);

  const handleFilter = (sectionId, optionId) => {
    setFilters((prev) => {
      const section = new Set(prev[sectionId] || []);
      section.has(optionId)
        ? section.delete(optionId)
        : section.add(optionId);

      const updated = { ...prev, [sectionId]: Array.from(section) };
      sessionStorage.setItem('filters', JSON.stringify(updated));
      return updated;
    });
  };

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddtoCart = (productId, totalStock) => {
    const items = cartItems?.items || [];
    const currentItem = items.find(
      (item) => item.productId === productId
    );

    if (currentItem && currentItem.quantity + 1 > totalStock) {
      return toast.error(
        `Only ${currentItem.quantity} quantity can be added for this item`
      );
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast('Product is added to cart');
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      <div className="relative bg-gray-900/70 rounded-xl shadow-xl shadow-black/40 p-1">
        <div className="absolute inset-0 bg-yellow-500/5 blur-3xl pointer-events-none rounded-xl" />

        <div className="relative rounded-xl overflow-hidden bg-gray-900/90">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-yellow-400">
              All Products
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-gray-400">
                {productList?.length} Products
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-gray-900 border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-yellow-400 rounded-lg"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-[220px] bg-gray-900 border border-gray-700 rounded-xl shadow-xl shadow-black/50"
                >
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.id}
                        value={option.id}
                        className="cursor-pointer text-gray-300 rounded-md mx-1 my-0.5 focus:bg-gray-800 focus:text-yellow-400 data-[state=checked]:bg-gray-800 data-[state=checked]:text-yellow-400"
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList?.map((product) => (
              <ShoppingProductTile
                key={product.id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
