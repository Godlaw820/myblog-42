// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Code, Database, Layout, Server, Smartphone, Zap, Settings } from 'lucide-react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function Shude(props) {
  const {
    toast
  } = useToast();
  const [techProjects, setTechProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  useEffect(() => {
    const fetchTechArticles = async () => {
      try {
        setLoading(true);

        // 获取技术类别的文章
        const result = await props.$w.cloud.callDataSource({
          dataSourceName: 'article',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {
                $and: [{
                  category: {
                    $eq: '技术'
                  }
                }]
              }
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
          // 为每篇文章分配图标和颜色
          const icons = [Layout, Server, Database, Smartphone, Zap, Code];
          const colors = ['#00d4ff', '#ff6b9d'];
          setTechProjects(result.records.map((article, index) => ({
            id: article._id,
            title: article.title,
            description: article.excerpt,
            tags: ['技术'],
            icon: icons[index % icons.length],
            color: colors[index % colors.length],
            image: article.image
          })));
        }
      } catch (error) {
        console.error('获取技术文章失败:', error);
        toast({
          title: '获取技术文章失败',
          description: error.message || '请稍后重试',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTechArticles();
  }, [props.$w.cloud, toast]);
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#ff6b9d]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#00d4ff]/10 rounded-full blur-3xl" />
      </div>

      <Navbar currentPage="shude" onNavigate={handleNavigate} />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                  术得
                </h1>
                <p className="text-xl text-white/70 max-w-2xl" style={{
                fontFamily: 'Inter, sans-serif'
              }}>
                  技术实现与工程实践。在这里，我分享具体的技术方案、代码实现和项目经验。
                </p>
              </div>
              <Button onClick={() => handleNavigate('admin')} className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                <Settings className="h-4 w-4 mr-2" />
                管理文章
              </Button>
            </div>
          </section>

          {/* Tech Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techProjects.map(project => <GlassCard key={project.id} className="overflow-hidden cursor-pointer" onClick={() => props.$w.utils.navigateTo({
            pageId: 'article',
            params: {
              id: project.id
            }
          })}>
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="p-3 rounded-xl inline-block" style={{
                  backgroundColor: `${project.color}20`
                }}>
                      <project.icon size={24} style={{
                    color: project.color
                  }} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight hover:text-[#00d4ff] transition-colors" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full">
                        {tag}
                      </span>)}
                  </div>
                </div>
              </GlassCard>)}
          </div>
        </div>
      </div>
    </div>;
}