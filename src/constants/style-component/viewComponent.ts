const { height, width } = Dimensions.get("screen");
const h = 40
const w = 145
export const setHeight = (h:number) => (height/100) *h
export const setWidth = (w:number) => (width / 100) * w;
import { Dimensions, ImageStyle, ViewStyle } from "react-native";
import Color from "../color";

//Login
export const Logincontainer: ViewStyle = {
  backgroundColor: Color.AMBER,
  borderRadius: 24,
  alignContent: "space-between",
  flexDirection: "column",
  margin: 16,
  padding: 8,
  paddingTop: 42,
  height: "60%",
};
export const InputContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: Color.WHITE,
  borderRadius: 8,
  flexDirection: "row",
  margin: 8,
  padding: 8,
};

// -> use in Genre Card and Watch list
export const CardContainer: ViewStyle = {
  alignItems: "center",
  alignContent:"center",
  flexDirection:"row",
  backgroundColor: "#DFE0E0",
  borderRadius: 5,
  elevation: 3,
  paddingEnd:9,
  justifyContent: "center",
  marginVertical: 2,
  paddingVertical: 8,
  width: setWidth(25),
};



  // --> Home/Movie Screen Styling

export const movieContainer:ViewStyle= {
    backgroundColor: Color.BLUE,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 4,
    flexDirection: "row",
    height: 350,
    justifyContent: "space-between",
    marginVertical: 12,
    width: 250,
  }

 export const  SearchBar:ViewStyle= {
    alignItems: "center",
    backgroundColor: Color.WHITE,
    borderRadius: 12,
    flexDirection: "row",
    padding: 10,
    width: "100%",
    
  }

  

 export const ListPreviewMovie:ViewStyle = {
    flexDirection: "column",
    margin: 8,
    marginLeft: 12,
    paddingVertical: 12,
  }

  export const ImagePoster :ImageStyle={

    borderBottomLeftRadius: movieContainer.borderBottomLeftRadius,
    borderTopRightRadius: movieContainer.borderTopRightRadius,
    height: movieContainer.height,
    width:movieContainer.width,
  }

  // --> Detail Movie Screen Styling

  export const container :ViewStyle = {

    backgroundColor:Color.BASIC_BACKGROUND,
    flex:1,
  }
export const  ImagePosterDetail:ViewStyle = {

  alignItems:"center",
  elevation: 8,
  height:setHeight(h),
  left: setWidth((100-145)/2),
  position:"absolute",
  top:0,
  width:setWidth(w),
}
export const posterImage:ImageStyle = {

  height:Dimensions.get('window').height ,
  resizeMode:"cover",
  width: setWidth(w),
}

export const HeaderDetail:ViewStyle = {

  alignItems:"center",
  elevation:16,
  flexDirection:"row",
  justifyContent:"space-around",
  left:0,
  paddingHorizontal:24,
  position:"absolute",
  right:0,
  top:32,
}

export const MovieDetailContainer:ViewStyle = {

  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 32,
}

export const ContainerRow :ViewStyle ={
  
    alignItems: "center",
    alignContent:"center",
    flexDirection: "row",
    width:64,
    padding:16

    
}

export const smallDetail : ViewStyle ={
    paddingHorizontal: 32,
    paddingTop: 16,
    flexDirection:"row"
}
export const OverviewContainer:ViewStyle = {

  alignItems: "flex-start",
  backgroundColor:Color.BLACK,
  flexDirection: "column",
  justifyContent: "space-between",
}

export const ButtonContainerRating:ViewStyle ={
    alignItems: "center",
    justifyContent: "center",
    marginLeft:52,
    position: "relative",
  
}