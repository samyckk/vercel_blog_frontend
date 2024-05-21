import Banner from "./Banner";
import Categories from "./Categories";
import Posts from "../post/AllPosts";
import { Grid} from "@mui/material";



const Home = () =>{
    return(
        <>
            <Banner/>
            <Grid container>
                <Grid item lg={1.5} sm={2} xs={2}>
                    <Categories/>
                </Grid>
            <Grid item lg={10} sm={10} xs={12}>
                <Posts/>
            </Grid>
            
            </Grid>
            
        </>
    )
}

export default Home;