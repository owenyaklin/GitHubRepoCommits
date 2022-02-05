import { Octokit } from "@octokit/core";
import _ from 'lodash';

const getRepositoryCommits = async function (owner, repo, pageSize = -1, pageNumber = -1) {
    const octokit = new Octokit();
    let resultArray = [];
    let pageString = '';
    // Add pagination params if requested
    if (pageSize !== -1) {
        pageString = `?per_page=${pageSize}`;
        if (pageNumber !== -1) {
            pageString = `${pageString}&page=${pageNumber}`
        }
    }
    try {
        // Make call to GitHub API
        const response = await octokit.request(`GET /repos/{owner}/{repo}/commits${pageString}`, {
            owner: owner,
            repo: repo
        });
        // Map response into object that can be used by Views
        if (response.data) {
            resultArray = response.data.map(item => ({
                hash: _.get(item, 'sha', ''),
                author: _.get(item, 'author.login', ''),
                message: _.get(item, 'commit.message', '')
            }));
        }
    } catch (fetchError) {
        console.error(fetchError);
    }
    return resultArray;
};

export default getRepositoryCommits;