'use server';

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("employee");
    const collection = database.collection("employee");

    const result = await collection.insertOne(body); // Corrected here

    return NextResponse.json({
      message: "Member added successfully",
      insertedId: result.insertedId,
    });

  } catch (error) {
    console.error("Add Member Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
