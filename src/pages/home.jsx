// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { BookOpen, Filter } from 'lucide-react';

import { Navbar } from '@/components/Navbar.jsx';
import { ArticleCard } from '@/components/ArticleCard.jsx';
export default function Home(props) {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showFilter, setShowFilter] = useState(false);
  const categories = ['全部', '技术', '生活', '设计', '随笔'];
  const articles = [{
    id: 1,
    title: '探索现代前端开发的未来',
    excerpt: '随着技术的不断演进，前端开发正在经历一场深刻的变革。从传统的页面构建到如今的应用开发，我们需要重新思考开发范式...',
    category: '技术',
    date: '2024-01-15',
    readTime: '8 分钟',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'
  }, {
    id: 2,
    title: '极简主义生活的艺术',
    excerpt: '在这个信息爆炸的时代，学会做减法比做加法更重要。极简主义不仅仅是生活方式，更是一种思维方式的转变...',
    category: '生活',
    date: '2024-01-12',
    readTime: '6 分钟',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80'
  }, {
    id: 3,
    title: '设计思维在产品开发中的应用',
    excerpt: '优秀的产品不仅仅是功能的堆砌，更是对用户需求的深刻理解。设计思维为我们提供了一套系统化的方法论...',
    category: '设计',
    date: '2024-01-10',
    readTime: '10 分钟',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
  }, {
    id: 4,
    title: '秋日随笔：时光的痕迹',
    excerpt: '秋天的阳光总是带着一种特殊的温暖，让人忍不住想要停下来，静静地感受时光的流逝...',
    category: '随笔',
    date: '2024-01-08',
    readTime: '5 分钟',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
  }, {
    id: 5,
    title: 'React Hooks 最佳实践指南',
    excerpt: 'Hooks 的出现彻底改变了我们编写 React 组件的方式。掌握这些最佳实践，让你的代码更加优雅和高效...',
    category: '技术',
    date: '2024-01-05',
    readTime: '12 分钟',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
  }, {
    id: 6,
    title: '色彩心理学在界面设计中的运用',
    excerpt: '色彩不仅仅是视觉元素，更是情感的载体。了解色彩心理学，让你的设计更具说服力和感染力...',
    category: '设计',
    date: '2024-01-03',
    readTime: '7 分钟',
    image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&q=80'
  }];
  const filteredArticles = selectedCategory === '全部' ? articles : articles.filter(a => a.category === selectedCategory);
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
  return <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar currentPage="home" onNavigate={handleNavigate} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                探索、思考、
                <span className="text-[#C4704B]">分享</span>
              </h1>
              <p className="text-lg text-[#1A1A1A]/70 mb-8 leading-relaxed max-w-xl" style={{
              fontFamily: 'Lora, serif'
            }}>
                在这里，我记录技术探索、生活感悟和设计思考。
                每一篇文章都是一次心灵的对话。
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-[#1A1A1A]/60">
                  <BookOpen size={20} className="mr-2 text-[#C4704B]" />
                  <span style={{
                  fontFamily: 'Lora, serif'
                }}>{articles.length} 篇文章</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 relative">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#D4A574]/30" />
                <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80" alt="Blog Hero" className="relative w-full h-80 object-cover shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 border-y border-[#D4A574]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <button onClick={() => setShowFilter(!showFilter)} className="flex items-center text-[#1A1A1A] hover:text-[#C4704B] transition-colors duration-300" style={{
            fontFamily: 'Lora, serif'
          }}>
              <Filter size={20} className="mr-2" />
              分类筛选
            </button>
            
            {showFilter && <div className="flex flex-wrap gap-3">
                {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedCategory === category ? 'bg-[#C4704B] text-white' : 'bg-white text-[#1A1A1A] hover:bg-[#D4A574]/10'}`} style={{
              fontFamily: 'Lora, serif'
            }}>
                    {category}
                  </button>)}
              </div>}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => <div key={article.id} className={index % 3 === 1 ? 'lg:mt-12' : ''}>
                <ArticleCard article={article} onRead={handleReadArticle} />
              </div>)}
          </div>

          {filteredArticles.length === 0 && <div className="text-center py-16">
              <p className="text-[#1A1A1A]/60 text-lg" style={{
            fontFamily: 'Lora, serif'
          }}>
                暂无该分类的文章
              </p>
            </div>}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#D4A574]/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#1A1A1A]/60" style={{
          fontFamily: 'Lora, serif'
        }}>
            © 2024 MyBlog. 用心记录，用爱分享。
          </p>
        </div>
      </footer>
    </div>;
}