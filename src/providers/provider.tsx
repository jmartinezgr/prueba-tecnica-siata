import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthenticationProvider } from "./auth/AuthProvider";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider navigate={navigate} pathname={pathname}>
        <HeroUIProvider navigate={navigate} useHref={useHref}>
          {children}
        </HeroUIProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
