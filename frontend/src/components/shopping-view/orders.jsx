// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Dialog } from "../ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import ShoppingOrderDetailsView from "./order-details";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersByUserId,
//   getOrderDetails,
//   resetOrderDetails,
// } from "@/store/shop/order-slice";
// import { Badge } from "../ui/badge";

// function ShoppingOrders() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetails(getId));
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersByUserId(user?.id));
//   }, [dispatch]);

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true);
//   }, [orderDetails]);

//   console.log(orderDetails, "orderDetails");

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order History</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Order Date</TableHead>
//               <TableHead>Order Status</TableHead>
//               <TableHead>Order Price</TableHead>
//               <TableHead>
//                 <span
//                   className="sr-only"
//                 >Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orderList && orderList.length > 0
//               ? orderList.map((orderItem) => (
//                 <TableRow>
//                   <TableCell>{orderItem?._id}</TableCell>
//                   <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
//                         ? "bg-green-500"
//                         : orderItem?.orderStatus === "rejected"
//                           ? "bg-red-600"
//                           : "bg-black"
//                         }`}
//                     >
//                       {orderItem?.orderStatus}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>${orderItem?.totalAmount}</TableCell>
//                   <TableCell>
//                     <Dialog
//                       open={openDetailsDialog}
//                       onOpenChange={() => {
//                         setOpenDetailsDialog(false);
//                         dispatch(resetOrderDetails());
//                       }}
//                     >
//                       <Button
//                         onClick={() =>
//                           handleFetchOrderDetails(orderItem?._id)
//                         }
//                       >
//                         View Details
//                       </Button>
//                       <ShoppingOrderDetailsView orderDetails={orderDetails} />
//                     </Dialog>
//                   </TableCell>
//                 </TableRow>
//               ))
//               : null}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// export default ShoppingOrders;



import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="bg-gray-900/80 border border-white/10 backdrop-blur-xl shadow-xl shadow-black/40 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-200">
          Order History
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table className="text-gray-300">
            <TableHeader className="bg-gray-800/60">
              <TableRow>
                <TableHead className="text-gray-200">Order ID</TableHead>
                <TableHead className="text-gray-200">Order Date</TableHead>
                <TableHead className="text-gray-200">Status</TableHead>
                <TableHead className="text-gray-200">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem?._id}
                    className="hover:bg-gray-800/40 transition-all"
                  >
                    <TableCell className="font-mono text-sm text-gray-400">
                      {orderItem?._id}
                    </TableCell>

                    <TableCell className="text-gray-300">
                      {orderItem?.orderDate.split("T")[0]}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`py-1 px-3 text-black font-semibold rounded-lg ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-400"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-gray-200 font-medium">
                      ${orderItem?.totalAmount}
                    </TableCell>

                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold rounded-lg"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>

                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-400"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
