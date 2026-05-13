import { NextResponse } from 'next/server';

// ─────────────────────────────────────────────
// POST /api/pump-control
// Accepts pump ON/OFF commands from Dashboard
// and stores them so ESP32 can poll for commands
// ─────────────────────────────────────────────

let pendingPumpCommand: { state: number; issued_at: number } | null = null;

export async function POST(request: Request) {
  try {
    const key = request.headers.get('x-api-key');
    if (key !== (process.env.SENSOR_API_KEY ?? 'krishiniti-secret-key')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    pendingPumpCommand = {
      state: body.pump ?? 0,
      issued_at: Date.now(),
    };

    return NextResponse.json({ success: true, command: pendingPumpCommand });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// ESP32 polls this endpoint every 5 seconds to check for commands
export async function GET() {
  if (!pendingPumpCommand) {
    return NextResponse.json({ command: null });
  }

  // Command expires after 30 seconds
  if (Date.now() - pendingPumpCommand.issued_at > 30_000) {
    pendingPumpCommand = null;
    return NextResponse.json({ command: null });
  }

  const cmd = pendingPumpCommand;
  pendingPumpCommand = null; // consume command
  return NextResponse.json({ command: cmd });
}
