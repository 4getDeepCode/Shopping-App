
import ProductImageUpload from '@/components/admin-view/image-upload';
import AdminProductTile from '@/components/admin-view/product-tile';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function resetForm() {
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setCurrentEditedId(null);
  }

  async function onSubmit(event) {
    event.preventDefault();

    // EDIT PRODUCT
    if (currentEditedId !== null) {
      try {
        const data = await dispatch(
          editProduct({ id: currentEditedId, formData })
        );

        if (data?.error) {
          toast.error("Failed to update product. Try again.");
          return;
        }

        if (data?.payload?.success) {
          toast.success("Product updated successfully!");
          resetForm();
          setOpenCreateProductsDialog(false);
          dispatch(fetchAllProducts());
        }
      } catch {
        toast.error("Something went wrong while updating.");
      }
      return;
    }

    // ADD NEW PRODUCT
    try {
      const data = await dispatch(
        addNewProduct({ ...formData, image: uploadedImageUrl })
      );

      if (data?.error) {
        toast.error("Failed to add product. Try again.");
        return;
      }

      if (data?.payload?.success) {
        toast.success("Product added successfully!");
        resetForm();
        setOpenCreateProductsDialog(false);
        dispatch(fetchAllProducts());
      }
    } catch {
      toast.error("Something went wrong while adding product.");
    }
  }

  function handleDelete(id) {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product deleted successfully!");
        dispatch(fetchAllProducts());
      } else {
        toast.error("Failed to delete product.");
      }
    });
  }
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts()).then((res) => {
      if (res?.error) toast.error("Failed to load products.");
    });
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-6 w-full flex justify-end ">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 shadow"
        >
          + Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.length > 0
          ? productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id || productItem.id}
              product={productItem}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={handleDelete}
            />
          ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) resetForm();
          setOpenCreateProductsDialog(isOpen);
        }}
      >
        <SheetContent side="right" className="overflow-auto pl-2 bg-gray-900 border-r border-gray-800 text-yellow-400 ">
          <SheetHeader>
            <SheetTitle className="text-yellow-400">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
