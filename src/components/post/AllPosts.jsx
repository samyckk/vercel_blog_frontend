import axios from "axios";
import { useEffect, useState } from "react";
import PostLayout from "./PostLayout";
import { Grid } from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";

const Post = () => {
  
  const [allPost, setAllPost] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("cat");
  
  


  const accessToken = sessionStorage.getItem("access_token");
  const headers = {
    "Content-type": "application/json",
    Authorization: `${accessToken}`,
  };

  useEffect(() => {
    const fetchPost = () => {
      console.log("Trying to fetch");
      axios.get("https://vercel-blog-backend.vercel.app/posts", { params: {category}, headers }).then((response) => {
        console.log(response.data);
        setAllPost(response.data);
      });
    };

    fetchPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  

  return (
    <Grid container spacing={2} sx={{ margin: "10px" }}>
      {/* Add margin */}
      {allPost && allPost.length > 0 ? (
        allPost.map((post) => (
          <Grid item lg={4} md={4} sm={6} xs={12} key={post._id}>
            <Link to={`/details/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <PostLayout post={post} />
            </Link>
            
          </Grid>
        ))
      ) : (
        <img style={{margin: 'auto'}} src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" alt="loader" srcset="" />
      )}
    </Grid>
  );
};

export default Post;
