import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('screen');

export let HomePageStyles= StyleSheet.create({
  container: {
    width:width/2.3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: "#000",
    borderWidth: 1,
    
  },
  header:{
    textAlign:"center",
  },
  main_container: {
    flex: 1,
    marginTop: 4,
  },
  item:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop:4

  },
  textBold:{
    fontWeight: 'bold',
  },
  image:{
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'gray'
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
