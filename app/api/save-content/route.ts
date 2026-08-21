import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const filePath = path.join(process.cwd(), "app", "data", "customContent.json");
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Merge with existing content
    let currentContent = {};
    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, "utf-8");
        currentContent = JSON.parse(fileData || "{}");
      } catch (e) {
        currentContent = {};
      }
    }

    const updatedContent = { ...currentContent, ...data };
    fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Textos atualizados e salvos com sucesso no projeto!",
      count: Object.keys(updatedContent).length,
    });
  } catch (err: unknown) {
    console.error("[SAVE_CONTENT_ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Erro ao salvar alterações no arquivo." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "app", "data", "customContent.json");
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      return NextResponse.json(JSON.parse(fileData || "{}"));
    }
    return NextResponse.json({});
  } catch (err) {
    return NextResponse.json({});
  }
}
