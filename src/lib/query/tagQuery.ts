import { queryOptions } from '@tanstack/react-query';
import { getTagList } from '@lib/api/post.ts';

const getList = queryOptions({
  queryKey: ['tag', 'list'],
  queryFn: getTagList,
});
const tagQuery = {
  list: getList,
};

export default tagQuery;
