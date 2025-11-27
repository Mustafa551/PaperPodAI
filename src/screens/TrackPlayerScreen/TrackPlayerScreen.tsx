import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Share,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Buffer } from 'buffer';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { normalizeFont, normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';
import { AppText, AssetByVariant, Space } from '@/components/atoms';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SVG } from '@/theme/assets/icons';
import { useQuery } from '@tanstack/react-query';
import { getArticlesUuid } from '@/store/userSlice/userApiServices';

// Enable playback in silent mode and allow mixing with other audio (iOS)
Sound.setCategory('Playback', true);

const AudioPlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sentences, setSentences] = useState<Array<{ sentence: string; start: number; end: number }>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const flatListRef = useRef<FlatList>(null);
  const { colors, layout } = useTheme();

  // Read item from navigation params
  const route = useRoute() as any;
  const item = route?.params?.item || {};
  console.log("item item@@@ new ones", item);

  const {
    audioFilePath,
    fileName = '',
    uuid,
  } = item;
  console.log("fileName fileName", fileName);

  console.log("audioFilePath audioFilePath@@", audioFilePath);
  const {
    data: articles,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['getArticlesByUuid'],
    queryFn: () => getArticlesUuid(uuid),
  });
  console.log("error error message", error);

  console.log("articles articles by uuid", articles?.article);
  console.log("articles articles by uuid sentencesTimestamps", articles?.article?.sentencesTimestamps);

  useEffect(() => {
    const b64 = articles?.article?.sentencesTimestamps;
    if (!b64) {
      setSentences([]);
      return;
    }
    try {
      const decoded = Buffer.from(b64, 'base64').toString('utf8');
      const parsed = JSON.parse(decoded);
      if (Array.isArray(parsed)) {
        // Ensure numeric times and valid shape
        const clean = parsed
          .map((s: any) => ({
            sentence: String(s.sentence ?? ''),
            start: Number(s.start ?? 0),
            end: Number(s.end ?? 0),
          }))
          .filter((s: any) => s.sentence && !Number.isNaN(s.start) && !Number.isNaN(s.end));
        setSentences(clean);
      } else {
        setSentences([]);
      }
    } catch (e) {
      console.log('Failed to decode/parse sentencesTimestamps', e);
      setSentences([]);
    }
  }, [articles?.article?.sentencesTimestamps]);

  // Sound reference
  const soundRef = useRef<Sound | null>(null);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioUrlRef = useRef<string>('');

  const cleanupAudio = useCallback(() => {
    // stop timer
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }

    // stop & release sound
    if (soundRef.current) {
      try {
        soundRef.current.stop();
      } catch (e) {
        // ignore stop error
      }
      soundRef.current.release();
      soundRef.current = null;
    }

    // reset UI state
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  // Initialize sound on component mount or when audioFilePath changes
  useEffect(() => {
    // Pick audio URL from params (fallback if missing)
    // 1. Known good working demo audio (12s)
    const workingFallbackUrl =
      'https://res.cloudinary.com/dptcdlae6/video/upload/v1761238920/audios/Pretty_Little_Baby_Lyrics.mp3.mp3';

    // 2. Original 24s URL that fails to load due to double-encoded spaces
    const rawProvidedUrl =
      typeof audioFilePath === 'string' ? audioFilePath.trim() : '';

    // Try to "fix" double-encoding like `%2520` -> `%20`
    const normalizedUrl = rawProvidedUrl
      .replace(/%2520/gi, '%20')
      .replace(/ /g, '%20');

    // Reject clearly invalid values
    const cleanedUrl =
      normalizedUrl &&
        normalizedUrl !== 'null' &&
        normalizedUrl !== 'undefined'
        ? normalizedUrl
        : '';

    // Final URL preference:
    // - if cleanedUrl looks like an https url, use it
    // - else use workingFallbackUrl
    const finalUrl = cleanedUrl.startsWith('http')
      ? cleanedUrl
      : workingFallbackUrl;

    console.log('About to init Sound with URL ===>', finalUrl);

    console.log('AUDIO URL DECISION FLOW =>', {
      audioFilePathFromProps: audioFilePath,
      rawProvidedUrl,
      normalizedUrl,
      cleanedUrl,
      finalUrl,
    });

    audioUrlRef.current = finalUrl;

    // Clean any existing sound before creating a new one
    cleanupAudio();

    if (!finalUrl) {
      return; // nothing to load
    }

    const isLikelyPlayable =
      finalUrl.endsWith('.mp3') ||
      finalUrl.endsWith('.m4a') ||
      finalUrl.endsWith('.aac');

    if (!isLikelyPlayable) {
      console.log('Blocked non-audio or unsupported container for AVAudioPlayer =>', finalUrl);
      return;
    }

    const sampleAudio = new Sound(finalUrl, undefined as any, (error) => {
      if (error) {
        console.log('Failed to load sound', { finalUrl, error });
        return;
      }
      soundRef.current = sampleAudio;
      const dur = sampleAudio.getDuration();
      setDuration(dur);
      sampleAudio.setNumberOfLoops(0);

      // Auto‑play when screen opens or URL changes
      sampleAudio.play((success) => {
        if (!success) {
          console.log('Playback failed due to audio decoding errors');
        }
        handlePlaybackComplete();
      });
      setIsPlaying(true);
      console.log('Sound loaded and auto‑playing from params URL');
    });

    // Cleanup on unmount or when URL changes
    return () => {
      cleanupAudio();
    };
  }, [audioFilePath, cleanupAudio]);

  // Stop audio when screen loses focus (user navigates away)
  useFocusEffect(
    useCallback(() => {
      // screen focused -> do nothing special
      return () => {
        // screen is blurring/unfocusing -> stop audio immediately
        cleanupAudio();
      };
    }, [cleanupAudio])
  );

  // Update progress timer
  useEffect(() => {
    if (isPlaying) {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
      playbackTimerRef.current = setInterval(() => {
        if (soundRef.current) {
          soundRef.current.getCurrentTime((seconds) => {
            setCurrentTime(seconds);
            if (sentences.length) {
              const idx = sentences.findIndex(s => seconds >= s.start && seconds < s.end);
              if (idx !== -1 && idx !== activeIndex) {
                setActiveIndex(idx);
              }
            }
            if (duration > 0 && seconds >= duration) {
              handlePlaybackComplete();
            }
          });
        }
      }, 1000);
    } else if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    };
  }, [isPlaying, duration, sentences, activeIndex]);

  // Auto-scroll transcript to keep the active sentence near the top.
  // Also prevents user from manually scrolling (FlatList has scrollEnabled={false} below).
  useEffect(() => {
    if (!flatListRef.current) return;
    if (activeIndex < 0) return;
    if (activeIndex >= sentences.length) return;

    // wait one frame so layout / measurements are ready
    requestAnimationFrame(() => {
      try {
        (flatListRef.current as any).scrollToIndex({
          index: activeIndex,
          animated: true,
          // 0   = top, 1 = bottom
          // keep active line ~5% from the top of the card so more of the next lines are visible and bottom text doesn't get hidden behind controls
          viewPosition: 0.03,
        });
      } catch (e) {
        // index may not be rendered yet; ignore safely
      }
    });
  }, [activeIndex, sentences.length]);

  const handlePlaybackComplete = () => {
    if (soundRef.current) {
      try {
        soundRef.current.stop();
        soundRef.current.setCurrentTime(0);
      } catch (e) {
        // ignore
      }
    }
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const snd = soundRef.current;
    if (!snd) return;

    if (isPlaying) {
      snd.pause();
      setIsPlaying(false);
      return;
    }

    // If we are at (or beyond) the end, restart from 0
    if (duration > 0 && currentTime >= duration - 0.2) {
      snd.stop(() => {
        snd.setCurrentTime(0);
        setCurrentTime(0);
        snd.play(() => {
          handlePlaybackComplete();
        });
        setIsPlaying(true);
      });
      return;
    }

    // Resume / start playback from current position
    snd.play(() => {
      handlePlaybackComplete();
    });
    setIsPlaying(true);
  };

  const handleRewind = () => {
    if (!soundRef.current) return;

    const newTime = Math.max(0, currentTime - 10);
    soundRef.current.setCurrentTime(newTime);
    setCurrentTime(newTime);
  };

  const handleFastForward = () => {
    if (!soundRef.current) return;

    const newTime = Math.min(duration, currentTime + 10);
    soundRef.current.setCurrentTime(newTime);
    setCurrentTime(newTime);
  };

  const handleRestart = () => {
    if (!soundRef.current) return;

    soundRef.current.stop();
    soundRef.current.setCurrentTime(0);
    setCurrentTime(0);

    if (isPlaying) {
      soundRef.current.play();
    }
  };

  const handleShare = async () => {
    try {
      const url = audioUrlRef.current;
      if (!url) {
        Alert.alert('Nothing to share', 'Audio URL is not available yet.');
        return;
      }

      await Share.share(
        {
          title: 'Check out this audio',
          message: `Listen to this audio:\n${url}`,
          url,
        },
        {
          dialogTitle: 'Share audio',
          subject: 'Audio link',
        },
      );
    } catch (e) {
      console.warn('Share error', e);
      Alert.alert('Share failed', 'Could not open the share dialog.');
    }
  };

  const handleSliderChange = (value: number) => {
    if (!soundRef.current) return;

    soundRef.current.setCurrentTime(value);
    setCurrentTime(value);
  };
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderLoadingOverlay = () => {
    if (!isFetching) return null;
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}
      >
        <ActivityIndicator size="large" color={colors.white} />
        <Space mB={16} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AppScreen
        ScrollViewProps={{ showsVerticalScrollIndicator: false }}
        backgroundColor={colors.black}
        // preset="fixed"
        style={{ paddingTop: insets.top + pixelSizeY(10), paddingHorizontal: pixelSizeX(20) }}
      >
        <TouchableOpacity
          style={{ paddingRight: pixelSizeX(12), width: normalizeWidth(50)  , paddingVertical:pixelSizeY(7)}}
          onPress={() => {
            navigation.goBack();
          }}>
          <SVG.ArrowLeft />
        </TouchableOpacity>
        <Space mB={20} />
        <AppText
          title={fileName || 'Audio'}
          fontSize={24}
          numberOfLines={2}
          fontWeight={500}
          color={'#F5F5F5'}
        />

        <Space mB={30} />

        <View style={{ height: normalizeHeight(440) }} >
          <LinearGradient
            colors={['#461D7A', '#8A2BE1']}
            style={[layout.bgColor('#8A2BE1'), layout.borderRadius(12), { maxHeight: normalizeHeight(440) }]}
          >
            <View style={[layout.padding(pixelSizeX(30))]} >
              <FlatList
                scrollEnabled={false}
                ref={flatListRef}
                data={sentences}
                keyExtractor={(_, i) => `line-${i}`}
                style={{ maxHeight: normalizeHeight(440) }}
                showsVerticalScrollIndicator={false}
                initialNumToRender={12}
                ListFooterComponent={() => {
                  return (
                    <View style={{ height: normalizeHeight(122) }} />
                  )
                }}
                getItemLayout={(data, index) => ({ length: 34, offset: 34 * index, index })}
                renderItem={({ item, index }) => {
                  const isActive = index === activeIndex;
                  return (
                    <View style={{ paddingVertical: 6 }}>
                      <Text
                        style={{
                          color: isActive ? colors.white : '#A9A9A9',
                          fontSize: isActive ? normalizeFont(16) : normalizeFont(14),
                          fontWeight: isActive ? ('700' as const) : ('400' as const),
                          opacity: isActive ? 1 : 0.4,
                        }}
                      >
                        {item.sentence}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </LinearGradient>
        </View>

        <Space mB={20} />


        <Space mB={40} />

        {/* Audio Controls */}
        <View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleRestart}>
              <AssetByVariant
                resizeMode="contain"
                path={'speed'}
                width={normalizeWidth(26)}
                height={normalizeHeight(26)}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={handleRewind}>
              <AssetByVariant
                resizeMode="contain"
                path={'time-backward-ten'}
                width={normalizeWidth(26)}
                height={normalizeHeight(26)}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              <AssetByVariant
                resizeMode="contain"
                path={isPlaying ? 'pause' : 'play1'}
                // path='pause'
                width={normalizeWidth(35)}
                height={normalizeHeight(35)}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={handleFastForward}>
              <AssetByVariant
                resizeMode="contain"
                path={'time-forward-ten'}
                width={normalizeWidth(26)}
                height={normalizeHeight(26)}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={handleShare}>
              <AssetByVariant
                resizeMode="contain"
                path={'share1'}
                width={normalizeWidth(24)}
                height={normalizeHeight(24)}
              />
            </TouchableOpacity>
          </View>

          <Space mB={35} />

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration > 0 ? duration : 1}
              value={currentTime}
              onValueChange={handleSliderChange}
              minimumTrackTintColor="#ffffff"
              maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
              thumbTintColor="#ffffff"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
        </View>
        <Space mB={70} />
      </AppScreen>
      {renderLoadingOverlay()}
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  controlButton: {
    width: normalizeWidth(49),
    height: normalizeHeight(49),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'pink'
  },
  playButton: {
    width: normalizeWidth(49),
    height: normalizeHeight(49),
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
  progressContainer: {
    // marginTop: 10,
    // backgroundColor:'coral'
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default AudioPlayerScreen;