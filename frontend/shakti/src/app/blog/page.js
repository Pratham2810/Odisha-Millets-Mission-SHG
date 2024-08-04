"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button, Divider, Grid, Typography, TextField, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import TopNav from '@/components/TopNav';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.grey[100],
}));

const BlogCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const BlogDetails = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    if (userToken || adminToken) {
      setIsAdmin(adminToken ? true : false);
      setAdminToken(adminToken);
    }
  }, []);

  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
  });
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://mission-shakti-419920.el.r.appspot.com/api/blog/getAllBlog');
      setBlogs(response.data.data.blog);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchBlogDetails = async (blogId) => {
    try {
      const response = await axios.get(`https://mission-shakti-419920.el.r.appspot.com/api/blog/getBlog/${blogId}`);
      setSelectedBlog(response.data.data.blog);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  const handleCreateBlog = async () => {
    try {
      const response = await axios.post(
        'https://mission-shakti-419920.el.r.appspot.com/api/blog/createBlog',
        newBlog,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      if (response.data.status === 'success') {
        setNewBlog({
          title: '',
          description: '',
          category: '',
          author: '',
        });
        fetchBlogs();
        toast.success('Blog created successfully');
      }
    } catch (error) {
      toast.error('Failed to create blog, try later!');
    }
  };

  const handleBlogClick = (blogId) => {
    if (selectedBlog?.id === blogId) {
      setSelectedBlog(null);
    } else {
      fetchBlogDetails(blogId);
    }
  };

  return (
    <>
      <TopNav />
      <NavigationBar />
      <Container container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom style={{ color: '#2e7d32', fontWeight: 'bold' }}>
            Blogs
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} onClick={() => handleBlogClick(blog.id)} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                      {blog.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                      Category: {blog.category}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleBlogClick(blog.id)}>
                  {selectedBlog?.id === blog.id ? <ExpandLessIcon style={{ color: '#2e7d32' }} /> : <ExpandMoreIcon style={{ color: '#2e7d32' }} />}
                </IconButton>
              </CardActions>
            </BlogCard>
          ))}
        </Grid>

        {selectedBlog && (
          <Grid item xs={12}>
            <BlogDetails>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                      {selectedBlog.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                      {selectedBlog.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                      Category: {selectedBlog.category}
                    </Typography>
                    <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                      Author: {selectedBlog.author}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </BlogDetails>
          </Grid>
        )}

        <Grid item xs={12} container justifyContent="flex-end">
          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              style={{ backgroundColor: '#2e7d32', color: '#fff', fontWeight: 'bold', marginBottom: 12, marginTop: 12 }}
              onClick={() => setSelectedBlog(null)}
            >
              Create New Blogs
            </Button>
          )}
        </Grid>

        {isAdmin && selectedBlog === null && (
          <Grid item xs={12}>
            <BlogDetails>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                      Create Blog
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Title"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      fullWidth
                      style={{ marginBottom: 16 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      value={newBlog.description}
                      onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
                      fullWidth
                      style={{ marginBottom: 16 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Category"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                      fullWidth
                      style={{ marginBottom: 16 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Author"
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                      fullWidth
                      style={{ marginBottom: 16 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateBlog}
                      style={{ backgroundColor: '#2e7d32', color: '#fff', fontWeight: 'bold' }}
                    >
                      Create Blog
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </BlogDetails>
          </Grid>
        )}
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default BlogPage;