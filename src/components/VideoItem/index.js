import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Video from "react-native-video";

import styles from "./styles";
const { width, height } = Dimensions.get("window");

const THRESHOLD = 490;

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

  shouldComponentUpdate(nextProps, nextState) {
    const headerHeight = 80;
    const { scrollPosition, muted } = nextProps;
    const newScrollPosition = scrollPosition - headerHeight;
    const {
      paused,
      position: { start, end }
    } = this.state;
    if (nextProps.muted !== this.props.muted) return true;
    if (newScrollPosition > start && newScrollPosition < end && paused)
      return true;
    if ((newScrollPosition > end || newScrollPosition < start) && !paused)
      return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    const headerHeight = 80;
    const { scrollPosition } = prevProps;
    const newScrollPosition = scrollPosition - headerHeight;
    const {
      paused,
      position: { start, end }
    } = this.state;
    if (newScrollPosition > start && newScrollPosition < end && paused) {
      this.setState({ paused: false });
    } else if (
      (newScrollPosition > end || newScrollPosition < start) &&
      !paused
    ) {
      this.setState({ paused: true });
    }
  }

  render() {
    const { paused } = this.state;
    const { source, onPress } = this.props;
    return (
      <TouchableHighlight
        onPress={() => this.props.onPress()}
        onLayout={this.handleVideoLayout}
      >
        <Video
          source={source}
          paused={paused}
          style={styles.video}
          muted={this.props.muted}
        />
      </TouchableHighlight>
    );
  }
}

VideoItem.propTypes = {
  source: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  scrollPosition: PropTypes.number
};

VideoItem.defaultProps = {
  scrollPosition: 0
};

export default VideoItem;
