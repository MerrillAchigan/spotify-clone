// app/api/spotify/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1]

  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()
  return NextResponse.json(data)
}
