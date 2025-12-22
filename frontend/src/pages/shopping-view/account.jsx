

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 relative overflow-hidden">

      {/* Yellow Glow Behind */}
      <div className="absolute inset-0 bg-yellow-500/10 blur-3xl opacity-40 pointer-events-none"></div>

      {/* Banner Image - NO BLUR, NO DARK OVERLAY */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center opacity-100"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 px-4 relative z-10">

        <div className="flex flex-col rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur-xl p-6 shadow-2xl shadow-black/40">

          <Tabs defaultValue="orders" className="w-full">
            
            <TabsList className="bg-gray-800/50 backdrop-blur-xl p-1 rounded-xl border border-white/10 shadow-inner">
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black 
                rounded-lg px-4 py-2 transition-all"
              >
                Orders
              </TabsTrigger>

              <TabsTrigger
                value="address"
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black 
                rounded-lg px-4 py-2 transition-all"
              >
                Address
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              <ShoppingOrders />
            </TabsContent>

            <TabsContent value="address" className="mt-6">
              <Address />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;

