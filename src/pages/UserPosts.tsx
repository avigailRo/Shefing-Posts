// UserPosts.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, Button, Snackbar, AlertProps, Alert, Autocomplete, FormHelperText, Grid } from '@mui/material';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { log } from 'console';
import { addPost, getPosts } from '../apiCalls/userCalls';
import IPost from '../model/IPost';
import IUser from '../model/IUser';
import IUserState from '../model/IUserState';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Text } from "../components/globalModal/GlobalModal.styles";
import { Content_Div, Create_Button, Post_Div, Post_Title, SnackBar } from './UserPosts.styles';

const validationSchema = yup.object({
  title: yup.string().required('Title is required').min(4, 'Title must be at least 4 characters'),
  body: yup.string().required('Body is required').min(4, 'Body must be at least 4 characters'),

});
const UserPosts = (props: any) => {
  const [posts, setPosts] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const user: IUser = useSelector<RootState, IUserState>((state: any) => state.userReducer).user;

  useEffect(() => {
    if (user) {
      getPosts(user.id).then(res => {
        setPosts(res.data)
      }).catch(err => {
        setSnackbar({ children: "something went wrong a error occurred" + err.response.data, severity: 'error' });
      })
    }
  }, [user]);
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validationSchema,
    onSubmit: (values: { title: string, body: string }) => {
      async function handleCreatePost() {
        const newPost: IPost = { userId: user.id, title: values.title, body: values.body };
        addPost(newPost).then(res => {
          setPosts([...posts, res.data])
          setSnackbar({ children: ' successfully add', severity: 'success' });
          setOpenDialog(false);
          values.title = '';
          values.body = '';
        }).catch(err => {
          setSnackbar({ children: "something went wrong a error occurred" + err.response.data, severity: 'error' });
        })

      }
      handleCreatePost();
    }
  });
  const handleCreatePost = () => {
    const newPost: IPost = { userId: user.id, title: newPostTitle, body: newPostBody };
    addPost(newPost).then(res => {
      setPosts([...posts, res.data])
      setSnackbar({ children: ' successfully add', severity: 'success' });
      setOpenDialog(false);
    }).catch(err => {
      setSnackbar({ children: "something went wrong a error occurred" + err.response.data, severity: 'error' });
    })


  };

  return (
    user && posts &&
    <div>
      <Post_Title>user posts</Post_Title><br></br>
      <Create_Button variant="contained" onClick={() => setOpenDialog(true)}>
        Create Post
      </Create_Button>
      <Post_Div>
        {posts.map((post: any) => (
          <Content_Div key={post.id}>
            <h3>{post.title}</h3>
            <br></br>
            <p>{post.body}</p>
          </Content_Div>
        ))}
      </Post_Div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <FormHelperText>Title</FormHelperText>
            <Text><TextField id="title" name="title" fullWidth margin='normal'
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            /></Text>

            <Text>
              <Grid item container xs={12} sm={12}>
                <Grid item xs={12} sm={8} sx={{ pr: 2 }}>
                  <FormHelperText>Content</FormHelperText>
                  <TextField id="body" name="body" fullWidth margin='normal'
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                  />
                </Grid>

              </Grid>
            </Text>
            <Button type="submit" variant="contained" >

              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {!!snackbar && (
        <SnackBar 
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </SnackBar>)}
    </div>
  );
};

export default UserPosts;