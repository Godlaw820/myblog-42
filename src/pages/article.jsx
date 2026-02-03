// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, Calendar, Clock, Share2, Heart, Eye } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function Article(props) {
  const {
    toast
  } = useToast();
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 加载文章数据
  useEffect(() => {
    const fetchArticle = async () => {
      const articleId = props.$w.page.dataset.params.id;
      if (!articleId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const result = await props.$w.cloud.callDataSource({
          dataSourceName: 'article',
          methodName: 'wedaGetItemV2',
          params: {
            filter: {
              where: {
                $and: [{
                  _id: {
                    $eq: articleId
                  }
                }]
              }
            },
            select: {
              $master: true
            }
          }
        });
        if (result) {
          setArticle(result);
          setViewCount(result.views || 0);
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
    fetchArticle();
  }, [props.$w.page.dataset.params.id, props.$w.cloud, toast]);
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const handleBack = () => {
    props.$w.utils.navigateBack();
  };
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center relative overflow-hidden">
        {/* 动态光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
        
        <div className="text-white text-xl relative z-10">加载中...</div>
      </div>;
  }
  if (!article) {
    return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center relative overflow-hidden">
        {/* 动态光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
        
        <p className="text-white/60 font-['Space_Grotesk'] text-xl relative z-10">
          文章不存在
        </p>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] relative overflow-hidden">
      {/* 动态光晕背景 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '0.5s'
      }} />
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
      </div>

      <Navbar currentPage="article" onNavigate={handleNavigate} />

      {/* Back Button */}
      <div className="pt-28 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <button onClick={handleBack} className="flex items-center text-white/80 hover:text-cyan-400 transition-colors duration-300 mb-8 font-['Space_Grotesk'] group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            返回列表
          </button>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-6 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 lg:p-12">
            {/* Category */}
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-medium tracking-wider uppercase mb-6 rounded-full font-['Space_Grotesk'] shadow-lg shadow-cyan-500/30">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-['Space_Grotesk']">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8 font-['Inter']">
              <span className="flex items-center">
                <Calendar size={16} className="mr-2 text-cyan-400" />
                {article.date}
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-2 text-cyan-400" />
                {article.readTime}
              </span>
              <span className="flex items-center">
                <Eye size={16} className="mr-2 text-pink-400" />
                {viewCount.toLocaleString()} 次浏览
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button onClick={() => setLiked(!liked)} className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 font-['Space_Grotesk'] ${liked ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}>
                <Heart size={18} className={`mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? '已喜欢' : '喜欢'}
              </button>
              <button className="flex items-center px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 font-['Space_Grotesk']">
                <Share2 size={18} className="mr-2" />
                分享
              </button>
            </div>

            {/* Featured Image */}
            <div className="relative mb-12 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-pink-500/20" />
              <img src={article.image} alt={article.title} className="relative w-full h-96 object-cover" />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none font-['Inter'] text-white/80" dangerouslySetInnerHTML={{
            __html: article.content
          }} />
          </GlassCard>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-6">
            <p className="text-white/60 font-['Space_Grotesk']">
              © 2024 MyBlog. 用心记录，用爱分享。
            </p>
          </GlassCard>
        </div>
      </footer>
    </div>;
}