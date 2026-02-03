const cloudbase = require('@cloudbase/node-sdk');

// 初始化 CloudBase
const app = cloudbase.init({
  env: process.env.TCB_ENV || process.env.SCF_ENV
});

const models = app.models;

/**
 * 主函数入口
 * @param {Object} event - 事件参数
 * @param {string} event.action - 操作类型: queryAll, queryById, create, update, delete
 * @param {string} [event.id] - 文章ID（queryById, update, delete 时必需）
 * @param {Object} [event.data] - 文章数据（create, update 时必需）
 * @param {number} [event.limit] - 每页数量（queryAll 时可选）
 * @param {number} [event.offset] - 偏移量（queryAll 时可选）
 * @param {Object} context - 上下文对象
 * @returns {Promise<Object>} 操作结果
 */
exports.main = async (event, context) => {
  try {
    const { action, id, data, limit = 10, offset = 0 } = event;

    // 验证 action 参数
    if (!action) {
      return {
        success: false,
        error: {
          code: 'MISSING_ACTION',
          message: '缺少 action 参数'
        }
      };
    }

    // 根据不同的 action 执行相应的操作
    switch (action) {
      case 'queryAll':
        return await queryAllArticles(limit, offset);

      case 'queryById':
        if (!id) {
          return {
            success: false,
            error: {
              code: 'MISSING_ID',
              message: 'queryById 操作需要提供 id 参数'
            }
          };
        }
        return await queryArticleById(id);

      case 'create':
        if (!data) {
          return {
            success: false,
            error: {
              code: 'MISSING_DATA',
              message: 'create 操作需要提供 data 参数'
            }
          };
        }
        return await createArticle(data);

      case 'update':
        if (!id) {
          return {
            success: false,
            error: {
              code: 'MISSING_ID',
              message: 'update 操作需要提供 id 参数'
            }
          };
        }
        if (!data) {
          return {
            success: false,
            error: {
              code: 'MISSING_DATA',
              message: 'update 操作需要提供 data 参数'
            }
          };
        }
        return await updateArticle(id, data);

      case 'delete':
        if (!id) {
          return {
            success: false,
            error: {
              code: 'MISSING_ID',
              message: 'delete 操作需要提供 id 参数'
            }
          };
        }
        return await deleteArticle(id);

      default:
        return {
          success: false,
          error: {
            code: 'INVALID_ACTION',
            message: `无效的 action 参数: ${action}，支持的值为: queryAll, queryById, create, update, delete`
          }
        };
    }
  } catch (error) {
    console.error('云函数执行错误:', error);
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message || '服务器内部错误'
      }
    };
  }
};

/**
 * 查询所有文章（支持分页）
 * @param {number} limit - 每页数量
 * @param {number} offset - 偏移量
 * @returns {Promise<Object>} 文章列表
 */
async function queryAllArticles(limit, offset) {
  try {
    const result = await models.article.list({
      filter: {
        where: {}
      },
      select: {
        $master: true // 返回所有字段
      },
      pageSize: limit,
      pageNumber: Math.floor(offset / limit) + 1
    });

    return {
      success: true,
      data: {
        records: result.data.records || [],
        total: result.data.total || 0,
        limit,
        offset
      }
    };
  } catch (error) {
    console.error('查询文章列表失败:', error);
    throw new Error(`查询文章列表失败: ${error.message}`);
  }
}

/**
 * 根据ID查询单篇文章
 * @param {string} id - 文章ID
 * @returns {Promise<Object>} 文章对象
 */
async function queryArticleById(id) {
  try {
    const result = await models.article.get({
      filter: {
        where: {
          _id: { $eq: id }
        }
      },
      select: {
        $master: true // 返回所有字段
      }
    });

    if (!result.data.records || result.data.records.length === 0) {
      return {
        success: false,
        error: {
          code: 'ARTICLE_NOT_FOUND',
          message: `未找到 ID 为 ${id} 的文章`
        }
      };
    }

    return {
      success: true,
      data: result.data.records[0]
    };
  } catch (error) {
    console.error('查询文章失败:', error);
    throw new Error(`查询文章失败: ${error.message}`);
  }
}

/**
 * 创建新文章
 * @param {Object} data - 文章数据
 * @returns {Promise<Object>} 创建成功的文章对象
 */
async function createArticle(data) {
  try {
    // 验证必填字段
    if (!data.title) {
      return {
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELD',
          message: '缺少必填字段: title'
        }
      };
    }

    if (!data.content) {
      return {
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELD',
          message: '缺少必填字段: content'
        }
      };
    }

    // 设置默认值
    const articleData = {
      ...data,
      views: data.views || 0,
      date: data.date || new Date().toISOString()
    };

    const result = await models.article.create({
      data: articleData
    });

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('创建文章失败:', error);
    throw new Error(`创建文章失败: ${error.message}`);
  }
}

/**
 * 更新文章
 * @param {string} id - 文章ID
 * @param {Object} data - 更新的数据
 * @returns {Promise<Object>} 更新成功的文章对象
 */
async function updateArticle(id, data) {
  try {
    // 先检查文章是否存在
    const checkResult = await models.article.get({
      filter: {
        where: {
          _id: { $eq: id }
        }
      },
      select: {
        _id: true
      }
    });

    if (!checkResult.data.records || checkResult.data.records.length === 0) {
      return {
        success: false,
        error: {
          code: 'ARTICLE_NOT_FOUND',
          message: `未找到 ID 为 ${id} 的文章，无法更新`
        }
      };
    }

    // 执行更新
    const result = await models.article.update({
      data: data,
      filter: {
        where: {
          _id: { $eq: id }
        }
      }
    });

    return {
      success: true,
      data: {
        id,
        ...data
      }
    };
  } catch (error) {
    console.error('更新文章失败:', error);
    throw new Error(`更新文章失败: ${error.message}`);
  }
}

/**
 * 删除文章
 * @param {string} id - 文章ID
 * @returns {Promise<Object>} 删除成功的确认信息
 */
async function deleteArticle(id) {
  try {
    // 先检查文章是否存在
    const checkResult = await models.article.get({
      filter: {
        where: {
          _id: { $eq: id }
        }
      },
      select: {
        _id: true
      }
    });

    if (!checkResult.data.records || checkResult.data.records.length === 0) {
      return {
        success: false,
        error: {
          code: 'ARTICLE_NOT_FOUND',
          message: `未找到 ID 为 ${id} 的文章，无法删除`
        }
      };
    }

    // 执行删除
    await models.article.delete({
      filter: {
        where: {
          _id: { $eq: id }
        }
      }
    });

    return {
      success: true,
      data: {
        message: '文章删除成功',
        id
      }
    };
  } catch (error) {
    console.error('删除文章失败:', error);
    throw new Error(`删除文章失败: ${error.message}`);
  }
}