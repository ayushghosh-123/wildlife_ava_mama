import { NextResponse } from "next/server";
import ImageKit from "@imagekit/nodejs";
import dbConnect from "@/lib/dbconfig";
import CollectionModel from "@/models/collectionModel";

// imagekit config here
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

// post the imagekit
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const category = formData.get("category") as string | null;
    const edition = (formData.get("edition") as string) || "Open Edition";
    const location = (formData.get("location") as string) || "Wild Habitat";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and Category are required" },
        { status: 400 }
      );
    }

    // Convert the browser File to an ArrayBuffer, then to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // image file name
    const fileName = `wildlife_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    const uploadResponse = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName,
    });

    // Store in database
    await dbConnect();
    const newCollection = await CollectionModel.create({
      title,
      category,
      src: uploadResponse.url,
      edition,
      location,
    });

    return NextResponse.json(
      { url: uploadResponse.url, collection: newCollection },
      { status: 201 }
    );
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
