import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header"

const useStyles = makeStyles( () => ({
  container: {
    marginTop : "3rem"
  }
}))


const CommonLayout = (({children}) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
})

export default CommonLayout