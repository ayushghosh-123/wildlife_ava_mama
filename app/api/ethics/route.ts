import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Ethics endpoint is ready.",
    data: [],
  });
}

export async function POST() {
  return NextResponse.json(
    { message: "Ethics submission received." },
    { status: 201 }
  );
}
