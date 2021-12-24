import React, { useState, useContext, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"

import { AuthContext } from "App"
import Cookies from "js-cookie"
import { getEventIndex } from "lib/api/event"


const Event = () => {


  const { setIsSignedIn , setCurrentUser } = useContext(AuthContext)

  const history = useHistory()
  const [events, setEvents] = useState("")

  const getEventIndex = async () => {
 
    try {
      const res = await getEventIndex()
      console.log(res)

      if (res.status === 200 ){
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setEvents(res.data.data)


        console.log("うまくデータ取れてる")
      }else{
      }
    }catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    getEventIndex()
  }, [])

  return (
    <>
        <h1>ここはイベントがめん</h1>
    </>
  )
}

export default Event