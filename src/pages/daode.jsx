// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Calendar, Clock, Eye, Filter, Search } from 'lucide-react';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function Daode(props) {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['全部', '技术', '设计', '生活', '随笔'];
  const articles = [{
    id: 1,
    title: 'React Hooks 深度解析',
    excerpt: 'Hooks 的出现彻底改变了我们编写 React 组件的方式。本文将深入探讨 Hooks 的原理、最佳实践以及常见陷阱...',
    category: '技术',
    date: '2024-01-15',
    readTime: '12 分钟',
    views: 2340,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
  }, {
    id: 2,
    title: '设计思维与产品创新',
    excerpt: '优秀的产品不仅仅是功能的堆砌，更是对用户需求的深刻理解。设计思维为我们提供了一套系统化的方法论...',
    category: '设计',
    date: '2024-01-12',
    readTime: '10 分钟',
    views: 1890,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
  }, {
    id: 3,
    title: '极简主义生活指南',
    excerpt: '在这个信息爆炸的时代，学会做减法比做加法更重要。极简主义不仅仅是生活方式，更是一种思维方式的转变...',
    category: '生活',
    date: '2024-01-10',
    readTime: '8 分钟',
    views: 1560,
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80'
  }, {
    id: 4,
    title: '前端性能优化实践',
    excerpt: '性能优化是前端开发中永恒的话题。本文将分享我在实际项目中积累的性能优化经验和技巧...',
    category: '技术',
    date: '2024-01-08',
    readTime: '15 分钟',
    views: 1230,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'
  }, {
    id: 5,
    title: '秋日随笔：时光的痕迹',
    excerpt: '秋天的阳光总是带着一种特殊的温暖，让人忍不住想要停下来，静静地感受时光的流逝...',
    category: '随笔',
    date: '2024-01-05',
    readTime: '6 分钟',
    views: 980,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
  }, {
    id: 6,
    title: 'TypeScript 高级技巧',
    excerpt: 'TypeScript 不仅仅是类型检查工具，更是一种思维方式。掌握这些高级技巧，让你的代码更加健壮和优雅...',
    category: '技术',
    date: '2024-01-03',
    readTime: '18 分钟',
    views: 870,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'
  }];
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === '全部' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const handleReadArticle = articleId => {
    props.$w.utils.navigateTo({
      pageId: 'article',
      params: {
        id: articleId
      }
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#ff6b9d]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#00d4ff]/10 rounded-full blur-3xl" />
      </div>

      <Navbar currentPage="daode" onNavigate={handleNavigate} />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4" style={{
            fontFamily: 'Space Grotesk, sans-serif'
          }}>
              道得
            </h1>
            <p className="text-xl text-white/70 max-w-2xl" style={{
            fontFamily: 'Inter, sans-serif'
          }}>
              在这里，我分享我的思考、感悟和见解。每一篇文章都是一次心灵的对话。
            </p>
          </section>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />\n              <input type="text" placeholder="搜索文章..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors" style={{
              fontFamily: 'Inter, sans-serif'
            }} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-xl transition-all duration-300 ${selectedCategory === category ? 'bg-[#00d4ff] text-[#1a1a2e] font-medium' : 'bg-white/10 text-white/80 hover:bg-white/20'}`} style={{
              fontFamily: 'Inter, sans-serif'
            }}>
                  {category}
                </button>)}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => <GlassCard key={article.id} className="overflow-hidden cursor-pointer" onClick={() => handleReadArticle(article.id)}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#00d4ff]/90 text-[#1a1a2e] text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-[#00d4ff] transition-colors" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                    {article.title}
                  </h3>
                  <p className="text-white/70 mb-4 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-white/60">
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
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {article.views}
                    </span>
                  </div>
                </div>
              </GlassCard>)}
          </div>

          {filteredArticles.length === 0 && <div className="text-center py-16">
              <p className="text-white/60 text-lg">没有找到匹配的文章</p>
            </div>}
        </div>
      </div>
    </div>;
}