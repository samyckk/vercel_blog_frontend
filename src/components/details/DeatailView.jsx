import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {Box, Typography, styled} from "@mui/material";
import { Edit, Delete} from "@mui/icons-material";
import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
      margin: 0
  },
}));

const Image = styled("img")({
    maxwidth: "100%",
    width: "100%",
    height: "50vh",
   
})

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Author = styled(Box)`
    color: #878787;
    display: flex;
    margin: 20px 0;
`;

const Description = styled(Box)`
    word-break: break-word;
    box-shadow: 1px 1px 2px 2px;
    padding: 20px 10px;
`


const DetailView = () => {
  const [Post, setPost] = useState({});
  const username = sessionStorage.getItem('username');
  const params = useParams();
  const id = params.id;

  const [pic, setPic] = useState("https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?size=626&ext=jpg&ga=GA1.1.1369675164.1715299200&semt=sph");

  useEffect( ()=>{
    if(Post.category === "Music"){
      setPic("https://wallpapers.com/images/high/classical-violin-music-c6oeai676mv682ha.webp");
    }
    if(Post.category === "Sports"){
      setPic("https://wallpapers.com/images/featured/best-sports-background-9mo6eiyv8hxj5jln.jpg");
    }
    if(Post.category === "Movies"){
      setPic("https://c4.wallpaperflare.com/wallpaper/862/449/162/jack-reacher-star-wars-interstellar-movie-john-wick-wallpaper-preview.jpg");
    }
    if(Post.category === "Technology"){
      setPic("https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg");
    }
    if(Post.category === "Fashion"){
      setPic("https://img.freepik.com/free-vector/hand-drawn-fashion-shop-pattern-background_23-2150849915.jpg");
    }
    if(Post.category === "General"){
      setPic("https://images.unsplash.com/opengraph/1x1.png?blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1432821596592-e2c18b78144f%3Fblend%3D000000%26blend-alpha%3D10%26blend-mode%3Dnormal%26crop%3Dfaces%252Cedges%26h%3D630%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fh%253D84%2526txt%253Dblog%2526txt-align%253Dmiddle%25252Cleft%2526txt-clip%253Dellipsis%2526txt-color%253D000000%2526txt-pad%253D80%2526txt-size%253D40%2526txt-width%253D660%2526w%253D750%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26mark-align%3Dmiddle%252Ccenter%26mark-w%3D750%26w%3D1200%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8NHx8YmxvZ3xlbnwwfHx8fDE3MTU1NzY0ODJ8MA%26ixlib%3Drb-4.0.3&blend-w=1&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60");
    }
  },[Post.category]);


  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("access_token");
  const headers = {
    "Content-type": "application/json",
    "Authorization": `${accessToken}`,
  };

  useEffect(() => {
    const fetchData = () => {
      //Calling GET API
      axios
        .get(`https://vercel-blog-backend.vercel.app/postById`, {
          headers,
          params: { id }
        })
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const DeletePost = ()=>{

    //Call Api to delete a post

    axios.delete(`https://vercel-blog-backend.vercel.app/deletePost/${id}`, {headers}).then(response=>{
      console.log("POST DELETED");
      navigate("/home?cat=All")
    }).catch(error=>{
      console.log(error);
    });
  }

  return (
    <Container>

        <Image src={pic} alt="Blog Pic" srcSet="" />
        
        <Box style={{float:"right"}}>  
            {username === Post.username && 
             <>
                <Link to={`/update/${Post._id}`}>
                  <EditIcon color="primary" style={{cursor : "pointer"}}/>
                </Link>
               
                <DeleteIcon color="error" onClick={DeletePost} style={{cursor : "pointer"}}/>
             
             </>
            }

        </Box>
        
        <Heading>{Post.title}</Heading>
      <Author>
      <Typography>Author: <span style={{fontWeight: 600}}>{Post.name}</span></Typography>
      <Typography style={{marginLeft: 'auto'}}>{new Date(Post.createdDate).toDateString()}</Typography>
      </Author>

        <Description style={{ textAlign: "left"}}>{Post.description}</Description>

        <Comments post={Post}/>
    </Container>
  );
};

export default DetailView;
