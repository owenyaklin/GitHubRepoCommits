import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import App from './App';

const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;

describe('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});

describe('Title', () => {
    it('Text within View', () => {
        const appRenderer = renderer.create(<App />);
        const appInstance = appRenderer.root;

        const textInstance = appInstance.findByType(Text);
        expect(textInstance.props.children).toEqual(['Most recent commits for ', githubOwner, '/', githubRepo]);
    });
});