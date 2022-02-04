import { Octokit } from "@octokit/core";

const getRepositoryCommits = async function (owner, repo) {
    const octokit = new Octokit();
    let resultArray = [];
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: owner,
            repo: repo
        });
        if (response.data) {
            resultArray = response.data.map(item => ({
                hash: item.sha,
                author: item.author.login,
                message: item.commit.message
            }));
        }
    } catch (fetchError) {
        console.error(fetchError);
    }
    return resultArray;
};

export default getRepositoryCommits;