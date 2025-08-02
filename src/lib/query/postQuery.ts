import { queryOptions } from '@tanstack/react-query';
import { getPostList } from '@lib/api/post.ts';

const getList = (tagList: number[]) => {
  return queryOptions({
    queryKey: ['post', 'list', tagList],
    queryFn: () => getPostList(tagList),
  });
};
const postQuery = {
  list: getList,
};

export default postQuery;
