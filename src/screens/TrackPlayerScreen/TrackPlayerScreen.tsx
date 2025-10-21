
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { AppScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '@/utils/sizes';
import { AppText, AssetByVariant, Space } from '@/components/atoms';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SVG } from '@/theme/assets/icons';

// Enable playback in silence mode
Sound.setCategory('Playback');

const AudioPlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { colors, layout } = useTheme();
  
  // Sound reference
  const soundRef = useRef<Sound | null>(null);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sound on component mount
  useEffect(() => {
    // Sample audio URL - replace with your actual audio file
    const sampleAudio = new Sound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      
      // Sound loaded successfully
      soundRef.current = sampleAudio;
      setDuration(sampleAudio.getDuration());
      console.log('Sound loaded successfully');
    });

    // Cleanup on unmount
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    };
  }, []);

  // Update progress timer
  useEffect(() => {
    if (isPlaying) {
      playbackTimerRef.current = setInterval(() => {
        if (soundRef.current) {
          soundRef.current.getCurrentTime((seconds) => {
            setCurrentTime(seconds);
            if (seconds >= duration) {
              handlePlaybackComplete();
            }
          });
        }
      }, 1000);
    } else if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
    }

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    };
  }, [isPlaying, duration]);

  const handlePlaybackComplete = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play((success) => {
        if (!success) {
          console.log('Playback failed');
        }
      });
    }
    setIsPlaying(!isPlaying);
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

  const handleShare = () => {
    console.log('Share pressed');
  };

  const handleSliderChange = (value: number) => {
    if (!soundRef.current) return;
    
    soundRef.current.setCurrentTime(value);
    setCurrentTime(value);
  };
const navigation = useNavigation();
  return (
    <AppScreen
      ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      backgroundColor={colors.black}
      preset="scroll"
          style={{ paddingTop: useSafeAreaInsets().top + pixelSizeY(10) , paddingHorizontal: pixelSizeX(20) }}
    >  
    <TouchableOpacity 
    style={{  paddingRight:pixelSizeX(12), width: normalizeWidth(50) }}
    onPress={() => {
      navigation.goBack();
    }}>
       <SVG.ArrowLeft/>
        </TouchableOpacity>
      <Space mB={20} />
      <AppText
        title={"AI In Healthcare:"}
        fontSize={24}
        fontWeight={500}
        color={"#F5F5F5"}
      />
      <AppText
        title={"Breakthroughs In 2025"}
        fontSize={24}
        fontWeight={500}
        color={"#F5F5F5"}
      />

      <Space mB={30} />

      <ScrollView showsVerticalScrollIndicator={false}>
            <LinearGradient
                      colors={['#461D7A', '#8A2BE1']}
                      style={[layout.bgColor('#8A2BE1'), layout.borderRadius(12)]}
                      >
          <View style={[layout.padding(pixelSizeX(30))]} >              
          <AppText
            title={"Hey there!"}
            fontSize={16} 
            fontWeight={500}
            color={colors.white}
            extraStyle={{ lineHeight: 22.5 }}
          />
          <AppText
            title={"Welcome to ResearchPod, where we bring complex science to life—one voice at a time."}
            fontSize={16} 
            fontWeight={500}
            color={colors.white}
            extraStyle={{ lineHeight: 22.5 }}
          />
          <Space mB={15} />
         
          <AppText
            title={"This week's paper explores how artificial intelligence is transforming healthcare. We'll dive into predictive diagnostics, AI-assisted surgeries, and the role of data in personalized treatment."}
            fontSize={16} 
            fontWeight={500}
            color={'#A9A9A9'}
            extraStyle={{ lineHeight: 22.5 }}
          />
          <Space mB={15} />
            
          <AppText
            title={"Authored by Dr. Emily Rao and Prof. John Martinez, this research outlines real-world AI applications being tested in hospitals today."}
            fontSize={16} 
            fontWeight={500}
            color={'#A9A9A9'}
            extraStyle={{ lineHeight: 22.5 }}
          />
          <Space mB={15} />
            
          <AppText
            title={"From detecting early-stage cancers to..."}
            fontSize={16} 
            fontWeight={500}
            color={'#A9A9A9'}
            extraStyle={{ lineHeight: 22.5 }}
          />
        </View>
                </LinearGradient>
      </ScrollView>

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
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  controlButton: {
    width:normalizeWidth(49),
    height:normalizeHeight(49),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'pink'
  },
  playButton: {
    width:normalizeWidth(49),
    height:normalizeHeight(49),
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