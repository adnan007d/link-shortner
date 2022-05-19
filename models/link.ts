import { Schema, models, model } from "mongoose";
import { generate } from "shortid";

const linkSchema = new Schema(
  {
    to: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
      default: generate,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// linkSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });
export default models.links || model<ILink>("links", linkSchema);
