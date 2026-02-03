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
    id: 'about',
    label: '关于'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#D4A574]/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer" style={{
          fontFamily: 'Playfair Display, serif'
        }} onClick={() => onNavigate('home')}>
            <span className="text-[#C4704B]">My</span>
            <span className="text-[#1A1A1A]">Blog</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <button key={item.id} onClick={() => onNavigate(item.id)} className={`relative py-2 transition-colors duration-300 ${currentPage === item.id ? 'text-[#C4704B]' : 'text-[#1A1A1A] hover:text-[#C4704B]'}`} style={{
            fontFamily: 'Lora, serif'
          }}>
                {item.label}
                {currentPage === item.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4704B]" />}
              </button>)}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#1A1A1A]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden mt-4 pb-4 border-t border-[#D4A574]/20 pt-4">
            {navItems.map(item => <button key={item.id} onClick={() => {
          onNavigate(item.id);
          setIsMenuOpen(false);
        }} className={`block w-full text-left py-2 transition-colors duration-300 ${currentPage === item.id ? 'text-[#C4704B]' : 'text-[#1A1A1A]'}`} style={{
          fontFamily: 'Lora, serif'
        }}>
                {item.label}
              </button>)}
          </div>}
      </div>
    </nav>;
}