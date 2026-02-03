// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Code, Database, Layout, Server, Smartphone, Zap } from 'lucide-react';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function Shude(props) {
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const techProjects = [{
    id: 1,
    title: 'React 组件库开发',
    description: '从零开始构建一个企业级 React 组件库，包含 30+ 常用组件，支持主题定制和按需加载。',
    tags: ['React', 'TypeScript', 'Storybook'],
    icon: Layout,
    color: '#00d4ff',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
  }, {
    id: 2,
    title: 'Node.js 微服务架构',
    description: '基于 Node.js 构建的微服务架构，实现服务发现、负载均衡、熔断降级等核心功能。',
    tags: ['Node.js', 'Docker', 'Kubernetes'],
    icon: Server,
    color: '#ff6b9d',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
  }, {
    id: 3,
    title: '数据库性能优化',
    description: '深入分析数据库性能瓶颈，通过索引优化、查询优化、分库分表等手段提升系统性能。',
    tags: ['MySQL', 'Redis', 'MongoDB'],
    icon: Database,
    color: '#00d4ff',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  }, {
    id: 4,
    title: '移动端响应式设计',
    description: '实现一套代码适配多端设备，通过媒体查询、弹性布局、视口单位等技术实现完美响应式。',
    tags: ['CSS', 'Mobile', 'Responsive'],
    icon: Smartphone,
    color: '#ff6b9d',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
  }, {
    id: 5,
    title: '前端工程化实践',
    description: '搭建完整的前端工程化体系，包括构建优化、代码规范、自动化测试、CI/CD 流程等。',
    tags: ['Webpack', 'Vite', 'Jest'],
    icon: Zap,
    color: '#00d4ff',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'
  }, {
    id: 6,
    title: '算法与数据结构',
    description: '深入理解常用算法和数据结构，通过实际案例展示如何将理论应用到实际开发中。',
    tags: ['Algorithm', 'Data Structure', 'JavaScript'],
    icon: Code,
    color: '#ff6b9d',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80'
  }];
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