import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && !currentEditedId) {
      setFormData(initialAddressFormData);
      toast.error("You can add max 3 addresses");
      return;
    }

    if (currentEditedId) {
      dispatch(
        editaAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          toast.success("Address updated successfully");
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialAddressFormData);
          toast.success("Address added successfully");
        }
      });
    }
  }

  function handleDeleteAddress(address) {
    dispatch(deleteAddress({ userId: user?.id, addressId: address._id })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          toast.success("Address deleted successfully");
        }
      }
    );
  }

  function handleEditAddress(address) {
    setCurrentEditedId(address?._id);
    setFormData({ ...address });
  }
function isFormValid(){
  return Object.values(formData).every((field) => {
    if (field === null || field === undefined) return false;
    return field.toString().trim() !== "";
  });
};


  return (
    <Card className="bg-gray-900 border border-gray-700 shadow-lg shadow-black/20">
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {addressList?.map((addr) => (
          <AddressCard
            key={addr._id}
            addressInfo={addr}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            selectedId={selectedId}
          />
        ))}
      </div>

      <CardHeader>
        <CardTitle className="text-gray-200">
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-gray-200">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
