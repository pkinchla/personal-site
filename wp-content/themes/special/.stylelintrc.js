module.exports = {
  plugins: ["stylelint-order"],
  extends: "stylelint-config-standard",
  rules: {
    "color-no-invalid-hex": true,
    "max-empty-lines": 2,
    "unit-allowed-list": ["em", "rem", "%", "s"],
    "order/properties-alphabetical-order": true,
  },
};
