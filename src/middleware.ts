import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Permite apenas se o usuário estiver autenticado
    },
  }
);

// Protege todas as rotas sob /dashboard exceto recursos estáticos e APIs
export const config = {
  matcher: [
    // Protege rotas que começam com /dashboard, inclusive subpastas
    "/dashboard/:path*"
  ],
};
