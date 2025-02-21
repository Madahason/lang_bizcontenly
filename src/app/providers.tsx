"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { QueryProvider } from "./providers/QueryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
}
