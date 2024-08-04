"use client"
import React, { useState } from 'react';
import Image from "next/image"
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import TopNav from "@/components/TopNav";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

const colors = {
  'soft-primary': '#84D187',
  'primary': '#00B207',
  'hard-primary': '#2C742F',
};

// Mock data
const userDetails = {
  image: '/SovTooHappy.png',
  name: 'Sovan Pattanaik',
  company: 'Mission Shakti Millets Products',
  location: 'Odisha, India',
  email: 'sunitapatnaik@example.com',
  phone: '+91 98765 43210',
  website: 'www.missionshaktimillets.com',
  bio: 'I am a dedicated member of a women Self Help Group (SHG) in Odisha, India, under the Mission Shakti government initiative. My passion lies in producing nutritious millets products to promote health and empower local communities.',
};

const mockThreads = [
  {
    id: 1,
    title: 'Mission Shakti Products Exchange',
    messages: [
      {
        id: 1,
        user: {
          image: '/smilan.jpeg',
          name: 'Rashmi Das',
        },
        message: 'I have fresh millet products available for sale!',
        timestamp: '2024-04-08 10:30 AM',
      },
      {
        id: 2,
        user: {
          image: '/PraDom.jpeg',
          name: 'Anita Mohapatra',
        },
        message: 'Im interested! What type of millet products do you have?',
        timestamp: '2024-04-08 11:15 AM',
      },
    ],
  },
  {
    id: 2,
    title: 'Sugar and Biscuits Trading Hub',
    messages: [
      {
        id: 1,
        user: {
          image: '/SovHappy.jpeg',
          name: 'Sarojini Meher',
        },
        message: 'Looking to buy locally produced sugar. Any recommendations?',
        timestamp: '2024-04-07 03:45 PM',
      },
      {
        id: 2,
        user: {
          image: '/SovHappy.jpeg',
          name: 'Pratima Swain',
        },
        message: 'I have high-quality sugar available. How much do you need?',
        timestamp: '2024-04-07 04:30 PM',
      },
    ],
  },
  {
    id: 3,
    title: 'Cereals and Grains Marketplace',
    messages: [
      {
        id: 1,
        user: {
          image: '/SovHappy.jpeg',
          name: 'Rina Nayak',
        },
        message: 'Im selling organic cereals and grains. Whos interested?',
        timestamp: '2024-04-06 09:00 AM',
      },
      {
        id: 2,
        user: {
          image: '/SovHappy.jpeg',
          name: 'Indrani Pradhan',
        },
        message: 'Im interested! Could you provide more details?',
        timestamp: '2024-04-06 09:05 AM',
      },
    ],
  },
  {
    id: 4,
    title: 'Community Market: April Edition',
    messages: [
      {
        id: 1,
        user: {
          image: '/SovHappy.jpeg',
          name: 'Anjali Behera',
        },
        message: 'Greetings, fellow SHG members! What products are available for sale this month?',
        timestamp: '2024-04-05 02:15 PM',
      },
      {
        id: 2,
        user: {
          image: '/SovHappy.jpeg',
          name: 'Malati Sahu',
        },
        message: 'We have a variety of homemade biscuits and snacks!',
        timestamp: '2024-04-05 02:20 PM',
      },
    ],
  },
];

const mockDMs = [
  {
    id: 1,
    user: {
      image: '/PraDom.jpeg',
      name: 'ପ୍ରଥମ ମହାନ୍ତି',
    },
    messages: [
      {
        id: 1,
        message: 'ନମସ୍କାର, ମୋରି ପ୍ରସ୍ତୁତି ବିଷୟରେ ଏକ ପ୍ରଶ୍ନା ଆଛି।',
        timestamp: '2023-04-08 09:00 AM',
      },
      {
        id: 2,
        message: 'ବିଶେଷାଙ୍କ ହେଲେ କିପରି ମଧ୍ୟ ମୋଦ୍ଧୁର କମ୍ପ୍ୟାଟିବଲ ଅଛି?',
        timestamp: '2023-04-08 09:05 AM',
      },
      {
        id: 3,
        message: 'ଆମେ ଆମର ଯନ୍ତ୍ରର ସଂଗତରେ ଉତ୍ତମ ବା ସାହଯ୍ୟ କରିବା ଇଚ୍ଛା କରୁଛି।',
        timestamp: '2023-04-08 09:10 AM',
      },
    ],
  },
  {
    id: 2,
    user: {
      image: '/smilan.jpeg',
      name: 'ମିଲନ କୁମାର ସାହୁ',
    },
    messages: [
      {
        id: 1,
        message: 'ହେ, ମୁଁ ମୋର ପୂର୍ବ ଆର୍ଡରର ପ୍ରତି ଅନୁସରଣ କରିବା ଇଚ୍ଛା କରୁଛି।',
        timestamp: '2023-04-07 02:15 PM',
      },
      {
        id: 2,
        message: 'ନିଶ୍ଚୟ, ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବା ପାଇଁ ମୋର ପାଇଁ ସର୍ଚ କରନ୍ତୁ।',
        timestamp: '2023-04-07 02:20 PM',
      },
      {
        id: 3,
        message: 'ଭଲ, ଆପଣଙ୍କୁ ଏହି ସହାୟତା ପାଇଁ ଧନ୍ୟବାଦ!',
        timestamp: '2023-04-07 02:25 PM',
      },
    ],
  },
];



