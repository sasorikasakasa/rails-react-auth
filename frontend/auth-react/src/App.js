import React, { useState, useEffect} from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

//ページのコンポーネント系
import Home from "./components/pages/Home"
import SignUp from "./components/pages/auth/SignUp"
import SignIn from "./components/pages/auth/SignIn"
import Event from "./components/pages/Event"


//共通のコンポーネント
import CommonLayout from "./components/layouts/CommonLayout"

//api系
import { getCurrentUser } from "./lib/api/auth"


export const signUpParams = {
  name: "test5",
  email: "test5@test.com",
  password: "test55",
  password_confirmation: "test55",
}

export const AuthContext = React.createContext();


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [loading, setLoading] = useState(true)

  const value = {
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
  };

  const handleGetCurrentUser = async() => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log(res)
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  };

  useEffect(() =>{
    handleGetCurrentUser()
  }, [])


  //認証していなかったらリダイレクトをする。
  // const Private = () => {
  //   if(!loading){
  //     if(IsSignedIn){
  //       return <></>
  //     } else{
  //       console.log("aaa")
  //       return <Redirect to="/sign_in" />
  //     }
  //   } else {
  //     return <></>
  //   }
  // }
  // useEffect(() => {
  //   Private()
  // },[loading])


  //もしユーザが未認証だったらsign_inページに戻す。
    return (
      <Router>
        <AuthContext.Provider value={value}>
          <CommonLayout>
            <Switch>
              <Route exact path="/sign_up" ><SignUp/></Route>
              <Route exact path="/sign_in" ><SignIn/></Route>
              {/* <Route exact path="/">{IsSignedIn ? <Home/>: <Redirect to="/sign_in"/>}</Route> */}
              <Route exact path="/"><Home/></Route>
              <Route exact path="/events"><Event/></Route>
            </Switch>
          </CommonLayout>
        </AuthContext.Provider>
      </Router>
    );
}

export default App;
