# Checking PRs for words and other things

Based on the [actions template](https://github.com/actions/javascript-template), we'll try to create a new action. This new action will check for the presence of a word in the body or diff in a PR. It uses the GitHub API, so you'll need to provide a token. Don't worry, that's built-in.

# Using this action

You would need to add this in a file in `.github/workflows`

```
name: "Check PR for word"
on: [pull_request]

jobs:
  check_pr:
    runs-on: ubuntu-latest
    steps:
    - name: Check PR
      uses: JJ/github-pr-contains-action@releases/v0
      with:
        github-token: ${{github.token}}
        bodyDoesNotContain: "Delete this"
        bodyContains: 'Test'
```
## License

This is a modification of the original template, and is released under
the MIT license.
