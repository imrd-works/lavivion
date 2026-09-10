/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "style",
        "docs",
        "test",
        "chore",
        "build",
        "ci",
        "perf",
        "revert",
      ],
    ],
  },
};
