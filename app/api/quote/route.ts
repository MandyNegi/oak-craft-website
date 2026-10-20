import { NextResponse } from "next/server";
import { Resend } from "resend";

// Module-level singleton — instantiated once per Lambda container lifecycle,
// reused across all warm invocations to avoid unnecessary cold-start overhead.
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Check if the API key is configured
    if (!resend) {
      console.error("RESEND_API_KEY is missing in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    
    // Use the verified domain email, or Resend's testing email
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    
    // The email address where you want to receive the notifications
    const toEmail = process.env.RECEIVING_EMAIL || "your-email@example.com";

    const { data: resendData, error } = await resend.emails.send({
      from: `Perfect Space Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: data.email, // Allows you to hit "Reply" in your email client and reply to the customer
      subject: `New Website Enquiry from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1c1c1c;">
          <h2 style="color: #8B6914;">New Quotation Enquiry</h2>
          <p>You have received a new enquiry from the Perfect Space Interior website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Preferred Contact:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.contactMethod}</td>
            </tr>
          </table>

          <h4 style="margin-top: 30px;">Additional Information:</h4>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #8B6914; line-height: 1.5;">
            ${data.additionalInfo ? data.additionalInfo.replace(/\n/g, "<br>") : "None provided."}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: resendData });
  } catch (error) {
    console.error("Internal Server error:", error);
    return NextResponse.json(
      { error: "Failed to send via Resend" },
      { status: 500 }
    );
  }
}
