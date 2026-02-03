// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Menu, X } from 'lucide-react';

export function Navbar({
  currentPage,
  onNavigate
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    id: 'home',
    label: '首页'
  }, {
    id: 'daode',
    label: '道得'
  }, {
    id: 'shude',
    label: '术得'
  }, {
    id: 'about',
    label: '关于'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer hover:text-[#00d4ff] transition-colors" style={{
          fontFamily: 'Space Grotesk, sans-serif'
        }} onClick={() => onNavigate('home')}>
            <span className="text-[#00d4ff]">My</span>
            <span className="text-white">Blog</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <button key={item.id} onClick={() => onNavigate(item.id)} className={`relative py-2 transition-all duration-300 ${currentPage === item.id ? 'text-[#00d4ff]' : 'text-white/80 hover:text-[#00d4ff]'}`} style={{
            fontFamily: 'Space Grotesk, sans-serif'
          }}>
                {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                {item.label}
                {currentPage === item.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />}
              </button>)}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            {navItems.map(item => <button key={item.id} onClick={() => {
          onNavigate(item.id);
          setIsMenuOpen(false);
        }} className={`block w-full text-left py-2 transition-all duration-300 ${currentPage === item.id ? 'text-[#00d4ff]' : 'text-white/80 hover:text-[#00d4ff]'}`} style={{
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
                {item.icon && <item.icon className="h-4 w-4 mr-1 inline" />}
                {item.label}
              </button>)}
          </div>}
      </div>
    </nav>;
}