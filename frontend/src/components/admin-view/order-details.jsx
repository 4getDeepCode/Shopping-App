
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import CommonForm from "../common/form";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast } from "sonner";


const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();

    dispatch(
      updateOrderStatus({
        id: orderDetails?._id,
        orderStatus: formData.status,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast.success(data?.payload?.message);
      }
    });
  }

  return (

    <DialogContent
      className="
        max-w-xl
        max-h-[90vh]
        overflow-y-auto
        p-6 sm:p-8
        bg-gray-900
        border border-gray-800
        shadow-xl
        text-gray-100
      "
    >



      <div className="space-y-6">

        {/* ORDER SUMMARY */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-400">Order ID</p>
            <Label className="text-sm break-all text-gray-200">
              {orderDetails?._id}
            </Label>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-400">Order Date</p>
            <Label className="text-sm text-gray-200">
              {orderDetails?.orderDate?.split("T")[0]}
            </Label>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-400">Order Price</p>
            <Label className="text-sm font-semibold text-gray-100">
              ${orderDetails?.totalAmount}
            </Label>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-400">Payment Method</p>
            <Label className="text-sm text-gray-200">
              {orderDetails?.paymentMethod}
            </Label>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-400">Payment Status</p>
            <Label className="text-sm text-gray-200">
              {orderDetails?.paymentStatus}
            </Label>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-400">Order Status</p>
            <Badge
              className={`px-3 py-1 text-xs font-semibold capitalize
                ${
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-green-500 text-black"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-500 text-white"
                    : orderDetails?.orderStatus === "confirmed"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 text-gray-200"
                }
              `}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* ORDER ITEMS */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-yellow-400">
            Order Items
          </h3>
          <ul className="space-y-3">
            {orderDetails?.cartItems?.map((item) => (
              <li
                key={item._id}
                className="
                  p-3
                  rounded-lg
                  border border-gray-800
                  bg-gray-800/40
                  flex flex-col sm:flex-row
                  sm:items-center sm:justify-between
                  text-sm
                "
              >
                <span className="font-medium text-gray-200">
                  {item.title}
                </span>
                <span className="text-gray-400">
                  Qty: {item.quantity}
                </span>
                <span className="font-semibold text-gray-100">
                  ${item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-gray-800" />

        {/* SHIPPING INFO */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-yellow-400">
            Shipping Info
          </h3>
          <div className="text-sm space-y-1 text-gray-400">
            <p className="text-gray-200 font-medium">{user?.userName}</p>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>{orderDetails?.addressInfo?.city}</p>
            <p>{orderDetails?.addressInfo?.pincode}</p>
            <p>{orderDetails?.addressInfo?.phone}</p>
            {orderDetails?.addressInfo?.notes && (
              <p className="italic text-gray-500">
                {orderDetails?.addressInfo?.notes}
              </p>
            )}
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* ADMIN: UPDATE STATUS */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-yellow-400">
            Update Order Status
          </h3>

          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
          />
        </div>

      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
