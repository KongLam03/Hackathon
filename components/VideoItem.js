import React from "react";
import { Dimensions, TouchableHighlight, StyleSheet } from "react-native";
import Video from "react-native-video";

const THRESHOLD = 490;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  video: { width, height: 300 }
});

class VideoItem extends React.Component {
  state = {
    paused: true,
    position: {
      start: null,
      end: null
    }
  };

  handleVideoLayout = e => {
    const start = e.nativeEvent.layout.y - height + THRESHOLD;
    const end =
      e.nativeEvent.layout.y + e.nativeEvent.layout.height - THRESHOLD;
    this.setState({
      position: { start, end }
    });
  };

  componentDidUpdate(prevProps) {
    const headerHeight = 80;
    const { scrollPosition } = prevProps;
    const {
      paused,
      position: { start, end }
    } = this.state;
    if (
      scrollPosition - headerHeight > start &&
      scrollPosition - headerHeight < end &&
      paused
    ) {
      this.setState({ paused: false });
    } else if (
      (scrollPosition - headerHeight > end ||
        scrollPosition - headerHeight < start) &&
      !paused
    ) {
      this.setState({ paused: true });
    }
  }

  render() {
    const { paused } = this.state;
    const { source } = this.props;
		console.log(`paused: `, paused);
    return (
      <TouchableHighlight
        onPress={() => this.setState({ paused: !paused })}
        onLayout={this.handleVideoLayout}
      >
        <Video source={source} paused={paused} style={styles.video} />
      </TouchableHighlight>
    );
  }
}

export default VideoItem;
