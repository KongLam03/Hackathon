import videos from './videos.json';

export const getVideosApi = (startAt = 0, limit = 10) => {
  const result = [];
  [...Array(limit).keys()].forEach(i => {
    const currentVideos = videos.list[i + startAt];
    if (currentVideos) result.push(currentVideos)
  });
  console.log(`result :`, result);
  return result
}
