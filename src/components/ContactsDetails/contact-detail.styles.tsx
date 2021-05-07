import { StyleSheet } from "react-native";

export let ContactDetailsStyles= StyleSheet.create({
  scrollview_container: {
    marginTop:54,
    display: "flex",
    flex: 1,
  },
  image: {
    width: 156,
    height: 156,
    marginBottom: 34,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  link: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    color:"#479ba2",
    ':hover':{
      color:"#1d1c64",
    }
  }
});
