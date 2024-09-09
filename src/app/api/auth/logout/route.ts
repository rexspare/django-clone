import { NextResponse } from 'next/server'
import { loginUser } from '../../../../api/auth/data'
import cookie from 'cookie'

export const GET = async (req: Request, res: Response) => {
   try {
      const headers = new Headers()
      headers.append('Set-Cookie', cookie.serialize('authToken', '', {
         httpOnly: true,
         secure: true,
         maxAge: 360000,
         path: '/',
      }))
      return NextResponse.json({ success: true, message: "Logged out!" }, { status: 200, headers })
   } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 500 })
   }
}