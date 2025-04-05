'use server';

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI not configured" }, { status: 500 });
  }

  const { username, password } = await request.json();

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("employee");
    const collection = database.collection("admin");

    const user = await collection.findOne({ username, password });

    if (!user) {
      return NextResponse.json({ message: "Invalid Username or Password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user: { username: user.username } }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
