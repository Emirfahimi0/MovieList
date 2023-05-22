import { ImageBackground, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Dispatch, Fragment, SetStateAction, useCallback, useState } from "react";
import {
  CardContainer,
  ImagePosterDetail,
  headerContainerStyle,
  posterImage,
  setHeight,
  smallDetail,
  youtubePlayerView,
  color,
  Font,
  additionalDetailText,
  normalText,
  MovieDetailTitle,
  RatingText,
  overlay,
} from "../../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import YoutubeIframe from "react-native-youtube-iframe";
import FastImage from "react-native-fast-image";
import { ToastMessage } from "../../../components/toastMessage/ToastMessage";
import { POSTER_BASE_URL } from "../../../constants/utilities";
import { ItemSeparator } from "../../../components";
import { ButtonModalRating } from "./ButtonModalRating";

interface IHeaderContainerDetails {
  existWatchlist: boolean;
  handleWatchlist: () => void;
  onPress: () => void;
  postRatingDisable: boolean | { value: number } | undefined;
  ratingVal: number;
  selectedMovie: IMovieDetail | undefined;
  setPostRatingDisable: Dispatch<SetStateAction<boolean | { value: number } | undefined>>;
  setRating: Dispatch<SetStateAction<number>>;
}

export const HeaderContainerDetails = ({
  existWatchlist,
  handleWatchlist,
  onPress,
  postRatingDisable,
  ratingVal,
  selectedMovie,
  setPostRatingDisable,
  setRating,
}: IHeaderContainerDetails) => {
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);
  const trailer = selectedMovie?.videos.results.find((vid) => vid.name === "Official Trailer");

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlayTrailer(false);
      ToastMessage("success", "Finished", "video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlayTrailer((prev) => !prev);
  }, []);

  const playButton: ViewStyle = {
    position: "absolute",
    alignItems: "center",
    bottom: "64%",
    borderRadius: 50,
    backgroundColor: color.BLACK,
    justifyContent: "center",
    zIndex: 1,
  };
  return (
    <Fragment>
      <ImageBackground
        style={{ ...headerContainerStyle }}
        source={{ uri: `${POSTER_BASE_URL}original/${selectedMovie?.poster_path}` }}
        resizeMode="cover">
        <View style={{ position: "absolute", zIndex: playTrailer ? -1 : 1, left: 8, top: 46, flex: 1 }}>
          <TouchableOpacity onPress={onPress}>
            <Icon name="chevron-back-outline" size={32} color={color.SECONDARY_COLOR} />
          </TouchableOpacity>
        </View>

        <Fragment>
          {selectedMovie?.videos && playTrailer ? (
            <View style={{ justifyContent: "center", flexDirection: "column", paddingHorizontal: 32 }}>
              <YoutubeIframe
                webViewStyle={{ ...youtubePlayerView }}
                height={300}
                width={500}
                play={playTrailer}
                videoId={trailer?.key}
                onChangeState={onStateChange}
              />
            </View>
          ) : (
            <View style={ImagePosterDetail}>
              <FastImage
                style={posterImage}
                source={{ uri: `${POSTER_BASE_URL}original/${selectedMovie?.poster_path}` }}
                resizeMode="cover"
              />
            </View>
          )}
        </Fragment>
        <View
          //Play button
          style={
            !playTrailer
              ? { ...playButton, padding: 10 }
              : {
                  ...playButton,

                  height: 32,
                  width: 32,
                  backgroundColor: color.TRANSPARENT,
                }
          }>
          <TouchableOpacity onPress={togglePlaying}>
            {playTrailer ? (
              <Icon name="close-outline" size={24} style={{ fontWeight: "800" }} color={color.PRIMARY_COLOR} />
            ) : (
              <Icon name="play-outline" size={52} color={color.AMBER} />
            )}
          </TouchableOpacity>
        </View>
        <ItemSeparator height={8} />
        <View
          style={{
            ...overlay,
            alignItems: "center",
            borderRadius: 25,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}>
          <View style={{ justifyContent: "center", width: 320, flexDirection: "row", alignContent: "space-between" }}>
            <Text style={{ ...MovieDetailTitle }} numberOfLines={2}>
              {selectedMovie?.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignContent: "space-between",
                paddingTop: 4,
                paddingLeft: 16,
                justifyContent: "flex-end",
              }}>
              <Icon name="heart-sharp" size={16} color="red" />
              <Text style={{ ...RatingText, textAlign: "center", color: color.SECONDARY_COLOR, overflow: "scroll" }}>
                {" "}
                {selectedMovie?.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
          <View
            style={{
              ...smallDetail,
              flexDirection: "row",
              flexGrow: 1,
              flexWrap: "wrap",
            }}>
            {selectedMovie?.genres.map((value: TGenre, index: number) => (
              <View
                key={index}
                style={{
                  backgroundColor: color.PRIMARY_COLOR,
                  padding: 4,
                  margin: 4,
                  borderRadius: 5,
                }}>
                <Text key={index} style={{ fontFamily: Font.BOLD, fontSize: 12, color: color.SECONDARY_COLOR }}>
                  {value.name}
                </Text>
              </View>
            ))}
          </View>
          <View style={smallDetail}>
            <Text style={additionalDetailText}>Original Language: {selectedMovie?.original_language}</Text>
          </View>
          <View style={smallDetail}>
            <Text style={additionalDetailText}>Release Date: {selectedMovie?.release_date.toString()}</Text>
          </View>
          {/* <View style={smallDetail}>
          <Text style={additionalDetailText}>Status: {selectedMovie?.status.toString()}</Text>
        </View> */}
          <View style={{ ...smallDetail, paddingBottom: 32 }}>
            <TouchableOpacity onPress={handleWatchlist}>
              <View
                style={{
                  ...(existWatchlist
                    ? { ...CardContainer, ...{ backgroundColor: "#2C2C2C", width: 150 } }
                    : { ...CardContainer, ...{ width: 150 } }),
                }}>
                <Icon
                  name={existWatchlist ? "bookmark" : "bookmark-outline"}
                  size={18}
                  color={existWatchlist ? color.EXTRA_LIGHT_GRAY : color.BLACK}
                />
                <Text style={existWatchlist ? { ...normalText, color: color.SECONDARY_COLOR } : normalText}>
                  {existWatchlist ? "Added in Watchlist" : "Add to Watchlist"}
                </Text>
              </View>
            </TouchableOpacity>

            <ButtonModalRating
              selectedMovie={selectedMovie}
              ratingVal={ratingVal}
              setRating={setRating}
              ToastMessage={ToastMessage}
              postRatingDisable={postRatingDisable}
              setPostRatingDisable={setPostRatingDisable}
            />
          </View>
        </View>
      </ImageBackground>
    </Fragment>
  );
};
