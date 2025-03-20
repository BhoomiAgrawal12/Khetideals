import clientPromise from "@/lib/mongodb";
import BuyerMarketPlaceSub from "@/models/buyermarketplacesub.js";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";

export async function GET(req: Request) {
  const session = await auth();
  const mainId = session?.user.id;
  const name = session?.user.name;
  const email = session?.user.email;
  try {
    await clientPromise();
    if (!mainId) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }
    const document = await BuyerMarketPlaceSub.findOne({ mainId: mainId });

    if (!document) {
      return new Response(
        JSON.stringify({
          message: "Document with the specified mainId not found",
        }),
        { status: 404 }
      );
    }

    // Send the document details as JSON
    return new Response(
      JSON.stringify({
        document,
        name,
        email,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching document:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
