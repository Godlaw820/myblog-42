// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
// @ts-ignore;
import { Button, useToast, Input } from '@/components/ui';

import { ArticleEditor } from '@/components/ArticleEditor';
import { GlassCard } from '@/components/GlassCard';
export default function AdminPage({
  $w
}) {
  const {
    toast
  } = useToast();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingArticle, setEditingArticle] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // 加载文章列表
  const loadArticles = async () => {
    setLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'article',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {}
          },
          orderBy: [{
            date: 'desc'
          }],
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          pageNumber: 1
        }
      });
      setArticles(result.records || []);
    } catch (error) {
      toast({
        title: '加载失败',
        description: error.message || '无法加载文章列表',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadArticles();
  }, []);

  // 检查是否有编辑参数
  useEffect(() => {
    const editId = $w.page.dataset.params.editId;
    if (editId && articles.length > 0) {
      const articleToEdit = articles.find(a => a._id === editId);
      if (articleToEdit) {
        setEditingArticle(articleToEdit);
        setShowEditor(true);
      }
    }
  }, [$w.page.dataset.params.editId, articles]);

  // 创建文章
  const handleCreate = async data => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'article',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            ...data,
            views: 0
          }
        }
      });
      setShowEditor(false);
      loadArticles();
    } catch (error) {
      throw error;
    }
  };

  // 更新文章
  const handleUpdate = async data => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'article',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            title: data.title,
            content: data.content,
            excerpt: data.excerpt,
            category: data.category,
            date: data.date,
            readTime: data.readTime,
            image: data.image
          },
          filter: {
            where: {
              $and: [{
                _id: {
                  $eq: editingArticle._id
                }
              }]
            }
          }
        }
      });
      setShowEditor(false);
      setEditingArticle(null);
      loadArticles();
    } catch (error) {
      throw error;
    }
  };

  // 删除文章
  const handleDelete = async articleId => {
    if (!confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
      return;
    }
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'article',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              $and: [{
                _id: {
                  $eq: articleId
                }
              }]
            }
          }
        }
      });
      toast({
        title: '删除成功',
        description: '文章已删除'
      });
      loadArticles();
    } catch (error) {
      toast({
        title: '删除失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    }
  };

  // 打开编辑器
  const openEditor = article => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  // 关闭编辑器
  const closeEditor = () => {
    setShowEditor(false);
    setEditingArticle(null);
  };

  // 筛选文章
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 获取所有分类
  const categories = ['all', ...new Set(articles.map(a => a.category))];
  if (showEditor) {
    return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] p-6">
        <div className="max-w-4xl mx-auto">
          <ArticleEditor article={editingArticle} onSave={editingArticle ? handleUpdate : handleCreate} onCancel={closeEditor} />
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] p-6">
      {/* 动态光晕 */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">文章管理</h1>
          <p className="text-white/60">管理您的博客文章</p>
        </div>

        {/* 操作栏 */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input placeholder="搜索文章..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40" />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white appearance-none cursor-pointer">
                {categories.map(cat => <option key={cat} value={cat} className="bg-[#1a1a2e]">
                    {cat === 'all' ? '全部分类' : cat}
                  </option>)}
              </select>
            </div>
          </div>
          <Button onClick={() => openEditor()} className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            新建文章
          </Button>
        </div>

        {/* 文章列表 */}
        {loading ? <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent" />
            <p className="text-white/60 mt-4">加载中...</p>
          </div> : filteredArticles.length === 0 ? <GlassCard className="text-center py-12">
            <p className="text-white/60">暂无文章</p>
          </GlassCard> : <div className="grid gap-4">
            {filteredArticles.map(article => <GlassCard key={article._id} className="p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex gap-4">
                  <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2 truncate">
                          {article.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2 mb-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">
                            {article.category}
                          </span>
                          <span>{article.date}</span>
                          <span>{article.readTime}</span>
                          <span>{article.views} 次浏览</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => openEditor(article)} className="text-white hover:bg-white/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(article._id)} className="text-red-400 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>)}
          </div>}
      </div>
    </div>;
}