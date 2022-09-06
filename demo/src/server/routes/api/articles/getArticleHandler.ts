import type { ArticleGetPayload, ArticleGetSuccessPayload } from '../../../../models';
import { getArticleById, getArticlePublicFromArticle } from '../../../data';
import { sendError, sendSuccess } from '../../../utils';
import type { RequestHandler } from '../../../utils';

export const getArticleHandler: RequestHandler<ArticleGetPayload, ArticleGetSuccessPayload, {}, {}> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(res, 'Article not found', 404);
    }

    const article = getArticleById(id);

    if (!article) {
      return sendError(res, 'Article not found', 404);
    }

    sendSuccess(res, getArticlePublicFromArticle(article));
  } catch (err) {
    sendError(res, err);
  }
};
