module.exports = {
  extends: "universe/native",
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
        semi: "off",
      },
    },
  ],
};
