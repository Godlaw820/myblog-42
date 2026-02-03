// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Calendar, Clock, Eye, Filter, Search } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function Daode(props) {
  const {
    toast
  } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ['全部', '技术', '设计', '生活', '随笔'];
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
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const result = await props.$w.cloud.callDataSource({
          dataSourceName: 'article',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {}
            },
            select: {
              $master: true
            },
            orderBy: [{
              date: 'desc'
            }],
            pageSize: 100,
            pageNumber: 1
          }
        });
        if (result.records) {
          setArticles(result.records.map(article => ({
            id: article._id,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            date: article.date,
            readTime: article.readTime,
            views: article.views,
            image: article.image
          })));
        }
      } catch (error) {
        console.error('获取文章失败:', error);
        toast({
          title: '获取文章失败',
          description: error.message || '请稍后重试',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [props.$w.cloud, toast]);
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === '全部' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#ff6b9d]/20 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '0.5s'
      }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#00d4ff]/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
      </div>

      <Navbar currentPage="daode" onNavigate={handleNavigate} />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 font-['Space_Grotesk']">
                道得
              </h1>
              <p className="text-xl text-white/70 max-w-2xl font-['Inter']">
                在这里，我分享我的思考、感悟和见解。每一篇文章都是一次心灵的对话。
              </p>
            </div>
          </section>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input type="text" placeholder="搜索文章..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors font-['Inter']" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-xl transition-all duration-300 font-['Inter'] ${selectedCategory === category ? 'bg-[#00d4ff] text-[#1a1a2e] font-medium' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
                  {category}
                </button>)}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => <GlassCard key={article.id} className="overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => handleReadArticle(article.id)}>
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
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-[#00d4ff] transition-colors font-['Space_Grotesk']">
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