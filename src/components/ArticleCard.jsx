// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function ArticleCard({
  article,
  onRead,
  className = ''
}) {
  return <article className={`group bg-white border border-[#D4A574]/20 overflow-hidden hover:shadow-xl transition-all duration-500 ${className}`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-[#6B7A5F] text-white text-xs font-medium tracking-wider uppercase">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight group-hover:text-[#C4704B] transition-colors duration-300" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          {article.title}
        </h3>
        
        <p className="text-[#1A1A1A]/70 mb-4 line-clamp-2 leading-relaxed" style={{
        fontFamily: 'Lora, serif'
      }}>
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-[#1A1A1A]/60 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {article.date}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Read More */}
        <button onClick={() => onRead(article.id)} className="inline-flex items-center text-[#C4704B] font-medium hover:text-[#1A1A1A] transition-colors duration-300" style={{
        fontFamily: 'Lora, serif'
      }}>
          阅读更多
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </article>;
}