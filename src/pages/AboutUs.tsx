import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const AboutUs = () => {
  const teamMembers = [
    { id: 1, role: 'Chef 1' },
    { id: 2, role: 'Chef 2' },
    { id: 3, role: 'Restaurant Owner' },
    { id: 4, role: 'Wholesaler' },
    { id: 5, role: 'Tech Lead' }
  ];

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
              <span className="text-6xl">🍀</span>
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

            <div className="bg-card border border-border rounded-lg p-6 my-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">The 5-Clover</h2>
              <p className="text-muted-foreground mb-4">
                The 5-Clover in our logo represents the blend of who we are:
              </p>
              <ul className="space-y-2 text-foreground">
                <li>• Two classically-trained chefs with years of experience everywhere — from fine-dining restaurants to street food shops.</li>
                <li>• A second-generation family-restaurant owner carrying her grandparents' timeless recipes and decades of know-how.</li>
                <li>• A second-generation wholesaler who knows how to source the freshest, best-quality ingredients.</li>
                <li>• A tech nerd whose first love has always been food.</li>
              </ul>
            </div>

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

          {/* Team Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;