import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions
} from "react-native";
import { VideoItem } from "./components";
import { AgileVid, IdeaVid, PrankVid, DbzVid, RalphVid } from "./videos";
import styles from './styles';

const { width, height } = Dimensions.get("window");

const containerColor = "#000000";
const headerColor = "#323C48";
const contentColor = "#CCC";
const scrollColor = "#F0F8FF";

class App extends React.Component {
  // componentDidMount() {
  //   fetch(
  //     "https://randomyoutube.net/api/getvid?api_token=UpEWBXsc2djNKQIkRRWEzcs2z8axNY6Wn1glMPUmr2SbWbvmZJEZf8qgU7vy"
  //   )
  //     .then(res => console.log(`res: `, res))
  //     .catch(e => console.log(`e: `, e));
  // }
  state = {
    videos: [PrankVid, IdeaVid, DbzVid, AgileVid, RalphVid],
    scrollPosition: null,
    muted: false
  };

  handleScroll = e => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    this.setState({ scrollPosition });
  };

  render() {
    const { videos, scrollPosition, muted } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => alert("AWS Amplify WIP")}
            style={{
              width: 120,
              height: 40,
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Upload Video</Text>
          </TouchableHighlight>
        </View>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
          style={styles.scrollView}
        >
          {videos.map((item, key) => (
            <VideoItem
              key={key}
              source={item}
              scrollPosition={scrollPosition}
              muted={this.state.muted}
              onPress={() => this.setState({ muted: !muted })}
            />
          ))}
          <View style={{ height: 150, width }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;
