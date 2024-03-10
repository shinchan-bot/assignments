import './LoginOTP.css';
import {mobile, auth} from '../store/atoms/Login';
import { useRecoilState, useRecoilValue } from 'recoil';
import OtpInput from 'react-otp-input';
import { useState } from 'react';


  
  
export const LoginOTP = () => {
    const authRes = useRecoilValue(auth);

    return <div id='LoginOTP' >
        {console.log(authRes, "rav")}
        {authRes == "otpSent" ? <OtpVerify/> : <OtpSend/> }
    </div>
}

const OtpSend = () => {
    const [mymobile, setMobile] = useRecoilState(mobile);
    const [authRes, setAuthRes] = useRecoilState(auth);

    const handleSendOTP = () => {
        setAuthRes("otpSent");
        console.log(authRes)
    }

    return <div id='BoxOTP'>
        <h1>Login via OTP</h1>
        <input
            onChange={(e)=> {setMobile(e.target.value), console.log(e.target.value)}}
        type="text" placeholder='Enter your mobile number' />
        <button 
            onClick={() => {handleSendOTP()}}
        >Send OTP</button>
    </div>
}

const OtpVerify = () => {
    const [otp, setOtp] = useState('');
    return <div id='BoxOTP'>
        <h1>Login via OTP</h1>
        <OtpInput
            
            inputStyle={{
                color:"white",
                background:"black",
                width:"50px",
                height:"40px",
                border:"1px solid white",
                borderRadius:"10px",
                marginLeft:"10px",
                fontSize:"25px"
            }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => <input {...props} />}
        ></OtpInput>
        <button 
            onClick={() => {}}
        >Login</button>
    </div>
}