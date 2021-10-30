import client from "../api/client"

export const exeTest = () => {
  return client.get("/test")
}