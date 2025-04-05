'use server';

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = process.env.MONGODB_URI;


  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("employee");
    const collection = database.collection("employee");

    const user = await collection.find({}).toArray();

   

    return NextResponse.json({
      message: "Data fetched successfully",
      data: user
    });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
