import Link from "next/link";
import { Camera, MapPin, Mail, Phone, Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-academy-black border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="#home" className="inline-block">
              <span className="text-3xl font-bold tracking-tighter text-academy-white">
                Step<span className="text-academy-gold">Up</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Where passion meets movement. Join the most prestigious dance academy and transform your rhythm into art.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-academy-gray flex items-center justify-center text-gray-400 hover:text-academy-gold hover:bg-gray-800 transition-all">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-academy-gray flex items-center justify-center text-gray-400 hover:text-academy-gold hover:bg-gray-800 transition-all">
                <Music2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-academy-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#classes" className="text-gray-400 hover:text-academy-gold transition-colors">Classes</Link>
              </li>
              <li>
                <Link href="#enroll" className="text-gray-400 hover:text-academy-gold transition-colors">Enroll</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-academy-gold flex-shrink-0 mt-1" />
                <span>123 Rhythm Avenue, Dance District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-academy-gold flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-academy-gold flex-shrink-0" />
                <span>hello@stepupacademy.com</span>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Location</h4>
            <div className="w-full h-40 bg-academy-gray rounded-xl border border-gray-800 overflow-hidden relative group">
              <div className="absolute inset-0 bg-academy-gold/10 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Map Location" 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <MapPin className="w-8 h-8 text-academy-gold animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} StepUp Dance Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
