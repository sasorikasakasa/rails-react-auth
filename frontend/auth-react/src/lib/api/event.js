import client from "./client"
import Cookies from "js-cookie"

//とりあえず全部にカスタムヘッダーつけとくわ

export const getEventNew = () => {
  return client.get("events/new", { headers: {
    "access-token":Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid":Cookies.get("_uid")
  }})
}

export const getEventIndex = () => {
  return client.get("events", { headers: {
    "access-token":Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid":Cookies.get("_uid")
  }})
}





