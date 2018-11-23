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
import VideoItem from "./components/VideoItem";

import { AgileVid, IdeaVid, PrankVid, DbzVid, RalphVid } from './videos';

// import StrongVid from "./videos/strongest.mp4";
// import WeakVid from "./videos/videoplayback.mp4";

const { width, height } = Dimensions.get("window");

const containerColor = "#000000";
const headerColor = "#323C48";
const contentColor = "#CCC";
const scrollColor = "#F0F8FF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: containerColor
  },
  content: {
    height: 150,
    backgroundColor: contentColor,
    paddingTop: 250,
    alignItems: "center"
  },
  header: {
    backgroundColor: headerColor,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
	scrollView: {
		backgroundColor: scrollColor
	}
});

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
    scrollPosition: null
  };

  handleScroll = e => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    this.setState({ scrollPosition });
  };

  render() {
    const { videos, scrollPosition } = this.state;
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
            />
          ))}
					<View style={{height: 150, width}}/>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;
