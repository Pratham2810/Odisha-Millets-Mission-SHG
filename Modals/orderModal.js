const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      count: Number,
      color: String
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: "not Processed",
    enum: ["not processed", "cash on Delievery", "processing ", "Dispatched", "cancelled", "delievered"],
  },
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  seller: {
    type: String
  }
},
  { timestamps: true });

//Export the model
module.exports = mongoose.model('order', orderSchema);
