// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

import { Navbar } from '@/components/Navbar.jsx';
export default function About(props) {
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  return <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar currentPage="about" onNavigate={handleNavigate} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#D4A574]/30" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="Author" className="relative w-full h-96 object-cover shadow-lg" />
              </div>
            </div>

            {/* Content */}
            <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
              <span className="inline-block px-3 py-1 bg-[#6B7A5F] text-white text-xs font-medium tracking-wider uppercase mb-6">
                关于作者
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                你好，我是
                <span className="text-[#C4704B]">博主</span>
              </h1>
              <p className="text-lg text-[#1A1A1A]/70 mb-6 leading-relaxed" style={{
              fontFamily: 'Lora, serif'
            }}>
                一名热爱技术、设计和生活的开发者。我相信代码可以改变世界，
                设计可以美化生活，而写作可以记录成长。
              </p>
              <p className="text-lg text-[#1A1A1A]/70 mb-8 leading-relaxed" style={{
              fontFamily: 'Lora, serif'
            }}>
                在这个博客里，我分享我的技术探索、设计思考和生活感悟。
                希望我的文章能够给你带来启发和帮助。
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#D4A574]/30 flex items-center justify-center text-[#1A1A1A] hover:bg-[#C4704B] hover:text-white hover:border-[#C4704B] transition-all duration-300">
                  <Mail size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#D4A574]/30 flex items-center justify-center text-[#1A1A1A] hover:bg-[#C4704B] hover:text-white hover:border-[#C4704B] transition-all duration-300">
                  <Github size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#D4A574]/30 flex items-center justify-center text-[#1A1A1A] hover:bg-[#C4704B] hover:text-white hover:border-[#C4704B] transition-all duration-300">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#D4A574]/30 flex items-center justify-center text-[#1A1A1A] hover:bg-[#C4704B] hover:text-white hover:border-[#C4704B] transition-all duration-300">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            技能专长
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Skill Card 1 */}
            <div className="p-8 border border-[#D4A574]/20 hover:border-[#C4704B] transition-all duration-300">
              <div className="w-12 h-12 bg-[#C4704B]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                前端开发
              </h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed" style={{
              fontFamily: 'Lora, serif'
            }}>
                精通 React、Vue 等现代前端框架，擅长构建高性能、可维护的用户界面。
              </p>
            </div>

            {/* Skill Card 2 */}
            <div className="p-8 border border-[#D4A574]/20 hover:border-[#C4704B] transition-all duration-300">
              <div className="w-12 h-12 bg-[#6B7A5F]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                UI/UX 设计
              </h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed" style={{
              fontFamily: 'Lora, serif'
            }}>
                注重用户体验，擅长创建美观且易用的界面设计，追求细节的完美。
              </p>
            </div>

            {/* Skill Card 3 */}
            <div className="p-8 border border-[#D4A574]/20 hover:border-[#C4704B] transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4A574]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                技术写作
              </h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed" style={{
              fontFamily: 'Lora, serif'
            }}>
                善于将复杂的技术概念转化为通俗易懂的文章，帮助他人学习和成长。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            联系我
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 mb-8" style={{
          fontFamily: 'Lora, serif'
        }}>
            如果你有任何问题、建议或合作意向，欢迎随时联系我。
          </p>
          <a href="mailto:hello@myblog.com" className="inline-flex items-center px-8 py-3 bg-[#C4704B] text-white font-medium hover:bg-[#1A1A1A] transition-colors duration-300" style={{
          fontFamily: 'Lora, serif'
        }}>
            <Mail size={18} className="mr-2" />\n            发送邮件
          </a>
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