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
import styles from "./styles";
import { getVideosApi } from "./mocks/getVideos";

const { width, height } = Dimensions.get("window");

class App extends React.Component {
  componentDidMount() {
    this.getVideos();
  }
  state = {
    videos: [],
    scrollPosition: null,
    muted: false
  };

  handleScroll = e => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    this.setState({ scrollPosition });
  };

  getVideos = () => {
    const { videos } = this.state;
    const startAt = videos.length;
    const result = getVideosApi(startAt);
    this.setState({
      videos: [...videos, ...result]
    });
  };

  render() {
    const { videos, scrollPosition, muted } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => alert("AWS Amplify WIP")}
            style={styles.uploadVideo}
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
              source={{ uri: item.video }}
              scrollPosition={scrollPosition}
              muted={muted}
              onPress={() => this.setState({ muted: !muted })}
            />
          ))}
          <View style={styles.header}>
            <TouchableHighlight
              onPress={this.getVideos}
              style={styles.uploadVideo}
            >
              <Text>Load More</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;
