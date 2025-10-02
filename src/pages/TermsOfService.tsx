import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
          
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using SANTOR's services, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use of Service</h2>
              <p className="text-muted-foreground">
                Our service is provided for ordering and purchasing food items. You agree to use the 
                service only for lawful purposes and in accordance with these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Orders and Payments</h2>
              <p className="text-muted-foreground">
                All orders placed through our service are subject to acceptance and availability. 
                Prices are subject to change without notice. Payment must be made at the time of order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Delivery</h2>
              <p className="text-muted-foreground">
                Delivery times are estimates and not guaranteed. We are not liable for delays in delivery 
                caused by circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Food Safety</h2>
              <p className="text-muted-foreground">
                We take food safety seriously. Please inform us of any allergies or dietary restrictions 
                when placing your order. We cannot guarantee that our food is free from all allergens.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Cancellations and Refunds</h2>
              <p className="text-muted-foreground">
                Orders may be cancelled within a specified time frame. Refunds will be processed according 
                to our refund policy. Please contact us for specific cases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this platform, including text, graphics, logos, and images, is the property 
                of SANTOR and protected by copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                SANTOR shall not be liable for any indirect, incidental, special, consequential or punitive 
                damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately 
                upon posting to the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us through our Contact Us form.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;