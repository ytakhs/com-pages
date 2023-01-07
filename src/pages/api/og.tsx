import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { OgImage } from "../../components/OgImage/OgImage";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextRequest) => {
  const params = new URL(req.url).searchParams;
  const title = params.get("title");

  if (title == null) {
    return new Response("invalid request", {
      status: 400,
    });
  }

  return new ImageResponse(<OgImage title={title} />, {
    width: 1200,
    height: 600,
  });
};

export default handler;
