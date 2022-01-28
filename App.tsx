import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {
  Canvas,
  Paint,
  LinearGradient,
  vec,
  Path,
  Skia,
  Shader,
  useTimestamp,
} from '@shopify/react-native-skia';

const CANVAS_SIZE = 256;

const source = Skia.RuntimeEffect.Make(`
uniform float progress;

vec4 main(vec2 pos) {
  vec2 normalized = pos / vec2(${CANVAS_SIZE});
  vec3 col = 0.5 + 0.5 * cos(progress + normalized.xyx + vec3(0, 2, 4));
  return vec4(col, 1);
}`)!;

const App = () => {
  const progress = useTimestamp();

  return (
    <SafeAreaView style={styles.view}>
      <StatusBar barStyle="light-content" />
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          <Paint>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(CANVAS_SIZE, CANVAS_SIZE)}
              colors={['blue', 'yellow']}
            />
          </Paint>
          <Path path="m93.087 133.353 39.027-58.26c3.52-5.255 11.717-2.764 11.717 3.562v39.289l18.287-5.2c5.767-1.64 10.42 4.838 7.026 9.78l-40.454 58.883c-3.56 5.181-11.676 2.662-11.676-3.624v-39.725l-16.785 4.992c-5.747 1.709-10.479-4.714-7.142-9.696z" />
        </Canvas>
      </View>
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          <Paint>
            <Shader
              source={source}
              uniforms={() => ({progress: progress.value / 2000})}
            />
          </Paint>
          <Path path="m93.087 133.353 39.027-58.26c3.52-5.255 11.717-2.764 11.717 3.562v39.289l18.287-5.2c5.767-1.64 10.42 4.838 7.026 9.78l-40.454 58.883c-3.56 5.181-11.676 2.662-11.676-3.624v-39.725l-16.785 4.992c-5.747 1.709-10.479-4.714-7.142-9.696z" />
        </Canvas>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  canvasContainer: {
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 1,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  canvas: {
    flex: 1,
  },
});

export default App;
