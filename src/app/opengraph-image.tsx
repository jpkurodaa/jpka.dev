import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JP Kuroda — Speaker. Artist. Builder. Philosopher.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          color: "#F5F0E8",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          JP Kuroda
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#C9A84C",
            marginTop: 16,
            letterSpacing: "0.1em",
          }}
        >
          SPEAKER · ARTIST · BUILDER · PHILOSOPHER
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#8A8A8A",
            marginTop: 32,
          }}
        >
          jpka.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
