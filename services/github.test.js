import getRepositoryCommits from './github';

const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;

describe('Test Request', () => {
    it('returns array', async () => {
        let commits = await getRepositoryCommits(githubOwner, githubRepo);
        expect(Array.isArray(commits)).toBe(true);
    });
    it('pagination', async () => {
        let commits = await getRepositoryCommits(githubOwner, githubRepo);
        if (commits.length > 1) {
            let commits2 = await getRepositoryCommits(githubOwner, githubRepo, 1, 1);
            expect(commits2.length).toBe(1);
            expect(commits2[0].hash).toBe(commits[0].hash);
            let commits3 = await getRepositoryCommits(githubOwner, githubRepo, 1, 2);
            expect(commits3.length).toBe(1);
            expect(commits3[0].hash).toBe(commits[1].hash);
        }
    });
});