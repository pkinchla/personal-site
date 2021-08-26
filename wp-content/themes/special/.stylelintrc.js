module.exports = {
  plugins: ["stylelint-order"],
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "color-no-invalid-hex": true,
    "max-empty-lines": 2,
    "unit-allowed-list": ["em", "rem", "%", "vh", "vw", "ms", "s"],
    "order/properties-alphabetical-order": true,
  },
};
