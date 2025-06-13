"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("@/theme");
var sizes_1 = require("@/utils/sizes");
var AppText = react_1.memo(function (props) {
    var _a = props.alignSelf, alignSelf = _a === void 0 ? 'flex-start' : _a, _b = props.children, children = _b === void 0 ? react_1["default"].createElement(react_native_1.View, null) : _b, _c = props.color, color = _c === void 0 ? '' : _c, _d = props.extraStyle, extraStyle = _d === void 0 ? {} : _d, _e = props.fontFamily, fontFamily = _e === void 0 ? null : _e, _f = props.fontSize, fontSize = _f === void 0 ? 0 : _f, _g = props.gradient, gradient = _g === void 0 ? false : _g, _h = props.onPress, onPress = _h === void 0 ? function () { } : _h, _j = props.textAlign, textAlign = _j === void 0 ? 'left' : _j, theme = props.theme, title = props.title, _k = props.variant, variant = _k === void 0 ? '' : _k;
    var _l = theme_1.useTheme(), colors = _l.colors, layout = _l.layout;
    return (react_1["default"].createElement(react_native_1.Text, __assign({}, props, { onPress: onPress, style: [
            // TYPOGRAPHY[variant],
            // layout.fontSize(
            //   fontSize ? normalizeFont(fontSize) : TYPOGRAPHY[variant]?.fontSize,
            // ),
            // layout.fontFamily(
            //   fontFamily ? FONTS[fontFamily] : TYPOGRAPHY[variant]?.fontFamily,
            // ),
            layout.fontSize(fontSize && sizes_1.normalizeFont(fontSize)),
            layout.fontFamily(fontFamily),
            layout.alignSelf(alignSelf),
            layout.color(color || colors.primary),
            layout.textAlign(textAlign),
            extraStyle,
        ], suppressHighlighting: true }),
        title,
        children));
});
exports["default"] = AppText;
