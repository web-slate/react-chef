# React Chef

Transparent React Boilerplate Apps

[![semantic-release](https://img.shields.io)](https://github.com)

This project uses fully automated versioning and release management via **[semantic-release](https://github.com)**. We do not manually update the `package.json` version number. The version is determined entirely by the commit messages in the repository's history.

## 📦 How Releases Work

When changes are merged into the `main` branch, a GitHub Action runs `semantic-release`. This tool analyzes all commit messages since the last release to determine the next version number (patch, minor, or major).

*   A **Patch** release (e.g., `0.2.0` to `0.2.1`) occurs for `fix:` commits.
*   A **Minor** release (e.g., `0.2.0` to `0.3.0`) occurs for `feat:` commits.
*   A **Major** release (e.g., `0.2.0` to `1.0.0`) occurs for commits containing `BREAKING CHANGE:` in the body or footer, or a `!` in the header (e.g., `feat!: update API to v2`).

The pipeline will automatically:
1.  Calculate the new version number.
2.  Generate a `CHANGELOG.md` file.
3.  Create a Git tag and GitHub release.
4.  Publish the new package version to the npm registry.

## 🧑‍💻 Contributing: Commit Message Guidelines

Because releases are automated, it is crucial that all developers follow the [Conventional Commits specification](https://www.conventionalcommits.org) when making commits or merging pull requests.

### Format

Commit messages should follow this structure:

