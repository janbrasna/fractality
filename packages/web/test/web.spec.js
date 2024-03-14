import { create } from '../../fractality/src/fractal';

import Web from '../src/web';

describe('Web', () => {
    let web;

    beforeEach(() => {
        web = new Web(create());
    });

    it('is an event emitter', () => {
        expect(web.hasMixedIn('Emitter')).toBe(true);
    });
    it('is configurable', () => {
        expect(web.hasMixedIn('Configurable')).toBe(true);
    });

    describe('.serve()', () => {
        it.todo('starts a web server');
    });

    describe('.build()', () => {
        it.todo('starts the static build process');
    });

    describe('.theme()', () => {
        it.todo('adds a theme');
    });
});
