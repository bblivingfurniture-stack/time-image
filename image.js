{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 LucidaGrande;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import fs from "fs";\
import path from "path";\
\
export async function handler() \{\
  // UK time\
  const hour = new Date(\
    new Date().toLocaleString("en-GB", \{ timeZone: "Europe/London" \})\
  ).getHours();\
\
  // Allowed: 12:00 
\f1 \uc0\u8594 
\f0  04:00\
  const allowed = hour >= 12 || hour < 4;\
\
  if (!allowed) \{\
    return \{\
      statusCode: 404,\
      body: "Not Found",\
    \};\
  \}\
\
  const imagePath = path.join(process.cwd(), "image.jpg");\
  const image = fs.readFileSync(imagePath);\
\
  return \{\
    statusCode: 200,\
    headers: \{\
      "Content-Type": "image/jpeg",\
      "Cache-Control": "no-store",\
    \},\
    body: image.toString("base64"),\
    isBase64Encoded: true,\
  \};\
\}\
}