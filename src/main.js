"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get information on everything
            const token = core.getInput('github-token', { required: true });
            const github = new GitHub(token, {});
            // Check if the body contains required string
            const bodyContains = core.getInput('bodyContains');
            if (!context ||
                !context.payload ||
                !context.payload.pull_request ||
                !context.payload.pull_request.body) {
                core.setFailed('`context.payload.pull_request.body is` empty');
                return;
            }
            if (context.payload.pull_request.body.indexOf(bodyContains) < 0) {
                core.setFailed('The body of the PR does not contain ' + bodyContains);
                return;
            }
            const bodyDoesNotContain = core.getInput('bodyDoesNotContain');
            if (bodyDoesNotContain &&
                context.payload.pull_request.body.indexOf(bodyDoesNotContain) >= 0) {
                core.setFailed('The body of the PR should not contain ' + bodyDoesNotContain);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
