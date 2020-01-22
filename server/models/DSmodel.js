const mongoose = require("mongoose");
const URI =
  "mongodb+srv://Karandeep:Karandeep1@cluster0-hdazj.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Database connected"))
  .catch(err => {
    console.log("Database couldnt connect    ", err);
  });
let minHeapSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now, expires: 100000 },
  heap: [Number]
});
const minHeap = mongoose.model("minHeap", minHeapSchema);
module.exports = minHeap;
