import mongoose, { Schema, model, models } from "mongoose";

export interface IWebinar {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  speaker: string;
  image?: string;
  whatsappNumber: string;
  hasCollectionToggle: boolean;
  collectionId?: mongoose.Types.ObjectId | string;
  showEthics: boolean;
  ethicsContent?: string;
  createdAt?: Date;
}

const WebinarSchema = new Schema<IWebinar>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    speaker: { type: String, required: true },
    image: { type: String, default: "" },
    whatsappNumber: { type: String, required: true },
    hasCollectionToggle: { type: Boolean, default: false },
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
    showEthics: { type: Boolean, default: true },
    ethicsContent: {
      type: String,
      default:
        "Our wildlife photography masterclasses strictly adhere to ethical field practices—zero baiting, respecting natural animal corridors, and minimal habitat footprint.",
    },
  },
  { timestamps: true }
);

const WebinarModel =
  models.Webinar || model<IWebinar>("Webinar", WebinarSchema);

export default WebinarModel;
