import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = data && typeof data === "object" && "texts" in data && typeof data.texts === "object" ? data.texts : data;

    const filePath = path.join(process.cwd(), "app", "data", "customContent.json");
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Merge with existing content
    let currentContent: Record<string, string> = {};
    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileData || "{}");
        // Remove legacy nested "texts" key if present
        if (parsed && typeof parsed === "object") {
          delete (parsed as any).texts;
          currentContent = parsed;
        }
      } catch {
        currentContent = {};
      }
    }

    const updatedContent = { ...currentContent, ...payload };
    fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Textos atualizados e salvos com sucesso no projeto!",
      count: Object.keys(updatedContent).length,
      data: updatedContent,
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
      const parsed = JSON.parse(fileData || "{}");
      if (parsed && typeof parsed === "object") {
        delete (parsed as any).texts;
        return NextResponse.json(parsed);
      }
    }
    return NextResponse.json({});
  } catch {
    return NextResponse.json({});
  }
}
