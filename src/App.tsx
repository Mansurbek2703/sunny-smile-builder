import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

const WebQuest1 = lazy(() => import("./pages/WebQuest1"));
const WebQuest2 = lazy(() => import("./pages/WebQuest2"));
const WebQuest3 = lazy(() => import("./pages/WebQuest3"));
const WebQuest4 = lazy(() => import("./pages/WebQuest4"));
const WebQuest5 = lazy(() => import("./pages/WebQuest5"));
const WebQuest6 = lazy(() => import("./pages/WebQuest6"));
const WebQuest7 = lazy(() => import("./pages/WebQuest7"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quest/1" element={<WebQuest1 />} />
            <Route path="/quest/2" element={<WebQuest2 />} />
            <Route path="/quest/3" element={<WebQuest3 />} />
            <Route path="/quest/4" element={<WebQuest4 />} />
            <Route path="/quest/5" element={<WebQuest5 />} />
            <Route path="/quest/6" element={<WebQuest6 />} />
            <Route path="/quest/7" element={<WebQuest7 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
