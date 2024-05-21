import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MultiActionAreaCard({ post }) {
  const [pic, setPic] = useState("https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?size=626&ext=jpg&ga=GA1.1.1369675164.1715299200&semt=sph");

  useEffect( ()=>{
    if(post.category === "Music"){
      setPic("https://wallpapers.com/images/high/classical-violin-music-c6oeai676mv682ha.webp");
    }
    if(post.category === "Sports"){
      setPic("https://wallpapers.com/images/featured/best-sports-background-9mo6eiyv8hxj5jln.jpg");
    }
    if(post.category === "Movies"){
      setPic("https://c4.wallpaperflare.com/wallpaper/862/449/162/jack-reacher-star-wars-interstellar-movie-john-wick-wallpaper-preview.jpg");
    }
    if(post.category === "Technology"){
      setPic("https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg");
    }
    if(post.category === "Fashion"){
      setPic("https://img.freepik.com/free-vector/hand-drawn-fashion-shop-pattern-background_23-2150849915.jpg");
    }
    if(post.category === "General"){
      setPic("https://wallpapers.com/images/hd/dark-workspace-blogging-backdrop-acqoss4ry3i7ijyl.jpg");
    }
  },[post.category]);


  return (
    <Card style={{height: "100%", width: "18rem"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="500"
          image={pic}
          alt={`${post.title} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {post.title.length > 40 ? post.title.substring(0, 35)+"..." : post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description.length > 100 ? post.description.substring(0, 50)+"..." : post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {post.name}
        </Button>
      </CardActions>
    </Card>
  );
}
