import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'Women', path: '/shop/women' },
        { name: 'Men', path: '/shop/men' },
        { name: 'Accessories', path: '/shop/accessories' },
        { name: 'New Arrivals', path: '/shop/new-arrivals' },
        { name: 'Sale', path: '/shop/sale' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Sustainability', path: '/sustainability' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Shipping', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
        { name: 'Size Guide', path: '/size-guide' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="container-luxury py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-serif mb-4">Join Our World</h3>
            <p className="text-background/60 text-sm mb-8">
              Subscribe to receive updates on new arrivals, exclusive offers, and style inspiration.
            </p>
            <form className="flex gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-background/30 px-4 py-3 text-sm placeholder:text-background/40 focus:outline-none focus:border-background"
              />
              <button className="bg-background text-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-background/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="block mb-6">
              <h2 className="text-2xl font-serif tracking-[0.1em]">SUPREMA</h2>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Timeless elegance meets contemporary design. Crafted for those who appreciate the finer things.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 border border-background/30 hover:border-background transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" strokeWidth={1} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-background/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-background/40">
              © 2024 SUPREMA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-xs text-background/40 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-background/40 hover:text-background transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
