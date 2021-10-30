import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"


//api関係
import { signOut } from "../../lib/api/auth"
import { AuthContext } from "../../App"

// レイアウト関係
import { makeStyles , Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"


//使いたいレイアウトの宣言
const useStyles = makeStyles((Theme) => ({
  IconButton: {
    marginRight: Theme.spacing(2)
  },
  title: {
    flexGrow: 1, //こいつの役割がよくわからない
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none"
  }
}))




const Header = () => {
  const { loading , isSignedIn , setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const history = useHistory()

  // これはサインアウト処理を行う関数
  const handleSignOut = async (e) => {
    try {
      const res = await signOut()

      if (res.data.success == true){
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/sign_in")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (error) {
      console.log(error)
    }
  }
  //これはサインアウトを行うボタン
  const AuthButtons = () => {

    if (!loading) {
      if(isSignedIn){
        return (
          <Button
            color="inherit"
            className={classes.linkBtn}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        )
      }else {
        return (
          <>
            <Button 
              component = {Link}
              to="/sign_in"
              color="inherit"
              className={classes.linkBtn}
              >
                Sign in
              </Button>   
              <Button 
              component = {Link}
              to="/sign_up"
              color="inherit"
              className={classes.linkBtn}
              >
                Sign up
              </Button>
          </>
        )
      }
    } else {
      return <></>
    }

  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            Sample
          </Typography>
          <AuthButtons/>
        </Toolbar>
      </AppBar>
    </>
  )

}

export default Header