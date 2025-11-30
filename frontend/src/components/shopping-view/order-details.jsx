// import { useSelector } from "react-redux";
// import { Badge } from "../ui/badge";
// import { DialogContent } from "../ui/dialog";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";

// function ShoppingOrderDetailsView({ orderDetails }) {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <DialogContent className="sm:max-w-[600px]">
//       <div className="grid gap-6">
//         <div className="grid gap-2">
//           <div className="flex mt-6 items-center justify-between">
//             <p className="font-medium">Order ID</p>
//             <Label>{orderDetails?._id}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Date</p>
//             <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Price</p>
//             <Label>${orderDetails?.totalAmount}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment method</p>
//             <Label>{orderDetails?.paymentMethod}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment Status</p>
//             <Label>{orderDetails?.paymentStatus}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Status</p>
//             <Label>
//               <Badge
//                 className={`py-1 px-3 ${orderDetails?.orderStatus === "confirmed"
//                     ? "bg-green-500"
//                     : orderDetails?.orderStatus === "rejected"
//                       ? "bg-red-600"
//                       : "bg-black"
//                   }`}
//               >
//                 {orderDetails?.orderStatus}
//               </Badge>
//             </Label>
//           </div>
//         </div>
//         <Separator />
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Order Details</div>
//             <ul className="grid gap-3">
//               {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
//                 ? orderDetails?.cartItems.map((item) => (
//                   <li className="flex items-center justify-between">
//                     <span>Title: {item.title}</span>
//                     <span>Quantity: {item.quantity}</span>
//                     <span>Price: ${item.price}</span>
//                   </li>
//                 ))
//                 : null}
//             </ul>
//           </div>
//         </div>
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Shipping Info</div>
//             <div className="grid gap-0.5 text-muted-foreground">
//               <span>{user.userName}</span>
//               <span>{orderDetails?.addressInfo?.address}</span>
//               <span>{orderDetails?.addressInfo?.city}</span>
//               <span>{orderDetails?.addressInfo?.pincode}</span>
//               <span>{orderDetails?.addressInfo?.phone}</span>
//               <span>{orderDetails?.addressInfo?.notes}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DialogContent>
//   );
// }

// export default ShoppingOrderDetailsView;



import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="max-w-xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
      <div className="space-y-6">
        
        {/* ORDER DETAILS TOP SECTION */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Order ID</p>
            <Label className="text-sm break-all">{orderDetails?._id}</Label>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Order Date</p>
            <Label className="text-sm">
              {orderDetails?.orderDate.split("T")[0]}
            </Label>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Order Price</p>
            <Label className="text-sm">${orderDetails?.totalAmount}</Label>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Payment Method</p>
            <Label className="text-sm">{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Payment Status</p>
            <Label className="text-sm">{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Order Status</p>
            <Badge
              className={`py-1 px-3 text-xs ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-gray-900"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* ORDER ITEMS */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Order Items</h3>
          <ul className="space-y-2">
            {orderDetails?.cartItems?.map((item) => (
              <li
                key={item._id}
                className="flex flex-col sm:flex-row sm:justify-between text-sm"
              >
                <span className="font-medium">Title: {item.title}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* SHIPPING INFO */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Shipping Info</h3>
          <div className="text-sm space-y-0.5 text-gray-600">
            <p>{user.userName}</p>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>{orderDetails?.addressInfo?.city}</p>
            <p>{orderDetails?.addressInfo?.pincode}</p>
            <p>{orderDetails?.addressInfo?.phone}</p>
            <p>{orderDetails?.addressInfo?.notes}</p>
          </div>
        </div>

      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
