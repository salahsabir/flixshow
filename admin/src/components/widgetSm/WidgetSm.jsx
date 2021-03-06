import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])

  useEffect(()=>{
    const getNewUser = async ()=>{
      try{
        const res = await axios.get("users?new=true", {headers:{token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmQ5OTM4M2E2MWZkNjA3NGNhNmM2NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzkyNjAzOCwiZXhwIjoxNjQ4MzU4MDM4fQ.EX1azeaBQ2WgH4luh0PONRzytvxJKfvsm4nQPLCZQ3k"}})
        console.log(res.data);
        setNewUsers(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getNewUser()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user,i)=>(
          <li className="widgetSmListItem" key={i}>
          <img
            src={user.profilepic || "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
