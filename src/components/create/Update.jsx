import {Box,styled,FormControl,Button,InputBase} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useEffect, useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';




const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
      margin: 0
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
});

const StyleInputBase = styled(InputBase)`
  flex: 1;
  margin: 0px 20px;
  font-size: 28px;
`;

const StyleForm = styled(FormControl)`
  display: flex;
  flex-direction: row;
`;

// const Textarea = styled(TextareaAutosize)({
//   width: "100%",
//   border: "none",
//   marginTop: "30px",
//   fontSize: "18px",
//   resize: "none",
//   border: "1px solid rgba(200, 200, 200, 1)",
//   '&:focus-visible': {
//     outline: "none",
//   }
// });



const initialPost = {
  title: "",
  description: "",
  picture: "",
  name: "",
  username: "",
  category: "",
  createdDate: "",
};

const Update = () => {

    //HOOKS
    const [post, setPost] = useState(initialPost);
    // let [searchParams] = useSearchParams();
    const {id} = useParams();

    const navigate = useNavigate();
    
    const accessToken = sessionStorage.getItem("access_token");
    const headers = {
      "Content-type": "application/json",
      "Authorization": `${accessToken}`,
    };


    useEffect(()=>{
        
        const fetchData = () => {
            //Calling GET API
            axios
              .get(`https://vercel-blog-backend.vercel.app/postById`, {
                headers,
                params: { id },
              })
              .then((response) => {
                setPost(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          };

          fetchData();

        // //Update the post values
        // post.username = sessionStorage.getItem('username');
        // post.name = sessionStorage.getItem('name');
        // post.category = searchParams.get('cat');
        console.log(post);
        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //FUNTIONS
    const handleCreate = (e)=>{
        setPost({...post, [e.target.name]: e.target.value});
    };


    //Calling API and Publishing
    const updateBlogPost = ()=>{

      //Headers for authentication
      post.createdDate = new Date();
      const accessToken = sessionStorage.getItem('access_token');

      const headers = {
        'Content-type': 'application/json',
        'Authorization': `${accessToken}`

      };


      axios.put(`https://vercel-blog-backend.vercel.app/updatePost`, post, { params: { id }, headers }).then(response => {
        console.log(response.data.msg);
        // Close Create Tab
        navigate(`/details/${id}`);
      }).catch(error => {
        console.log("error updating from front end", error.response.data.msg);
      });
      

      
    
    }
    

  return (
    <>
      <Container>
        <Image
          src="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          alt="pic"
          srcSet=""
        />
        <StyleForm>
          <label htmlFor="fileInput">
            <AddCircleRoundedIcon fontSize="large" />
          </label>
          <input type="file" id="fileInput" name="picture" style={{ display: "none" }} />

          <StyleInputBase value={post.title} placeholder="Title" name="title" onChange={(e) => handleCreate(e)}  />
          <Button variant="contained" onClick={updateBlogPost}>Update</Button>
        </StyleForm>

        <TextareaAutosize
            minRows={5}
            placeholder="Tell your story..."
            name="description"
            value={post.description}
            onChange={(e) => handleCreate(e)}
            style={{
                width: "100%",
                border: "1px solid rgba(200, 200, 200, 1)",
                marginTop: "30px",
                fontSize: "18px",
                resize: "none",
                outline: "none", // Remove outline when focused
            }}
        />
      </Container>
    </>
  );
};

export default Update;
