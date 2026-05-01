import { NextRequest } from 'next/server'
import { writeHeapSnapshot } from 'v8'
import { tmpdir } from 'os'
import { join } from 'path'
import { readFile, unlink } from 'fs/promises'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// On-demand heap snapshot for diagnosing memory growth on the running
// instance. Disabled unless HEAP_SNAPSHOT_TOKEN is set in the environment;
// callers must present it as a Bearer token. The .heapsnapshot file can
// be opened in Chrome DevTools → Memory → Load.
export async function GET(req: NextRequest) {
  const token = process.env.HEAP_SNAPSHOT_TOKEN
  if (!token) {
    return new Response('Not found', { status: 404 })
  }

  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${token}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const filename = `heap-${Date.now()}.heapsnapshot`
  const path = join(tmpdir(), filename)
  writeHeapSnapshot(path)

  try {
    const data = await readFile(path)
    return new Response(data, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } finally {
    await unlink(path).catch(() => undefined)
  }
}
