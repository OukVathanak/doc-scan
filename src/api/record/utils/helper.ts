import axios from "axios";
import { TesseractHelper } from "../../../utils/tessaract-helper";

export class RecordHelper {
  public static async getPromptResult(imageUrl: string): Promise<any> {
    try {
      const scannedText: string = await TesseractHelper.scanImage(imageUrl);

      const prompt: string = `
            ${scannedText}

            "Base on the text extract me the sender, receiver, title, description, date and the category of the document. Separate each attribute by comma. It is important to return null to the attribute you can't get."
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
    } catch (error) {
      throw error;
    }
  }
}

interface IPromptResult {
  sender: string;
  receiver: string;
  title: string;
  description: string;
  date: Date;
  category: string;
}
