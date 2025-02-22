import { TesseractHelper } from "../../../utils/tessaract-helper";

export class RecordHelper {
  public static async extractDataFromFile(
    imageUrl: string
  ): Promise<{ reciever: string; scannedText: string }> {
    try {
      const scannedText: string = await TesseractHelper.scanImage(imageUrl);

      const recieverRegex = /(?<=ឯកឧត្តមបណ្ឌិត\s)(ធន់ វឌ្ឍនា)/;
      const recieverMatch = scannedText.match(recieverRegex);

      return { reciever: recieverMatch?.[0], scannedText };
    } catch (error) {
      throw error;
    }
  }
}
