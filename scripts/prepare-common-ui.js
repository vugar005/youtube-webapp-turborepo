const { rimrafPromise, execPromise } = require('./utils');
const fs = require('fs-extra');
const minimist = require('minimist');

const uiDir = 'common-ui';
const apps = ['shell', 'watch-app', 'likes-app', 'history-app'];

const isFastMode = minimist(process.argv).fastMode;
async function  buildAndCopy() {
    console.log('Building Common UI ...');
    await rimrafPromise(`${uiDir}/dist`);
    execPromise(`cd ${uiDir} && ng build ui`);
    await copyToApps();
}

async function copyToApps() {
    for (const appKey in apps) {
        const appName = apps[appKey];
        await rimrafPromise(`${appName}/dist`);
        if (!isFastMode) {
            await rimrafPromise(`${appName}/.angular`);
        }
        try {
            await fs.copySync(`./${uiDir}/dist`, `${appName}/node_modules`, { overwrite: true });
            console.log(`Copied common-ui to ${appName}.`)
        } catch (er) {
            console.log(`er`);
        }
    }
}

buildAndCopy();