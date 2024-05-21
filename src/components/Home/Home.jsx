import Banner from "./Banner";
import Categories from "./Categories";
import Posts from "../post/AllPosts";



const Home = () =>{
    return(
        <>
            <Banner/>
            
            {/* <Grid container>
                <Grid item lg={1.5} sm={2} xs={2}>
                    <Categories/>
                </Grid>
            <Grid item lg={10} sm={10} xs={12}>
                <Posts/>
            </Grid>
            
            </Grid> */}

            <div style={{display: "flex", flexDirection: "row"}}>
                <div className="left" style={{width: "10rem"}}>
                    <Categories/>
                </div>
                <div className="right" style={{display:"flex", flexDirection:"row" ,width: "90%", justifyContent: "center"}}>
                    <Posts/>
                </div>
            </div>
            
        </>
    )
}

export default Home;
