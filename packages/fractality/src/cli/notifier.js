'use strict';

import chalk from 'chalk';

class Notifier {
    constructor(console, interactive) {
        this._console = console;
        this._interactive = interactive;
    }

    updateAvailable(details) {
        this._console.br();
        this._console
            .box(
                null,
                `Fractality update available! ${chalk.dim(details.current)} → ${chalk.green(details.latest)}
Run ${chalk.cyan('npm i -g ' + details.name)} to update.`,
            )
            .unslog();
        this._console.br();
    }

    versionMismatch(details) {
        this._console.log(`Fractality version mismatch! Global: ${details.cli} / Local: ${details.local}`);
    }
}

export default Notifier;
