import { path } from '@fractality/adapter-tests';

import fractal from '../../fractal.config.js';

describe('path', () => {
    beforeEach(async () => {
        await fractal.load();
    });

    path(fractal);
});
