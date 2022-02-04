import getRepositoryCommits from './github';

const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;

describe('Test Request', () => {
    it('returns array', async () => {
        let commits = await getRepositoryCommits(githubOwner, githubRepo);
        expect(Array.isArray(commits)).toBe(true);
    });
});