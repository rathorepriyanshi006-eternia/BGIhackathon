import { NextResponse } from 'next/server';

// ─────────────────────────────────────────────
// POST /api/sensor-ingest
// ─────────────────────────────────────────────
// Accepts JSON payloads from ESP32 via HTTP POST
// as an alternative to MQTT (for firewalled networks)
//
// ESP32 Arduino example:
//   HTTPClient http;
//   http.begin("https://your-vercel-url.vercel.app/api/sensor-ingest");
//   http.addHeader("Content-Type", "application/json");
//   http.addHeader("x-api-key", "krishiniti-secret-key");
//   int code = http.POST("{\"soil_moisture\":42,\"temperature\":28.5,...}");
// ─────────────────────────────────────────────

const API_KEY = process.env.SENSOR_API_KEY ?? 'krishiniti-secret-key';

// In-memory store (resets on Vercel cold starts)
// For production: replace with Firebase Realtime DB or Supabase
let latestSensorData: Record<string, number> = {};

export async function POST(request: Request) {
  try {
    const key = request.headers.get('x-api-key');
    if (key !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    latestSensorData = {
      ...body,
      received_at: Date.now(),
    };

    console.log('[API] Sensor data received:', latestSensorData);

    return NextResponse.json({ success: true, data: latestSensorData }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }
}

export async function GET() {
  if (!latestSensorData.received_at) {
    return NextResponse.json({ error: 'No data yet', live: false }, { status: 404 });
  }

  // Mark as stale if older than 60 seconds
  const isStale = Date.now() - latestSensorData.received_at > 60_000;

  return NextResponse.json({
    live: !isStale,
    data: latestSensorData,
  });
}
