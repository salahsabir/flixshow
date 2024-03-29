import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./Home.scss"
import { useState, useEffect } from "react"
import axios from "axios"
import { url } from "../../Urls";

const Home = ({type}) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)
    useEffect(()=>{
        const getRandomLists = async ()=>{
            try {
                const res = await axios.get(`${url}/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                  {
                    headers: {
                      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                  }
                );
                setLists(res.data)
              }catch(err){
                console.log(err);
            }
        }
        getRandomLists()
    },[type, genre])
    return (
        <div className='home'>
            <Navbar/>
            <Featured type={type}/>
            {lists.map((list, i)=>(
              <List list={list} key={i}/>
            ))}
            
        </div>
    );
}

export default Home;
