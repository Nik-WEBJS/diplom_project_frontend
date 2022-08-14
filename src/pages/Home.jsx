import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
// import axios from '../axios' 
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispath = useDispatch();
  const {posts, tags} = useSelector(state=>state.posts)
  const userData = useSelector(state=>state.auth.data)
  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  React.useEffect(()=>{
    dispath(fetchPosts());
    dispath(fetchTags());
  }, [])

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => (
            isPostsLoading ? (<Post key={index} isLoading={true} />) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl? `http://localhost:4444${obj.imageUrl}`: ''}
              user={obj.user}
              createdAt={obj.updatedAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable
            />)
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Разработчик',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'В разработке',
              },
              {
                user: {
                  fullName: 'Контент менеджер',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'В разработке',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
