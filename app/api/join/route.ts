import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, state, city, phone, email, agreedTerms, hasBike, bikeModel, cnhCategory } = body;

    // Validation checks
    if (!name || !state || !city || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios ausentes: nome, estado, cidade, telefone ou e-mail." },
        { status: 400 }
      );
    }

    if (!agreedTerms) {
      return NextResponse.json(
        { success: false, error: "É necessário concordar com os termos estatutários e a política de privacidade." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Formato de e-mail inválido." },
        { status: 400 }
      );
    }

    // Generate Official Lead Protocol
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const protocolId = `INS-${new Date().getFullYear()}-${randomCode}`;

    // Here in production: persist to D1 database or send webhook to CRM/WhatsApp regional bot
    const leadPayload = {
      protocolId,
      name: String(name).trim(),
      state: String(state).trim(),
      city: String(city).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      hasBike: hasBike || "sim",
      bikeModel: bikeModel || "Não informado",
      cnhCategory: cnhCategory || "A",
      submittedAt: new Date().toISOString(),
      status: "PENDING_REGIONAL_REVIEW",
    };

    console.log("[JOIN_LEAD_RECEIVED]", leadPayload);

    return NextResponse.json({
      success: true,
      protocolId,
      message: `Solicitação registrada com sucesso sob o protocolo ${protocolId}. A diretoria regional entrará em contato em breve.`,
    });
  } catch (err: unknown) {
    console.error("[JOIN_API_ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Erro interno no servidor ao processar a solicitação." },
      { status: 500 }
    );
  }
}
