// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Github, Twitter, Mail, MapPin, Calendar, Award, Target } from 'lucide-react';

import { Navbar } from '@/components/Navbar.jsx';
import { GlassCard } from '@/components/GlassCard.jsx';
export default function About(props) {
  const handleNavigate = pageId => {
    props.$w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  const skills = [{
    name: 'React / Vue',
    level: 95
  }, {
    name: 'TypeScript',
    level: 90
  }, {
    name: 'Node.js',
    level: 85
  }, {
    name: 'Python',
    level: 80
  }, {
    name: 'UI/UX Design',
    level: 75
  }, {
    name: 'DevOps',
    level: 70
  }];
  const achievements = [{
    icon: Award,
    title: '开源贡献者',
    description: '在 GitHub 上贡献了多个开源项目，累计获得 1000+ stars'
  }, {
    icon: Target,
    title: '技术博主',
    description: '在各大技术平台发表原创文章 50+ 篇，累计阅读量 10万+'
  }, {
    icon: Calendar,
    title: '持续学习',
    description: '坚持每天学习新技术，已连续打卡 365 天'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#ff6b9d]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#00d4ff]/10 rounded-full blur-3xl" />
      </div>

      <Navbar currentPage="about" onNavigate={handleNavigate} />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <section className="mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4" style={{
            fontFamily: 'Space Grotesk, sans-serif'
          }}>
              关于我
            </h1>
            <p className="text-xl text-white/70 max-w-2xl" style={{
            fontFamily: 'Inter, sans-serif'
          }}>
              热爱技术，追求卓越。在这里，你可以了解我的背景、技能和经历。
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <GlassCard className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.5)]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#00d4ff] rounded-full border-4 border-[#1a1a2e]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                  Alex Chen
                </h2>
                <p className="text-[#00d4ff] mb-4">全栈开发工程师</p>
                <p className="text-white/70 mb-6 leading-relaxed">
                  5 年开发经验，专注于前端技术和用户体验。热爱开源，喜欢分享技术心得。
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-[#00d4ff] hover:text-[#1a1a2e] transition-all duration-300">
                    <Github size={20} />
                  </a>
                  <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-[#00d4ff] hover:text-[#1a1a2e] transition-all duration-300">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-[#00d4ff] hover:text-[#1a1a2e] transition-all duration-300">
                    <Mail size={20} />
                  </a>
                </div>
              </GlassCard>

              {/* Location */}
              <GlassCard className="p-6 mt-6">
                <div className="flex items-center text-white/70">
                  <MapPin size={20} className="mr-3 text-[#00d4ff]" />
                  <span>北京，中国</span>
                </div>
              </GlassCard>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Skills */}
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                  技能专长
                </h3>
                <div className="space-y-4">
                  {skills.map(skill => <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-[#00d4ff]">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ff6b9d] rounded-full transition-all duration-1000" style={{
                      width: `${skill.level}%`
                    }} />
                      </div>
                    </div>)}
                </div>
              </GlassCard>

              {/* Achievements */}
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                  成就与荣誉
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => <div key={index} className="text-center">
                      <div className="p-4 rounded-xl inline-block mb-4" style={{
                    backgroundColor: 'rgba(0, 212, 255, 0.1)'
                  }}>
                        <achievement.icon size={32} className="text-[#00d4ff]" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>)}
                </div>
              </GlassCard>

              {/* Bio */}
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6" style={{
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                  个人简介
                </h3>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    我是一名热爱技术的全栈开发工程师，拥有 5 年的软件开发经验。我专注于前端技术，同时也对后端架构和 DevOps 有深入的研究。
                  </p>
                  <p>
                    我相信技术的力量可以改变世界，因此我积极参与开源社区，在 GitHub 上贡献了多个项目。同时，我也热衷于分享技术心得，在各大技术平台发表了 50+ 篇原创文章。
                  </p>
                  <p>
                    在工作之余，我喜欢阅读技术书籍、参加技术会议、探索新的技术趋势。我相信持续学习是保持竞争力的关键，因此我坚持每天学习新技术，已连续打卡 365 天。
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>;
}