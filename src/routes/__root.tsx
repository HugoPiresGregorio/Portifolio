import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BackToTop } from "../components/BackToTop";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-mono">
      <div className="max-w-md text-center">
        <div className="text-xs text-primary mb-3">$ cat /var/log/404.log</div>
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Esta rota não existe no <span className="text-foreground">routeTree</span>.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          cd ~
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("[Root Error Boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Algo quebrou.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tente novamente ou volte para o início.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Tentar novamente
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
            Voltar para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
