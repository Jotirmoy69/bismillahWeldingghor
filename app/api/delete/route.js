'use server';

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const body = await request.json();
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("employee");
    const collection = database.collection("employee");

    const result = await collection.findOneAndDelete({ _id: new ObjectId(body._id) })
    // Corrected here

    return NextResponse.json({
      message: "Member deleted successfully",
      deleted: result.insertedId,
    });

  } catch (error) {
    console.error("Add Member Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
