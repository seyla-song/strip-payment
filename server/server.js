require("dotenv").config();
const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIP_KEY);
app.use(express.static("public"));

app.use(express.json());

const storeItems = new Map([
  [1, { price: 100, name: "learn" }],
  [2, { price: 200, name: "learn stripe" }],
  [5, { price: 200, name: "tests12341234" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000);
