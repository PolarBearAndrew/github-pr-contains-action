import * as core from '@actions/core';
import { GitHub, context } from '@actions/github';

async function run() {
  try {
    // get information on everything
    const token = core.getInput('github-token', { required: true });
    const github = new GitHub(token, {});

    // Check if the body contains required string
    const bodyContains = core.getInput('bodyContains');

    if (!context?.payload?.pull_request?.body) {
      core.setFailed('`context.payload.pull_request.body is` empty');
      return;
    }

    if (context.payload.pull_request.body.indexOf(bodyContains) < 0) {
      core.setFailed('The body of the PR does not contain ' + bodyContains);
      return;
    }

    const bodyDoesNotContain = core.getInput('bodyDoesNotContain');
    if (
      bodyDoesNotContain &&
      context.payload.pull_request.body.indexOf(bodyDoesNotContain) >= 0
    ) {
      core.setFailed(
        'The body of the PR should not contain ' + bodyDoesNotContain
      );
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
