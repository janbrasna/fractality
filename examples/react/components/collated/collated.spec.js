import { collated } from '@fractality/adapter-tests';

import fractal from '../../fractal.config.js';

describe('collated', () => {
    beforeEach(async () => {
        await fractal.load();
    });

    collated(fractal);
});
