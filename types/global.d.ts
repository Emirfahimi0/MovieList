import { MovieType } from "src/screens";
import { IMovieDetail, IReview, IAccountState } from "src/services";

declare type RootStackParamList = {
   DetailScreen: {item:IMovieDetail,review:IReview[],state:IAccountState}
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchlistScreen:{resWatchlist:MovieType[]}

  };
  
 declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;