import {useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {listToObject} from './utilities';
import {SONGS} from './data';
import {SONG_HEIGHT} from './Config';
import {MovableSong} from './MovableSong';
import {ScrollDirection} from './types';

export default function SortableList() {
  const positions = useSharedValue(listToObject(SONGS));
  const scrollY = useSharedValue(0);
  const autoScroll = useSharedValue(ScrollDirection.None);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useAnimatedReaction(
    () => scrollY.value,
    scrolling => {
      scrollTo(scrollViewRef, 0, scrolling, false);
    },
  );

  const handleScroll = useAnimatedScrollHandler(event => {
    if (event.contentOffset.y === 0) {
      return; // prevent looping
    }
    scrollY.value = event.contentOffset.y;
  });

  const containerHeight = dimensions.height - insets.top - insets.bottom;
  const contentHeight = SONGS.length * SONG_HEIGHT;

  return (
    <>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={100}
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          height: contentHeight,
        }}>
        {SONGS.map(song => (
          <MovableSong
            key={song.id}
            id={song.id}
            artist={song.artist}
            cover={song.cover}
            title={song.title}
            positions={positions}
            lowerBound={scrollY}
            autoScrollDirection={autoScroll}
            songsCount={SONGS.length}
            containerHeight={containerHeight}
          />
        ))}
      </Animated.ScrollView>
    </>
  );
}
