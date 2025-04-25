import React from 'react'

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-purple-400">JobPortal</h2>
            <p className="mt-2 text-sm text-gray-400">
              Connecting talent with top companies. Your dream job is just a click away.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Home</a></li>
              <li><a href="#" className="hover:text-purple-400">Jobs</a></li>
              <li><a href="#" className="hover:text-purple-400">Browse</a></li>
              <li><a href="#" className="hover:text-purple-400">Contact</a></li>
            </ul>
          </div>
  
          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold">Resources</h3>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Resume Builder</a></li>
              <li><a href="#" className="hover:text-purple-400">Career Advice</a></li>
              <li><a href="#" className="hover:text-purple-400">Interview Tips</a></li>
              <li><a href="#" className="hover:text-purple-400">FAQs</a></li>
            </ul>
          </div>
  
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="mt-3 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} JobPortal. All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  