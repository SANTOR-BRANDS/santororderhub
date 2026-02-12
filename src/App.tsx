import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AddressProvider } from "./contexts/AddressContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load non-critical pages
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const FAQ = lazy(() => import("./pages/FAQ"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
// Test Automation page - only in development
const TestAutomation = lazy(() => import("./pages/TestAutomation"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AddressProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/smoody" element={<Index initialBrand="smoody" />} />
                <Route path="/restory" element={<Index initialBrand="restory" />} />
                <Route path="/nirvana" element={<Index initialBrand="nirvana" />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<TermsOfService />} />
                
                {/* Test route - only available in development */}
                {import.meta.env.DEV && (
                  <Route path="/test-automation" element={<TestAutomation />} />
                )}

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Analytics />
          <SpeedInsights />
        </TooltipProvider>
      </AddressProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
