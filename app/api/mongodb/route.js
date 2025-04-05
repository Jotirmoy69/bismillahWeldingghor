'use server'
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// Replace with your connection string in .env

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const body = await request.json(); // Parse incoming request body

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("employee");
    const collection = database.collection("admin");

    const user = await collection.findOne({
      username: body.username,
      password: body.password,
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    return NextResponse.json({ message: "Login successful" }, { status: 200 });




  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
