import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * S'exécute uniquement sur /admin : rafraîchit la session Supabase
 * et renvoie vers la page de connexion les personnes non connectées.
 * Le site public n'est pas concerné (aucun cookie posé aux visiteurs).
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const isLoginPage = request.nextUrl.pathname.startsWith("/admin/connexion");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (isLoginPage) return response;
    return NextResponse.redirect(new URL("/admin/connexion", request.url));
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/connexion", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
