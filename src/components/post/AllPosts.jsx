import axios from "axios";
import { useEffect, useState } from "react";
import PostLayout from "./PostLayout";
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
    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
      {/* Add margin */}
      {allPost && allPost.length > 0 ? (
        allPost.map((post) => (
          <div style={{display: "flex", flexDirection:"row", margin: "20px"}}>
            <Link to={`/details/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <PostLayout post={post} />
            </Link>
          </div>
            
        ))
      ) : (
        <img style={{margin: 'auto'}} src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" alt="loader" srcset="" />
      )}
    </div>
  );
};

export default Post;
