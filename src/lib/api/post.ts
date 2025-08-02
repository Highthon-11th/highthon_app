import { defaultClient } from '@lib/client';
import { Post, Tag } from '@lib/types/Post.ts';

export const getPostList = async (tagList: number[]) => {
  console.log('tagList', tagList);
  const { data } = await defaultClient.get<Post[]>('/post', {
    params: {
      tag: tagList,
    },
  });

  console.log(data);
  return data;
};

export const getTagList = async () => {
  const { data } = await defaultClient.get<Tag[]>('/tag');

  return data;
};
