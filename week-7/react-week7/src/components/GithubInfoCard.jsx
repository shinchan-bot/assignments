import { useRecoilState } from "recoil"
import { githubInfo } from "../store/atoms/githubInfo"
import { useMemo, useState } from "react";
import axios from "axios";

export const GithubInfoCard = () => {
    const [username, setUsername ] = useState("");
    const [userGithubInfo, setUserGithubInfo] = useRecoilState(githubInfo);

    const handleUserInput = (input) => {
            setUsername(input);
    }

    const GithubInfoCache = ()=> {
        console.log(username);
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => {
                const info = (res.data);
                console.log(info)
                setUserGithubInfo(info);
            })
    };
    return (
        <div>
            <input type="text" placeholder="Enter Github Username" 
                onChange = {(e) => {handleUserInput(e.target.value)}}
            />
            <button onClick={()=> {GithubInfoCache()}}>Get Info</button>
            <div>{JSON.stringify(userGithubInfo)}</div>
        </div>
    )
}