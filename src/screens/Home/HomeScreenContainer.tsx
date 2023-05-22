import { ListCardButtons } from "./ListCardButtons";
import {
  bottomCardContainer,
  ListPreviewMovie,
  movieContainer,
  sectionStyle,
  subDetail,
  subHeader,
  subTitle,
  useDebounce,
} from "../../constants";
import { FlatList, Text, TouchableOpacity, View, ViewStyle, Animated } from "react-native";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import Loader from "../../components/loader/Loader";
import { ItemSeparator } from "../../components";

interface IBottomScreenCardContainer {
  searchInput: string;
  Movies: TMovieType[];
  Genres: TGenre[];
  loading: boolean | undefined;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handlePressGenre: (item: TGenre, index: number) => void;
  handleShowDetailScreen: (
    id: number,
    navigation: RootNavigationProp,
    setLoading: Dispatch<SetStateAction<boolean>>,
    storeAllDetailsState: (detail: IMovieDetail, review: IResultReview[]) => Promise<void>,
  ) => Promise<void>;
  storeAllDetailsState: (detail: IMovieDetail, review: IResultReview[]) => Promise<void>;
  fadeAnim: Animated.Value;
}

// type TWatchlist = "Favorite" | "To Watch";

export const ImagePoster: FastImageStyle = {
  borderRadius: movieContainer.borderRadius,
  height: movieContainer.height,
  width: 150,
};
export const BottomScreenCardContainer = ({
  searchInput,
  Movies,
  Genres,
  handleShowDetailScreen,
  loading,
  setLoading,
  handlePressGenre,
  storeAllDetailsState,
  fadeAnim,
}: IBottomScreenCardContainer) => {
  const [active, setActive] = useState<number>(0);
  const navigation: RootNavigationProp = useNavigation();
  loading = false;

  const subContainer: ViewStyle = {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const MovieCardTitle: ViewStyle = {
    marginTop: 5,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 2,
    paddingLeft: 3,
    width: 150,
  };
  const Rating: ViewStyle = {
    alignItems: "center",
    flexDirection: "row",
  };

  // const searchMovies = Movies.filter((item) => {
  //   item.title !== undefined && item.title.toLowerCase().includes(searchInput !== "" ? searchInput.toLowerCase() : "");
  // });

  const debouncedValues = useDebounce(searchInput, 800);

  const searchMovies = Movies.map((item) => {
    const isIncluded =
      item.title !== undefined && item.title.toLowerCase().includes(debouncedValues !== "" ? debouncedValues.toLowerCase() : "");
    return isIncluded ? item : null;
  }).filter((item) => item !== null);

  return (
    <Fragment>
      <Animated.View
        style={{
          ...bottomCardContainer,
        }}>
        <ListCardButtons data={Genres} handlePress={handlePressGenre} active={active} setActive={setActive} />

        <View style={{ ...sectionStyle }}>
          {Object.keys(searchMovies).length > 0 && active !== undefined && searchMovies !== undefined ? (
            <Fragment>
              {loading ? (
                <Loader />
              ) : (
                // render MovieCard list
                <FlatList
                  data={searchMovies}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => `${item?.id}`}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={() => <ItemSeparator width={24} />}
                  renderItem={({ item, index }) => (
                    <Fragment>
                      {Object.keys(searchMovies).length == 0 || searchMovies == null || searchMovies === undefined ? null : (
                        <TouchableOpacity
                          key={`${item?.title}-${index}`}
                          onPress={() =>
                            handleShowDetailScreen(
                              item?.id ? item?.id : searchMovies.indexOf(item),
                              navigation,
                              setLoading,
                              storeAllDetailsState,
                            )
                          }>
                          <View style={{ ...ListPreviewMovie }}>
                            <View style={movieContainer}>
                              <FastImage
                                source={{ uri: `${POSTER_BASE_URL}original${item?.poster_path}` }}
                                style={ImagePoster}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </View>
                            <View style={MovieCardTitle}>
                              <Text style={subHeader} numberOfLines={3}>
                                {item?.title}
                              </Text>
                            </View>
                            <View style={subContainer}>
                              <View>
                                <Text style={subTitle}> {item?.release_date}</Text>
                              </View>
                              <View style={Rating}>
                                <Icon name="heart-sharp" size={12} color="red" />
                                <Text style={subDetail}> {item?.vote_average.toFixed(1)}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    </Fragment>
                  )}
                />
              )}
            </Fragment>
          ) : loading ? (
            <Loader />
          ) : (
            <Text style={subHeader}> No Movie found{":("}</Text>
          )}
        </View>
      </Animated.View>
    </Fragment>
  );
};
