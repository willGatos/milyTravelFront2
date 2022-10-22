const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import combos from "../../common/helpers/combosRelationship"

export default async function handler(req, res) {
    if(req.method === 'POST') {
      const urlQueries = new URLSearchParams(req.body.emailRequest).toString()
      const session = await stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              mode: "payment",
              line_items: req.body.items.map(item => {
                //toma todo lo que hay en items
                console.log(item)
                //devuelve un objeto el producto
                return {
                  price_data: {
                    currency: "usd",
                    product_data: {
                      name: item.name,
                    },
                    unit_amount: +item.priceInCents * 100,
                  },
                  quantity: item.quantity,
                }
              }),
              success_url: `${process.env.CLIENT_URL}/success?${urlQueries}`,
              cancel_url: `${process.env.CLIENT_URL}/cancel`,
            })
            res.json({ url: session.url })
          }
  }
  