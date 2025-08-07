import { withAuth }  from "next-auth/middleware"
import {NextResponse} from "next/server"

export default withAuth(
    function middleware(req){
        return NextResponse.next();
    },
    {
        callbacks:{
            authorized({req,token}) {
                const pathname = req.nextUrl.pathname;
                
                if(
                    pathname.startsWith("/api/auth") || 
                    pathname === "/login" ||
                    pathname === "/register"
                )
                return true

                if(pathname === "/" || pathname.startsWith("/api/videos")){
                    return true
                }
                if(token) return true
            },
        },
    },
)

export const config = {
  matcher: [
    /*
      Match everything EXCEPT:
      - /api/**
      - /login
      - /register
      - /_next/static/ (for Next internals)
    */
    '/((?!api|login|register|_next/static|favicon.ico).*)',
  ],
} 