const paypalClient = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const paypal = require("@paypal/checkout-server-sdk");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
      currency, 
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Use provided currency or default to USD
    const currencyCode = currency || "USD";

    // Prepare items
    const items = cartItems.map((item) => ({
      name: item.title,
      unit_amount: {
        currency_code: currencyCode,
        value: item.price.toFixed(2),
      },
      quantity: item.quantity.toString(),
    }));

    // Calculate item total
    const itemTotal = items.reduce(
      (sum, item) => sum + parseFloat(item.unit_amount.value) * parseInt(item.quantity),
      0
    );

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currencyCode,
            value: itemTotal.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: currencyCode,
                value: itemTotal.toFixed(2),
              },
            },
          },
          items,
        },
      ],
      application_context: {
        return_url:   `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
        user_action: "PAY_NOW",
      },
    });

    const paypalOrder = await paypalClient.execute(request);

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod,
      paymentStatus: paymentStatus || "pending",
      totalAmount: itemTotal,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId,
      payerId,
      currency: currencyCode, 
    });

    await newOrder.save();

    const approvalURL = paypalOrder.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      success: true,
      approvalURL,
      orderId: newOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error while creating PayPal order",
    });
  }
};



const capturePayment = async (req, res) => {
  try {
    const { orderId, paypalOrderId } = req.body;

    const captureRequest = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    captureRequest.requestBody({});

    const captureResult = await paypalClient.execute(captureRequest);

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const transaction =
      captureResult.result.purchase_units[0].payments.captures[0];

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = transaction.id;
    order.payerId = captureResult.result.payer.payer_id;

   
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.title}`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    await Cart.findByIdAndDelete(order.cartId);
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred during payment capture",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error fetching order" });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
