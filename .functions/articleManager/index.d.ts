// 云函数事件接口
interface CloudFunctionEvent {
  action: 'queryAll' | 'queryById' | 'create' | 'update' | 'delete';
  id?: string;
  data?: ArticleData;
  limit?: number;
  offset?: number;
}

// 文章数据接口
interface ArticleData {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  date?: string | Date;
  readTime?: string;
  views?: number;
  image?: string;
}

// 成功响应接口
interface SuccessResponse<T> {
  success: true;
  data: T;
}

// 错误响应接口
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// 主函数声明
export declare function main(event: CloudFunctionEvent, context: any): Promise<SuccessResponse<any> | ErrorResponse>;