import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-santor rounded-full flex items-center justify-center">
              {/* Image Replacement: Using the <img> tag */}
              <img 
                src="/images/SAN-LOGO-003.png" // Path relative to the public folder
                alt="Santor Logo" 
                className="w-full h-full object-contain p-4" // Styling to fit the circular container
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">About Us</h1>
            <p className="text-xl text-muted-foreground italic">
              "Good food is the foundation of happiness"
            </p>
          </div>

          {/* Story Section */}
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed">
              We're a team of five food addicts bound by one belief: good food is the foundations of happiness.
            </p>

            <p className="text-foreground leading-relaxed">
              Our story began as friends obsessed with the kind of dishes that make you pause mid-conversation, 
              look each other in the eye, and say, <em>"Wow… this is ****** good."</em>
            </p>

            <p className="text-foreground leading-relaxed">
              We've travelled across continents, tasting thousands of dishes from different places — from the 
              local night markets to Michelin-starred kitchens. We weren't searching for fancy experiences but 
              for the kind of dishes that stop you from talking. Recipes that deserve to be shared.
            </p>

            <p className="text-foreground leading-relaxed">
              Together, we bring these experiences to re-create classic dishes from around the world — with a refined touch. 
              Our goal isn't to reinvent what people already love, but to honor it, refine it, and make it more accessible.
            </p>

            <p className="text-foreground leading-relaxed">
              We believe food has the power to bring people together, make memories, and create joy. That's what we 
              strive for every day — not because we think our food alone brings happiness, but because sharing a good 
              meal is often where happiness begins.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
