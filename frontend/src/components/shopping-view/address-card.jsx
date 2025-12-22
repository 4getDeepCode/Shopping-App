
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-4"
          : "border-gray-700"
      } bg-gray-900 shadow-md shadow-black/20 hover:shadow-yellow-500/20 transition`}
    >
      <CardContent className="grid p-4 gap-2">
        <Label className="text-gray-200">Address: {addressInfo?.address}</Label>
        <Label className="text-gray-200">City: {addressInfo?.city}</Label>
        <Label className="text-gray-200">Pincode: {addressInfo?.pincode}</Label>
        <Label className="text-gray-200">Phone: {addressInfo?.phone}</Label>
        <Label className="text-gray-200">Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800 text-yellow-400 border-gray-700 hover:bg-yellow-500 hover:text-black"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800 text-red-400 border-gray-700 hover:bg-red-500 hover:text-black"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
