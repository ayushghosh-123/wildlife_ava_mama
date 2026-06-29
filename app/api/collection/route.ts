import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconfig";
import CollectionModel from "@/models/collectionModel";

// GET all collections
export async function GET() {
  try {
    await dbConnect();
    const collections = await CollectionModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(collections);
  } catch (error) {
    console.error("GET Collections Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}
