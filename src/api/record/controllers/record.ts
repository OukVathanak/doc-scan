/**
 * record controller
 */

import { factories } from "@strapi/strapi";
import { TesseractHelper } from "../../../utils/tessaract-helper";
import axios from "axios";

export default factories.createCoreController(
  "api::record.record",
  ({ strapi }) => {
    return {
      async scanFile(ctx: any) {
        try {
          const imageUrl = ctx.request.body.imageUrl;
          const scannedText: string = await TesseractHelper.scanImage(imageUrl);

          const prompt: string = `
            Extract the following details from the provided text:

            - Sender,
            - Receiver,
            - Title,
            - Description,
            - Date,
            - Category.

            If any of these details are missing, return 'null' for the corresponding attribute. Separate each attribute by a comma.
            
            Input text:
            ${scannedText}
            `;

          // OpenAI API Call with Axios
          const chatResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.7,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`, // Replace with your API key
              },
            }
          );

          console.log(chatResponse);

          return chatResponse.data;
        } catch (error) {
          throw error;
        }
      },
    };
  }
);
