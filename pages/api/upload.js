// API endpoint for image upload to Cloudinary
import { IncomingForm } from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB max
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(500).json({ error: "Error parsing form data" });
      }

      const file = files.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "karnataka-tourism/attractions",
          transformation: [
            { width: 1920, height: 1080, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });

        // Delete temp file
        fs.unlinkSync(file.filepath);

        return res.status(200).json({
          success: true,
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);

        // Clean up temp file on error
        if (fs.existsSync(file.filepath)) {
          fs.unlinkSync(file.filepath);
        }

        return res.status(500).json({
          error: "Error uploading to Cloudinary",
          details: uploadError.message,
        });
      }
    });
  } catch (error) {
    console.error("Upload handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
