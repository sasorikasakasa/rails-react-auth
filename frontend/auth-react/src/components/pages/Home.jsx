import React, { useContext } from "react"

import { AuthContext } from "../../App"
import Cookies from "js-cookie"

const Home = () => {
  const { isSignedIn,setIsSignedIn,currentUser,setCurrentUser,loading,setLoading } = useContext(AuthContext)

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
             <h1>Signed in successfully!</h1>
            <h2>Email: {currentUser?.email}</h2>
            <h2>Name: {currentUser?.name}</h2>
          </>
        ):(
        <h1>Not signed in</h1>
        )
      }
      {console.log(Cookies.get("_access_token"))}
      {console.log(Cookies.get("_client"))}
      {console.log(Cookies.get("_uid"))}

    </>
  )
}

export default Home
