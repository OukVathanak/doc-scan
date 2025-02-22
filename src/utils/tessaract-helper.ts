import { createWorker, PSM } from "tesseract.js";

export class TesseractHelper {
  public static async scanImage(filePath: string): Promise<string> {
    try {
      // Create a worker instance for Tesseract
      const worker = await createWorker("khm");

      // Set OCR parameters
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SPARSE_TEXT_OSD,
      });

      // Recognize the image
      let {
        data: { text },
      } = await worker.recognize(filePath);

      return text;
    } catch (error) {
      throw error;
    }
  }
}
