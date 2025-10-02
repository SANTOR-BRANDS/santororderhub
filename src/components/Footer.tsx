import { MapPin, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactDialog from './ContactDialog';
const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return <>
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <button onClick={() => setIsContactOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Location Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Visit Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    SANTOR<br />
                    333/112 ซ.เอแบค<br />
                    บางนา-ตราด กม.26<br />
                    Bang Bo, Samut Prakan 10560
                  </p>
                </div>
                <a href="https://maps.app.goo.gl/Cm358RNGQ4bQeGXRA" target="_blank" rel="noopener noreferrer" className="block mt-3">
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border hover:opacity-90 transition-opacity">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.0!2d100.7!3d13.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDMwJzAwLjAiTiAxMDDCsDQyJzAwLjAiRQ!5e0!3m2!1sen!2sth!4v1234567890" width="100%" height="100%" style={{
                    border: 0
                  }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="SANTOR Location" />
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h3>
              <div className="flex flex-col gap-3">
                <a href="https://www.instagram.com/santorbrands/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a href="https://www.facebook.com/santorbrands/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a href="https://www.tiktok.com/@santorbrands" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="text-sm">TikTok</span>
                </a>
                
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SANTOR. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>;
};
export default Footer;