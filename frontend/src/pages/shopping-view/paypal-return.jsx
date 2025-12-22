
import { Card, CardContent } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const paypalOrderId = params.get("token");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paypalOrderId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(
        capturePayment({
          paypalOrderId,
          orderId,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        } else {
          console.error("Payment capture failed", data);
        }
      });
    }
  }, [paypalOrderId, payerId, dispatch]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <Card className="relative w-full max-w-xl border border-gray-800 bg-black/80 backdrop-blur-xl shadow-2xl shadow-yellow-500/10">
        
        {/* Glow */}
        <div className="absolute inset-0 bg-yellow-500/10 blur-3xl pointer-events-none" />

        <CardContent className="relative z-10 flex flex-col items-center gap-6 p-10 text-center">
          
          {/* Loader */}
          <Loader2 className="h-14 w-14 animate-spin text-yellow-400" />

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Processing Payment
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 animate-pulse">
            Please wait while we confirm your payment securely with PayPal...
          </p>

          {/* Tip */}
          <p className="text-sm text-gray-500">
            Do not refresh or close this page
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaypalReturnPage;
