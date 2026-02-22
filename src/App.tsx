import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WebQuest1 from "./pages/WebQuest1";
import WebQuest2 from "./pages/WebQuest2";
import WebQuest3 from "./pages/WebQuest3";
import WebQuest4 from "./pages/WebQuest4";
import WebQuest5 from "./pages/WebQuest5";
import WebQuest6 from "./pages/WebQuest6";
import WebQuest7 from "./pages/WebQuest7";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
