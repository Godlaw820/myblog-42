// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Eye, TrendingUp, BookOpen, Users, ArrowRight } from 'lucide-react';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function Home(props) {
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const stats = [{
    label: '总浏览量',
    value: '12,580',
    icon: Eye,
    color: '#00d4ff'
  }, {
    label: '文章总数',
    value: '48',
    icon: BookOpen,
    color: '#ff6b9d'
  }, {
    label: '访客人数',
    value: '3,240',
    icon: Users,
    color: '#00d4ff'
  }, {
    label: '本月增长',
    value: '+23%',
    icon: TrendingUp,
    color: '#ff6b9d'
  }];
  const popularArticles = [{
    id: 1,
    title: 'React Hooks 深度解析',
    views: 2340,
    category: '技术',
    date: '2024-01-15'
  }, {
    id: 2,
    title: '前端性能优化实践',
    views: 1890,
    category: '技术',
    date: '2024-01-12'
  }, {
    id: 3,
    title: '设计思维与产品创新',
    views: 1560,
    category: '设计',
    date: '2024-01-10'
  }, {
    id: 4,
    title: '极简主义生活指南',
    views: 1230,
    category: '生活',
    date: '2024-01-08'
  }, {
    id: 5,
    title: 'TypeScript 高级技巧',
    views: 980,
    category: '技术',
    date: '2024-01-05'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#ff6b9d]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#00d4ff]/10 rounded-full blur-3xl" />
      </div>

      <Navbar currentPage="home" onNavigate={handleNavigate} />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{
            fontFamily: 'Space Grotesk, sans-serif'
          }}>
              欢迎来到我的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#ff6b9d]">
                数字空间
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl" style={{
            fontFamily: 'Inter, sans-serif'
          }}>
              在这里，我分享技术探索、设计思考和生活感悟。每一篇文章都是一次思想的碰撞。
            </p>
          </section>

          {/* Stats Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6" style={{
            fontFamily: 'Space Grotesk, sans-serif'
          }}>
              数据概览
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => <GlassCard key={index} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-white" style={{
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}>
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl" style={{
                  backgroundColor: `${stat.color}20`
                }}>
                      <stat.icon size={24} style={{
                    color: stat.color
                  }} />
                    </div>
                  </div>
                </GlassCard>)}
            </div>
          </section>

          {/* Popular Articles */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white" style={{
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
                热门文章
              </h2>
              <button onClick={() => handleNavigate('daode')} className="flex items-center text-[#00d4ff] hover:text-[#ff6b9d] transition-colors" style={{
              fontFamily: 'Inter, sans-serif'
            }}>
                查看全部
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map(article => <GlassCard key={article.id} className="p-6 cursor-pointer" onClick={() => props.$w.utils.navigateTo({
              pageId: 'article',
              params: {
                id: article.id
              }
            })}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-[#00d4ff]/20 text-[#00d4ff] text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-white/40 text-sm">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-[#00d4ff] transition-colors" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                    {article.title}
                  </h3>
                  <div className="flex items-center text-white/60">
                    <Eye size={16} className="mr-2" />
                    <span className="text-sm">{article.views.toLocaleString()} 次浏览</span>
                  </div>
                </GlassCard>)}
            </div>
          </section>
        </div>
      </div>
    </div>;
}