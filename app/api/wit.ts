import { WitContext, WitRequestBody, WitResponse } from "@/types/wit";
import { NextApiRequest, NextApiResponse } from "next";
import { Wit } from "node-wit";

const witClient = new Wit({
  accessToken: process.env.NEXT_PUBLIC_WIT_CLIENT_KEY || "",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WitResponse | { error: string }>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, ...contextOptions } = req.body as WitRequestBody & Partial<WitContext>;

    if (!message)
        return res.status(400).json({ error: 'Message is required'});

    if (!process.env.NEXT_PUBLIC_WIT_CLIENT_KEY)
        return res.status(500).json({error: 'Wit.ai access token is not configured'});

    const witContext: WitContext = {
        message,
        ...contextOptions
    }

    const witResponse = await witClient.message(witContext.message, witContext);

    res.status(200).json(witResponse as WitResponse);
  } catch (error) {
    console.error('Wit.ai error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
}
