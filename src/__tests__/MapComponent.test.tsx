import React from 'react';
import { shallow, render } from 'enzyme';
import MapComponent from '../components/MapComponent';
import { authHelper } from '../utils/Helpers';

describe('MapComponent', () => {
    it("handles invalid auth", async () => {
        const res = await authHelper('http://localhost:8080', '//')
        expect(res).toBeTruthy();
    });
});
