import React, { useEffect, useRef } from 'react'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const App = () => {
  const zpRef = useRef(null)

  const userID = "user" + Math.floor(Math.random() * 1000); 
  const userName = "react_" + userID;
  const appID = 1824316213;
  const serverSecret = "0cf75ef6b9eab27eff21f574c6cf002d";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,null, userID, userName);

  useEffect(()=>{
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  },[TOKEN])

  function invite() {
   const targetUser = {
        userID: prompt("Enter callee's userId"),
        userName:("Enter callee's userName")
    };

   zpRef.current.sendCallInvitation({
    callees: [targetUser],
    callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
    timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
   }).then((res) => {
    console.warn(res);
   })
   .catch((err) => {
   console.warn(err);
   });
}

  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#1a2229] to-black flex items-center justify-center'>
      <div className='w-[500px] h-[400px] bg-[#0d1014] border-2 border-[#3d3c3c] flex flex-col items-center justify-center gap-[20px]'>
        <h2 className='text-[white] text-[20px]'><span className='text-blue-500'>User Name: </span>{userName}</h2>
        <h2 className='text-[white] text-[20px]'><span className='text-blue-500'>UserId: </span>{userID}</h2>
      </div>
    </div>
  )
}

export default App