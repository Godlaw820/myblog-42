// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Eye, TrendingUp, BookOpen, Users, ArrowRight } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function Home(props) {
  const {
    toast
  } = useToast();
  const [stats, setStats] = useState(null);
  const [popularArticles, setPopularArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 获取统计数据
        const statsResult = await props.$w.cloud.callDataSource({
          dataSourceName: 'site_stats',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {}
            },
            select: {
              $master: true
            },
            pageSize: 1,
            pageNumber: 1
          }
        });
        if (statsResult.records && statsResult.records.length > 0) {
          const statsData = statsResult.records[0];
          setStats([{
            label: '总浏览量',
            value: statsData.totalViews.toLocaleString(),
            icon: Eye,
            color: '#00d4ff'
          }, {
            label: '文章总数',
            value: statsData.totalArticles,
            icon: BookOpen,
            color: '#ff6b9d'
          }, {
            label: '访客人数',
            value: statsData.totalVisitors.toLocaleString(),
            icon: Users,
            color: '#00d4ff'
          }, {
            label: '本月增长',
            value: statsData.monthlyGrowth,
            icon: TrendingUp,
            color: '#ff6b9d'
          }]);
        }

        // 获取热门文章（按浏览量排序，取前5篇）
        const articlesResult = await props.$w.cloud.callDataSource({
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
              views: 'desc'
            }],
            pageSize: 5,
            pageNumber: 1
          }
        });
        if (articlesResult.records) {
          setPopularArticles(articlesResult.records.map(article => ({
            id: article._id,
            title: article.title,
            views: article.views,
            category: article.category,
            date: article.date
          })));
        }
      } catch (error) {
        console.error('获取数据失败:', error);
        toast({
          title: '获取数据失败',
          description: error.message || '请稍后重试',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [props.$w.cloud, toast]);
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

      <Navbar currentPage="home" onNavigate={handleNavigate} />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight font-['Space_Grotesk']">
              欢迎来到我的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#ff6b9d]">
                数字空间
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl font-['Inter']">
              在这里，我分享技术探索、设计思考和生活感悟。每一篇文章都是一次思想的碰撞。
            </p>
          </section>

          {/* Stats Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk']">
              数据概览
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats && stats.map((stat, index) => <GlassCard key={index} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-white font-['Space_Grotesk']">
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
              <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                热门文章
              </h2>
              <button onClick={() => handleNavigate('daode')} className="flex items-center text-[#00d4ff] hover:text-[#ff6b9d] transition-colors font-['Inter']">
                查看全部
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map(article => <GlassCard key={article.id} className="p-6 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => props.$w.utils.navigateTo({
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
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-[#00d4ff] transition-colors font-['Space_Grotesk']">
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