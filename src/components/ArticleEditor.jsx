// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Save, X, Image as ImageIcon } from 'lucide-react';

import { useForm } from 'react-hook-form';
export function ArticleEditor({
  article,
  onSave,
  onCancel
}) {
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: article || {
      title: '',
      content: '',
      excerpt: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 分钟',
      image: ''
    }
  });
  const onSubmit = async data => {
    setLoading(true);
    try {
      await onSave(data);
      toast({
        title: '保存成功',
        description: article ? '文章已更新' : '文章已创建'
      });
    } catch (error) {
      toast({
        title: '保存失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {article ? '编辑文章' : '新建文章'}
        </h2>
        <Button variant="ghost" size="icon" onClick={onCancel} className="text-white hover:bg-white/10">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="title" rules={{
          required: '请输入文章标题'
        }} render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">标题</FormLabel>
                <FormControl>
                  <Input placeholder="请输入文章标题" className="bg-white/5 border-white/20 text-white placeholder:text-white/50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="excerpt" rules={{
          required: '请输入文章摘要'
        }} render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">摘要</FormLabel>
                <FormControl>
                  <Textarea placeholder="请输入文章摘要" rows={3} className="bg-white/5 border-white/20 text-white placeholder:text-white/50" {...field} />
                </FormControl>
                <FormDescription className="text-white/60">
                  摘要将显示在文章列表中
                </FormDescription>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="category" rules={{
          required: '请选择文章分类'
        }} render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">分类</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a1a2e] border-white/20">
                    <SelectItem value="技术">技术</SelectItem>
                    <SelectItem value="生活">生活</SelectItem>
                    <SelectItem value="设计">设计</SelectItem>
                    <SelectItem value="随笔">随笔</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="content" rules={{
          required: '请输入文章内容'
        }} render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">内容</FormLabel>
                <FormControl>
                  <Textarea placeholder="请输入文章内容" rows={12} className="bg-white/5 border-white/20 text-white placeholder:text-white/50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="image" rules={{
          required: '请输入封面图URL'
        }} render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">封面图</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="请输入图片URL" className="bg-white/5 border-white/20 text-white placeholder:text-white/50" {...field} />
                    <Button type="button" variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription className="text-white/60">
                  建议使用 Unsplash 或 Pexels 的图片链接
                </FormDescription>
                <FormMessage />
              </FormItem>} />

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="date" rules={{
            required: '请选择发布日期'
          }} render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-white">发布日期</FormLabel>
                  <FormControl>
                    <Input type="date" className="bg-white/5 border-white/20 text-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="readTime" rules={{
            required: '请输入阅读时间'
          }} render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-white">阅读时间</FormLabel>
                  <FormControl>
                    <Input placeholder="如：5 分钟" className="bg-white/5 border-white/20 text-white placeholder:text-white/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white">
              <Save className="h-4 w-4 mr-2" />
              {loading ? '保存中...' : '保存'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="border-white/20 text-white hover:bg-white/10">
              取消
            </Button>
          </div>
        </form>
      </Form>
    </div>;
}