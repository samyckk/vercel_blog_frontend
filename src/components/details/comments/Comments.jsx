import { Box, Button,styled } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import Comment from "./Cmnt";



const Containter = styled(Box)`
    margin-top: 100px;
    display: flex;
    flex-direction: column;

`
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
    flex: 1
});

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const Comments = ( {post} ) =>{

    const cmntURL = 'https://static.thenounproject.com/png/12017-200.png';

    const accessToken = sessionStorage.getItem("access_token");
    const headers = {
        "Content-type": "application/json",
        "Authorization": `${accessToken}`,
    };

    const initialComment = {
        name: '',
        postId: '',
        cmnt: '',
        date: '',
    }

    //HOOKS
    const [cmnt, setCmnt] = useState(initialComment);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const fetchData = ()=>{
        console.log(post._id);
        axios.get(`https://vercel-blog-backend.vercel.app/comments/${post._id}`, {headers}).then(response=>{         
            setComments(response.data);
        }).catch(error=>{
            console.log(error);
        })
    };

    useEffect( ()=>{
        if(post._id && headers ){
            fetchData();
        }
            

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[post,toggle])


    //Functions
    const handleChange = (e)=>{
        setCmnt({...cmnt, [e.target.name]: e.target.value });
    }

    const addComment = ()=>{
        cmnt.name = sessionStorage.getItem("name");
        cmnt.postId = post._id;
        cmnt.date = new Date().toString();

        axios.post("https://vercel-blog-backend.vercel.app/addComment", cmnt, {headers}).then(response=>{
            console.log(response.data);
            setCmnt(initialComment);
            setToggle(!toggle);
        }).catch(error=>{
            console.log(error);
        })

    }

    return(
        <Containter>
            <StyledBox>
                <Image src={cmntURL} alt="commentPic" srcSet="" />
                <TextareaAutosize
                    style={{ height: '100%', width: '100%', margin: " 0 20px", padding: " 5px 10px" }}
                    minRows={5}
                    placeholder="Comment Your Thoughts"
                    onChange={(e)=>handleChange(e)}
                    name= "cmnt"
                    value={cmnt.cmnt}
                />

                <Button variant="contained" size="medium" color="primary" style={{height: 40}} onClick={addComment}> Post </Button>
            </StyledBox>

            <Box>
                {
                    comments && comments.length>0 && comments.map(comment=>{
                        return <Comment comment={comment} setToggle={setToggle}/>
                    })
                }
            </Box>
        </Containter>
    )
}

export default Comments;