const ForumPage = () => {
  const [newThreadMessage, setNewThreadMessage] = useState('');
  const [newDMMessage, setNewDMMessage] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedDM, setSelectedDM] = useState(null);
  const [expandedThreadId, setExpandedThreadId] = useState(null);
  const [expandedDMId, setExpandedDMId] = useState(null);

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
    setSelectedDM(null);
    setExpandedThreadId(thread.id);
    setExpandedDMId(null);
  };

  const handleDMClick = (dm) => {
    setSelectedDM(dm);
    setSelectedThread(null);
    setExpandedDMId(dm.id);
    setExpandedThreadId(null);
  };

  const handleThreadMessageChange = (event) => {
    setNewThreadMessage(event.target.value);
  };

  const handleDMMessageChange = (event) => {
    setNewDMMessage(event.target.value);
  };

  const handleThreadMessageSend = () => {
    // Add new message to the selected thread
    if (selectedThread) {
      // Update the selectedThread.messages array with the new message
      setSelectedThread((prevThread) => ({
        ...prevThread,
        messages: [
          ...prevThread.messages,
          {
            id: prevThread.messages.length + 1,
            user: {
              image: userDetails.image,
              name: userDetails.name,
            },
            message: newThreadMessage,
            timestamp: new Date().toLocaleString(),
          },
        ],
      }));
      setNewThreadMessage('');
    }
  };

  const handleDMMessageSend = () => {
    // Add new message to the selected DM
    if (selectedDM) {
      // Update the selectedDM.messages array with the new message
      setSelectedDM((prevDM) => ({
        ...prevDM,
        messages: [
          ...prevDM.messages,
          {
            id: prevDM.messages.length + 1,
            message: newDMMessage,
            timestamp: new Date().toLocaleString(),
          },
        ],
      }));
      setNewDMMessage('');
    }
  };

  return (
    <>
      <TopNav />
      <NavigationBar />
      <div className="container mx-auto my-8 h-full flex">
        <Grid container spacing={4} className="h-full">
          <Grid item xs={12} md={3} className="flex flex-col justify-between">
            <Paper className="p-4 bg-[#f0f0f0] h-full">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Image src={userDetails.image} width={300} height={200} className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
                <Typography variant="h6" gutterBottom>
                  {userDetails.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {userDetails.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {userDetails.location}
                </Typography>
                <Divider className="my-4" />
                <Typography variant="body1" gutterBottom>
                  {userDetails.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userDetails.phone}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userDetails.website}
                </Typography>
                <Divider className="my-4" />
                <Typography variant="body2" color="textSecondary">
                  {userDetails.bio}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className="flex flex-col justify-between">
            <Paper className="p-4 bg-[#f6f6f6] h-full">
              <Typography variant="h5" gutterBottom>
                Threads
              </Typography>
              <List>
                {mockThreads.map((thread) => (
                  <ListItem
                    key={thread.id}
                    button
                    onClick={() => handleThreadClick(thread)}
                    className={`hover:bg-gray-100 my-2 rounded-md ${expandedThreadId === thread.id ? 'bg-[#e8f4e9]' : ''
                      }`}
                    style={{ cursor: 'pointer', border: '1px solid #696969' }}
                  >
                    <ListItemText primary={thread.title} />
                  </ListItem>
                ))}
              </List>
              {selectedThread && expandedThreadId === selectedThread.id && (
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    {selectedThread.title}
                  </Typography>
                  <List>
                    {selectedThread.messages.map((message) => (
                      <ListItem key={message.id}>
                        <ListItemAvatar>
                          <Avatar src={message.user.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={message.message}
                          secondary={`${message.user.name} - ${message.timestamp}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box display="flex" alignItems="center">
                    <TextField
                      value={newThreadMessage}
                      onChange={handleThreadMessageChange}
                      label="Enter your message"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Send />}
                      onClick={handleThreadMessageSend}
                      className="ml-4"
                      style={{
                        backgroundColor: colors['primary'],
                        color: 'white',
                        '&:hover': {
                          backgroundColor: colors['hard-primary'],
                        },
                      }}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={3} className="flex flex-col justify-between">
            <Paper className="p-4 bg-[#f6f6f6] h-full">
              <Typography variant="h5" gutterBottom>
                Direct Messages
              </Typography>
              <List>
                {mockDMs.map((dm) => (
                  <ListItem
                    key={dm.id}
                    button
                    onClick={() => handleDMClick(dm)}
                    className={`hover:bg-gray-100 ${expandedDMId === dm.id ? 'bg-[#e8f4e9]' : ''
                      }`}
                  >
                    <ListItemAvatar>
                      <Image src={dm.user.image} width={100} height={100} className="bg-gray-300 rounded-full mb-4" />
                    </ListItemAvatar>
                    <ListItemText primary={dm.user.name} />
                  </ListItem>
                ))}
              </List>
              {selectedDM && expandedDMId === selectedDM.id && (
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Direct Message with {selectedDM.user.name}
                  </Typography>
                  <List>
                    {selectedDM.messages.map((message) => (
                      <ListItem key={message.id}>
                        <ListItemAvatar>
                          <Image src={selectedDM.user.image} width={50} height={50} className="bg-gray-300 rounded-full mb-4" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={message.message}
                          secondary={message.timestamp}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box display="flex" alignItems="center">
                    <TextField
                      value={newDMMessage}
                      onChange={handleDMMessageChange}
                      label="Enter your message"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Send />}
                      onClick={handleDMMessageSend}
                      className="ml-4"
                      style={{
                        backgroundColor: colors['primary'],
                        color: 'white',
                        '&:hover': {
                          backgroundColor: colors['hard-primary'],
                        },
                      }}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default ForumPage;
