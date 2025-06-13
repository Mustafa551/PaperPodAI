/* eslint-disable perfectionist/sort-objects */
import type { DimensionValue, TextStyle, ViewStyle } from 'react-native';

import { unknown } from 'zod';

export default {
  /* Flexbox */
  col: { flexDirection: 'column' },
  colReverse: { flexDirection: 'column-reverse' },
  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  wrap: { flexWrap: 'wrap' },
  flex: (flex: number) => ({ flex }),

  /* Alignment */
  itemsCenter: { alignItems: 'center' },
  itemsEnd: { alignItems: 'flex-end' },
  itemsStart: { alignItems: 'flex-start' },
  itemsStretch: { alignItems: 'stretch' },
  selfCenter: { alignSelf: 'center' },
  selfLeft: { alignSelf: 'flex-start' },
  selfRight: { alignSelf: 'flex-end' },

  /* Justify Content */
  justifyAround: { justifyContent: 'space-around' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyEvenly: { justifyContent: 'space-evenly' },
  justifyStart: { justifyContent: 'flex-start' },

  /* Sizes Layouts */
  flex1: { flex: 1 },
  flex_1: { flex: 1 },
  flexGrow: (flexGrow: number) => ({ flexGrow }),
  fullWidth: { width: '100%' },
  fullHeight: { height: '100%' },
  width: (width: any = '0%') => ({ width }),
  height: (height: DimensionValue) => ({ height }),
  maxHeight: (maxHeight: number) => ({ maxHeight }),
  minHeight: (minHeight: number) => ({ minHeight }),
  widthHeight: (width = 0, height = 0) => ({ width, height }),

  /* Positions */
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  right0: { right: 0 },
  top0: { top: 0 },
  bottom: (bottom: number) => ({ bottom }),
  left: (left: number) => ({ left }),
  right: (right: number) => ({ right }),
  top: (top: number) => ({ top }),
  z1: { zIndex: 1 },
  z10: { zIndex: 10 },
  zIndex: (zIndex: number) => ({ zIndex }),

  /* Border */
  borderWidth: (borderWidth: number) => ({ borderWidth }),
  borderColor: (borderColor: string) => ({ borderColor }),
  bgColor: (backgroundColor: string) => ({ backgroundColor }),
  borderRadius: (borderRadius: number) => ({ borderRadius }),
  borderBottomLeftRadius: (borderBottomLeftRadius: number) => ({
    borderBottomLeftRadius,
  }),
  borderBottomRightRadius: (borderBottomRightRadius: number) => ({
    borderBottomRightRadius,
  }),
  borderTopLeftRadius: (borderTopLeftRadius: number) => ({
    borderTopLeftRadius,
  }),
  borderTopRightRadius: (borderTopRightRadius: number) => ({
    borderTopRightRadius,
  }),

  /* Padding & Margin */
  padding: (padding: number) => ({ padding }),
  pH: (paddingHorizontal: number) => ({ paddingHorizontal }),
  pV: (paddingVertical: number) => ({ paddingVertical }),
  pT: (paddingTop: number) => ({ paddingTop }),
  pB: (paddingBottom: number) => ({ paddingBottom }),
  pL: (paddingLeft: number) => ({ paddingLeft }),
  pR: (paddingRight: number) => ({ paddingRight }),
  margin: (margin: number) => ({ margin }),
  mH: (marginHorizontal: number) => ({ marginHorizontal }),
  mV: (marginVertical: number) => ({ marginVertical }),
  mT: (marginTop: number) => ({ marginTop }),
  mB: (marginBottom: number) => ({ marginBottom }),
  mL: (marginLeft: number) => ({ marginLeft }),
  mR: (marginRight: number) => ({ marginRight }),

  /* Typography */
  color: (color: string) => ({ color }),
  fontSize: (fontSize: number) => ({ fontSize }),
  fontFamily: (fontFamily: string) => ({ fontFamily }),
  fontWeight: (fontWeight: TextStyle['fontWeight']) => ({ fontWeight }),
  fontStyle: (fontStyle: TextStyle['fontStyle']): TextStyle => ({ fontStyle }),
  lineHeight: (lineHeight: number): TextStyle => ({ lineHeight }),
  textAlign: (textAlign: TextStyle['textAlign']): TextStyle => ({ textAlign }),
  textDecorationLine: (
    textDecorationLine: TextStyle['textDecorationLine'],
  ): TextStyle => ({ textDecorationLine }),
  textTransform: (textTransform: TextStyle['textTransform']): TextStyle => ({
    textTransform,
  }),

  /* Miscellaneous */
  opacity: (opacity: number) => ({ opacity }),
  display: (display: ViewStyle['display']) => ({ display }),
  hitSlop: { bottom: 15, left: 15, right: 15, top: 15 },

  /* Shadows */
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalShadow: {
    elevation: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
  },

  /* Custom Row Center Between */
  rowCenterBt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignSelf: (alignSelf: ViewStyle['alignSelf']) => ({ alignSelf }),
} as const satisfies Record<
  string,
  ((value: never) => object) | TextStyle | ViewStyle
>;
