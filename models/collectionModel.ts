import mongoose, { Schema, model, models } from "mongoose";

export interface ICollection {
  _id?: string;
  title: string;
  category: string;
  src: string;
  edition: string;
  location: string;
  createdAt?: Date;
}

const CollectionSchema = new Schema<ICollection>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    src: { type: String, required: true },
    edition: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const CollectionModel = models.Collection || model<ICollection>("Collection", CollectionSchema);

export default CollectionModel;
