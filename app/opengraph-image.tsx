import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2f0e8",
          color: "#171713",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 900 }}>
          <span>UNHIRED.FUN</span>
          <span>THE JOB MARKET&apos;S LEAST PRESTIGIOUS LEAGUE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 86, fontWeight: 900, lineHeight: 0.95, letterSpacing: "-5px" }}>
            STILL UNEMPLOYED?
          </span>
          <span style={{ fontSize: 86, fontWeight: 900, lineHeight: 0.95, color: "#ff5938", letterSpacing: "-5px" }}>
            AT LEAST GET RANKED.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "4px solid #171713", paddingTop: 22, fontSize: 24, fontWeight: 800 }}>
          <span>TURN JOB-SEARCH MISERY INTO A SCORE.</span>
          <span>FREE · ANONYMOUS · SHAREABLE</span>
        </div>
      </div>
    ),
    size,
  );
}
