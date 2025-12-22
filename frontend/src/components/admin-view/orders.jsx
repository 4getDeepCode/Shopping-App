
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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(id) {
    dispatch(getOrderDetailsForAdmin(id));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="bg-gray-900 border border-gray-800 shadow-xl">
      <CardHeader className="border-b border-gray-800">
        <CardTitle className="text-yellow-400 text-xl font-bold">
          All Orders
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400">Order ID</TableHead>
              <TableHead className="text-gray-400">Order Date</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Price</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList?.map((orderItem) => (
              <TableRow
                key={orderItem._id}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <TableCell className="text-gray-300 break-all">
                  {orderItem._id}
                </TableCell>

                <TableCell className="text-gray-300">
                  {orderItem.orderDate.split("T")[0]}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`px-3 py-1 text-xs font-semibold ${
                      orderItem.orderStatus === "confirmed"
                        ? "bg-green-500 text-black"
                        : orderItem.orderStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {orderItem.orderStatus}
                  </Badge>
                </TableCell>

                <TableCell className="text-gray-300 font-medium">
                  ${orderItem.totalAmount}
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
                      size="sm"
                      className="
                        bg-yellow-400
                        text-black
                        hover:bg-yellow-500
                        font-semibold
                      "
                      onClick={() => handleFetchOrderDetails(orderItem._id)}
                    >
                      View
                    </Button>

                    <AdminOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
