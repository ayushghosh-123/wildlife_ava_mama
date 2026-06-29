import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconfig";
import WebinarModel from "@/models/webinarModel";
import "@/models/collectionModel"; // Registers Collection schema for populate

export async function GET() {
  try {
    await dbConnect();
    // Sort date-wise (ascending for upcoming webinars)
    const webinars = await WebinarModel.find({})
      .populate("collectionId")
      .sort({ date: 1 });

    return NextResponse.json(webinars);
  } catch (error) {
    console.error("GET Webinar Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch webinars" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const newWebinar = await WebinarModel.create({
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      time: body.time,
      speaker: body.speaker,
      image: body.image || "",
      whatsappNumber: body.whatsappNumber,
      hasCollectionToggle: Boolean(body.hasCollectionToggle),
      collectionId: body.hasCollectionToggle ? body.collectionId : null,
      showEthics: Boolean(body.showEthics),
      ethicsContent: body.ethicsContent,
    });

    return NextResponse.json(newWebinar, { status: 201 });
  } catch (error) {
    console.error("POST Webinar Error:", error);
    return NextResponse.json(
      { error: "Failed to post webinar" },
      { status: 500 }
    );
  }
}
