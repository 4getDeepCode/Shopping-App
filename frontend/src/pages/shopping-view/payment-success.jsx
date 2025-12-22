

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <Card className="relative w-full max-w-2xl overflow-hidden border border-gray-800 bg-black/80 backdrop-blur-xl shadow-2xl shadow-green-500/10">
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-green-500/10 blur-3xl pointer-events-none" />

        <CardContent className="relative z-10 flex flex-col items-center text-center p-10 gap-6">
          
          {/* Success Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 shadow-lg shadow-green-500/30 animate-pulse">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Payment Successful 🎉
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 max-w-md">
            Thank you for your purchase! Your order has been placed successfully
            and is now being processed.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={() => navigate("/shop/account")}
            className="mt-4 rounded-full bg-green-500 px-8 text-black font-semibold hover:bg-green-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30"
          >
            View My Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
