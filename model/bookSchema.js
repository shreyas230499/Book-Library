const { model, Schema, Types } = require("mongoose");
const moment = require("moment");

// let Schema = mongoose.Schema;

let librarySchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  {
    timestamps: {
      currentTime: () =>
        moment(new Date()).utcOffset("+05:30").format("YYYY-MM-DD[T]HH:mm:ss"),
    },
    versionKey: false,
  }
);

// Creation Of User & Admin Model

let libraryModel = model("library", librarySchema);

// Exporting both models
module.exports = libraryModel;
