// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, Calendar, Clock, Share2, Heart } from 'lucide-react';

import { Navbar } from '@/components/Navbar.jsx';
export default function Article(props) {
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const articles = {
    1: {
      id: 1,
      title: '探索现代前端开发的未来',
      category: '技术',
      date: '2024-01-15',
      readTime: '8 分钟',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
      content: `
        <p class="mb-6">随着技术的不断演进，前端开发正在经历一场深刻的变革。从传统的页面构建到如今的应用开发，我们需要重新思考开发范式。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">技术栈的演进</h2>
        <p class="mb-6">过去几年，我们见证了从 jQuery 到 React、Vue、Angular 的转变。这不仅仅是框架的更替，更是开发思维的革新。组件化、声明式编程、虚拟 DOM 等概念已经成为现代前端开发的基础。</p>
        
        <p class="mb-6">现在，我们正站在新的转折点上。Server Components、Edge Computing、AI 辅助开发等新技术正在重塑我们的工作方式。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">性能优化的新思路</h2>
        <p class="mb-6">性能优化不再仅仅是减少 HTTP 请求或压缩资源。我们需要考虑更复杂的因素：首屏渲染时间、交互响应速度、内存占用、网络适应性等。</p>
        
        <p class="mb-6">现代浏览器提供了强大的 API，让我们能够更精细地控制性能。从 Service Worker 到 WebAssembly，从 WebGPU 到 WebRTC，技术的边界正在不断扩展。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">开发者体验的重要性</h2>
        <p class="mb-6">优秀的开发者体验是高效开发的基础。工具链的完善、调试的便利性、文档的质量，这些因素直接影响着开发效率和代码质量。</p>
        
        <p class="mb-6">TypeScript 的普及、ESLint 和 Prettier 的标准化、Git 工作流的成熟，让团队协作变得更加顺畅。而 AI 工具的出现，更是为开发者提供了前所未有的辅助能力。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">未来展望</h2>
        <p class="mb-6">前端开发的未来充满了可能性。WebAssembly 让我们能够在浏览器中运行高性能应用，WebGPU 带来了强大的图形处理能力，而 AI 则正在改变我们编写代码的方式。</p>
        
        <p class="mb-6">作为开发者，我们需要保持学习的热情，拥抱变化，同时也要记住技术的本质——为用户创造价值。</p>
      `
    },
    2: {
      id: 2,
      title: '极简主义生活的艺术',
      category: '生活',
      date: '2024-01-12',
      readTime: '6 分钟',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&q=80',
      content: `
        <p class="mb-6">在这个信息爆炸的时代，学会做减法比做加法更重要。极简主义不仅仅是生活方式，更是一种思维方式的转变。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">什么是极简主义</h2>
        <p class="mb-6">极简主义不是苦行僧式的生活，而是有意识地选择对自己真正重要的东西。它让我们从物质的束缚中解放出来，专注于更有意义的事情。</p>
        
        <p class="mb-6">当我们减少不必要的物品和活动时，我们获得了更多的时间和精力去关注真正重要的事情：健康、关系、个人成长。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">如何开始极简生活</h2>
        <p class="mb-6">开始极简生活不需要一次性改变所有事情。可以从小的方面开始：清理一个抽屉、取消一个不常用的订阅、减少社交媒体的使用时间。</p>
        
        <p class="mb-6">重要的是培养一种意识：在购买或接受任何东西之前，问自己是否真的需要它。这个简单的习惯会逐渐改变你的生活方式。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">极简主义带来的改变</h2>
        <p class="mb-6">实践极简主义后，你会发现生活变得更加轻松。不再被物品所累，不再被信息所扰，你能够更专注于当下，享受生活的每一个瞬间。</p>
        
        <p class="mb-6">更重要的是，极简主义让你学会了珍惜。当你拥有的东西变少时，每一件物品都变得更加珍贵，每一次体验都变得更加深刻。</p>
      `
    },
    3: {
      id: 3,
      title: '设计思维在产品开发中的应用',
      category: '设计',
      date: '2024-01-10',
      readTime: '10 分钟',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
      content: `
        <p class="mb-6">优秀的产品不仅仅是功能的堆砌，更是对用户需求的深刻理解。设计思维为我们提供了一套系统化的方法论。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">同理心是核心</h2>
        <p class="mb-6">设计思维的第一步是培养同理心。我们需要真正理解用户的痛点、需求和期望，而不是基于假设来设计产品。</p>
        
        <p class="mb-6">用户访谈、观察、情境模拟等方法帮助我们深入了解用户。只有真正站在用户的角度思考，才能设计出真正有价值的产品。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">定义问题</h2>
        <p class="mb-6">在理解用户之后，我们需要清晰地定义问题。一个好的问题定义能够引导我们找到正确的解决方案。</p>
        
        <p class="mb-6">问题定义应该具体、可衡量、与用户相关。避免过于宽泛或模糊的表述，聚焦于真正需要解决的核心问题。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">快速原型与迭代</h2>
        <p class="mb-6">设计思维强调快速原型和持续迭代。不要等到完美才开始，而是通过不断的测试和反馈来改进产品。</p>
        
        <p class="mb-6">低保真原型、用户测试、数据分析，这些工具帮助我们快速验证想法，及时调整方向，避免在错误的道路上走得太远。</p>
      `
    },
    4: {
      id: 4,
      title: '秋日随笔：时光的痕迹',
      category: '随笔',
      date: '2024-01-08',
      readTime: '5 分钟',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
      content: `
        <p class="mb-6">秋天的阳光总是带着一种特殊的温暖，让人忍不住想要停下来，静静地感受时光的流逝。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">秋天的色彩</h2>
        <p class="mb-6">走在铺满落叶的小径上，脚下发出沙沙的声响。金黄、橙红、深褐，这些色彩交织在一起，构成了一幅天然的画卷。</p>
        
        <p class="mb-6">每一片落叶都承载着一段时光的记忆。它们曾经在枝头绽放，如今归于泥土，完成了一个生命的轮回。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">时光的感悟</h2>
        <p class="mb-6">秋天总是让人思考。思考过去，思考现在，思考未来。时光如流水，一去不复返，但留下的痕迹却永远存在。</p>
        
        <p class="mb-6">我们无法阻止时间的流逝，但可以选择如何度过每一刻。珍惜当下，感恩拥有，这或许就是秋天给我们的启示。</p>
      `
    },
    5: {
      id: 5,
      title: 'React Hooks 最佳实践指南',
      category: '技术',
      date: '2024-01-05',
      readTime: '12 分钟',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
      content: `
        <p class="mb-6">Hooks 的出现彻底改变了我们编写 React 组件的方式。掌握这些最佳实践，让你的代码更加优雅和高效。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">useState 的正确使用</h2>
        <p class="mb-6">useState 是最基础的 Hook，但也有很多细节需要注意。函数式更新、避免不必要的渲染、合理拆分状态，这些都是需要掌握的技巧。</p>
        
        <p class="mb-6">当新状态依赖于旧状态时，使用函数式更新可以避免潜在的竞态条件问题。同时，将相关的状态合并到一个对象中，可以减少组件的重新渲染次数。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">useEffect 的陷阱</h2>
        <p class="mb-6">useEffect 是最容易被误用的 Hook。理解依赖数组的作用、正确清理副作用、避免无限循环，这些都是使用 useEffect 时必须注意的问题。</p>
        
        <p class="mb-6">记住，useEffect 的目的是处理副作用，而不是替代生命周期方法。合理使用它，可以让你的组件逻辑更加清晰。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">自定义 Hook 的威力</h2>
        <p class="mb-6">自定义 Hook 是代码复用的强大工具。将可复用的逻辑提取到自定义 Hook 中，可以让你的代码更加模块化和可维护。</p>
        
        <p class="mb-6">一个好的自定义 Hook 应该专注于单一职责，有清晰的输入输出，并且易于测试和使用。</p>
      `
    },
    6: {
      id: 6,
      title: '色彩心理学在界面设计中的运用',
      category: '设计',
      date: '2024-01-03',
      readTime: '7 分钟',
      image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=1200&q=80',
      content: `
        <p class="mb-6">色彩不仅仅是视觉元素，更是情感的载体。了解色彩心理学，让你的设计更具说服力和感染力。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">色彩的情感表达</h2>
        <p class="mb-6">不同的色彩会引发不同的情感反应。红色代表热情和紧迫，蓝色传达信任和专业，绿色象征生命和成长，黄色带来活力和乐观。</p>
        
        <p class="mb-6">在界面设计中，我们需要根据产品的定位和目标用户，选择合适的色彩方案。色彩应该服务于设计目标，而不是随意选择。</p>
        
        <h2 class="text-2xl font-bold mb-4 mt-8">色彩的对比与和谐</h2>
        <p class="mb-6">优秀的色彩设计需要在对比和和谐之间找到平衡。对比可以突出重点，引导用户的注意力；和谐则创造舒适的视觉体验。</p>
        
        <p class="mb-6">使用色彩理论工具，如色轮、配色方案生成器，可以帮助我们创建既美观又实用的色彩组合。</p>
      `
    }
  };
  useEffect(() => {
    const articleId = props.$w.page.dataset.params.id;
    if (articleId && articles[articleId]) {
      setArticle(articles[articleId]);
    }
  }, [props.$w.page.dataset.params.id]);
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const handleBack = () => {
    props.$w.utils.navigateBack();
  };
  if (!article) {
    return <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <p className="text-[#1A1A1A]/60" style={{
        fontFamily: 'Lora, serif'
      }}>
          文章不存在
        </p>
      </div>;
  }
  return <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar currentPage="article" onNavigate={handleNavigate} />

      {/* Back Button */}
      <div className="pt-28 px-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={handleBack} className="flex items-center text-[#1A1A1A] hover:text-[#C4704B] transition-colors duration-300 mb-8" style={{
          fontFamily: 'Lora, serif'
        }}>
            <ArrowLeft size={20} className="mr-2" />
            返回列表
          </button>
        </div>
      </div>

      {/* Article Header */}
      <article className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Category */}
          <span className="inline-block px-3 py-1 bg-[#6B7A5F] text-white text-xs font-medium tracking-wider uppercase mb-6">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6 leading-tight" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center space-x-6 text-[#1A1A1A]/60 mb-8">
            <span className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {article.date}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-2" />
              {article.readTime}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setLiked(!liked)} className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${liked ? 'bg-[#C4704B] text-white' : 'bg-white text-[#1A1A1A] hover:bg-[#D4A574]/10'}`} style={{
            fontFamily: 'Lora, serif'
          }}>
              <Heart size={16} className={`mr-2 ${liked ? 'fill-current' : ''}`} />
              {liked ? '已喜欢' : '喜欢'}
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-[#1A1A1A] rounded-full hover:bg-[#D4A574]/10 transition-all duration-300" style={{
            fontFamily: 'Lora, serif'
          }}>
              <Share2 size={16} className="mr-2" />
              分享
            </button>
          </div>

          {/* Featured Image */}
          <div className="relative mb-12">
            <div className="absolute -top-2 -left-2 w-full h-full border-2 border-[#D4A574]/30" />
            <img src={article.image} alt={article.title} className="relative w-full h-96 object-cover shadow-lg" />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none" style={{
          fontFamily: 'Lora, serif'
        }} dangerouslySetInnerHTML={{
          __html: article.content
        }} />
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#D4A574]/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#1A1A1A]/60" style={{
          fontFamily: 'Lora, serif'
        }}>
            © 2024 MyBlog. 用心记录，用爱分享。
          </p>
        </div>
      </footer>
    </div>;
}