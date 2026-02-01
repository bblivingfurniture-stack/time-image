const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  // UK time
  const hour = new Date(
    new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })
  ).getHours();

  // Allowed: 21:00 → 04:00
  const allowed = hour >= 12 || hour < 4;

  if (!allowed) {
    return {
      statusCode: 404,
      body: "Not Found",
    };
  }

  // Image lives next to this file
  const imagePath = path.join(__dirname, "image.jpeg");
  const image = fs.readFileSync(imagePath);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "no-store",
    },
    body: image.toString("base64"),
    isBase64Encoded: true,
  };
};
