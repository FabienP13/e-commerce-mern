import Stripe from 'stripe'

//Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default stripe;