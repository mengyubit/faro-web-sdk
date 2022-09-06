import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

import { useGetArticlesQuery } from '../../api';
import { LoadingScreen } from '../../components/LoadingScreen';
import { Page } from '../../components/Page';
import { formatDate } from '../../utils';

export function Articles() {
  const [page, setPage] = useState(0);
  const getArticlesResult = useGetArticlesQuery({ page: page.toString() });

  return (
    <Page title="Articles">
      {getArticlesResult.isLoading ? (
        <LoadingScreen />
      ) : (
        getArticlesResult.data?.items.map((article) => (
          <Container key={article.id} as="article" className="pb-4 mb-4 border-bottom">
            <h3>{article.name}</h3>
            <p className="mb-3">
              {article.user.name} | {formatDate(article.date)}
            </p>
            <div>{article.text}</div>
          </Container>
        ))
      )}

      <Pagination>
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
        <Pagination.Item active={true}>{page + 1}</Pagination.Item>
        <Pagination.Next
          onClick={() => setPage(page + 1)}
          disabled={page >= Math.ceil((getArticlesResult.data?.totalSize ?? 0) / 10)}
        />
      </Pagination>
    </Page>
  );
}
