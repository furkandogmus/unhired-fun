import { ImageResponse } from "next/og";
import { decodeResult } from "@/lib/scoring";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ payload: string }> },
) {
  const { payload } = await params;
  const result = decodeResult(payload);
  if (!result) return new Response("Invalid result", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#f2f0e8",
          color: "#171713",
          padding: "54px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            border: "4px solid #171713",
            boxShadow: "16px 16px 0 #171713",
            background: "#ff5938",
            padding: "38px 44px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 800 }}>
            <span>UNHIRED.FUN</span>
            <span>{result.l.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", flex: 1, alignItems: "center", gap: "60px" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "52%" }}>
              <span style={{ fontSize: 22, fontWeight: 700 }}>UNHIRED SCORE</span>
              <span style={{ fontSize: 150, lineHeight: 1, fontWeight: 900, letterSpacing: "-10px" }}>
                {result.s.toLocaleString()}
              </span>
              <span style={{ fontSize: 38, lineHeight: 1.05, fontWeight: 900 }}>
                {result.t}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "18px" }}>
              {[
                [result.d, "DAYS SEARCHING"],
                [result.a, "APPLICATIONS"],
                [result.g, "GHOSTINGS"],
                [result.f, "FINAL ROUNDS"],
              ].map(([value, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "3px solid #171713", paddingBottom: 8 }}>
                  <b style={{ fontSize: 42 }}>{value}</b>
                  <span style={{ fontSize: 17, fontWeight: 800 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, fontWeight: 800 }}>
            <span>🏅 {result.b}</span>
            <span>SCIENTIFICALLY QUESTIONABLE. EMOTIONALLY ACCURATE.</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
