import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export default async function proxy(request: NextRequest) {
    // 1. Root Redirect Logic: Force Home to Module 101
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/modules/101', request.url))
    }

    // 2. Supabase Auth Session Update (maintains cookies)
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /login (login page)
         * - /auth (auth callback routes)
         * - images/static files (regex)
         */
        '/((?!_next/static|_next/image|favicon.ico|login|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
