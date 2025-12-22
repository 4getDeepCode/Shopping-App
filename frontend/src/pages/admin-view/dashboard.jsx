import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();
  const { featureImageList } = useSelector(
    (state) => state.commonFeature
  );

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="relative rounded-xl bg-gray-900 border border-gray-800 p-5 shadow-xl shadow-black/40">
        {/* subtle yellow glow */}
        <div className="absolute inset-0 bg-yellow-500/5 blur-3xl rounded-xl pointer-events-none"></div>

        <div className="relative space-y-4">
          <h2 className="text-lg font-extrabold text-yellow-400">
            Feature Image Upload
          </h2>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
          />

          <Button
            onClick={handleUploadFeatureImage}
            disabled={!uploadedImageUrl || imageLoadingState}
            className="
              w-full
              bg-yellow-400 text-black
              hover:bg-yellow-300
              font-semibold
            "
          >
            Upload Image
          </Button>
        </div>
      </div>

      {/* Image List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem, index) => (
              <div
                key={featureImgItem._id || index}
                className="
                  bg-gray-900
                  border border-gray-800
                  rounded-xl
                  p-3
                  shadow-lg shadow-black/40
                  transition
                  hover:border-yellow-400/40
                "
              >
                {featureImgItem.image && (
                  <img
                    src={featureImgItem.image}
                    alt="Feature"
                    className="
                      w-full
                      h-48
                      object-contain
                      rounded-lg
                      bg-black
                    "
                  />
                )}

                <Button
                  variant="destructive"
                  className="w-full mt-3 cursor-pointer"
                  onClick={() => {
                    dispatch(deleteFeatureImage(featureImgItem._id)).then(
                      () => dispatch(getFeatureImages())
                    );
                  }}
                >
                  Delete Image
                </Button>
              </div>
            ))
          : (
            <p className="text-gray-500 text-sm col-span-full text-center">
              No feature images uploaded yet
            </p>
          )}
      </div>
    </div>
  );
}

export default AdminDashboard;


