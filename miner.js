const Worker = require('workerjs');
const Block = require('./block.js');

class Miner {

    static mine(block, complexity) {
        const worker = new Worker(__dirname + '/mine-logic.js', true);

        return new Promise((resolve, reject) => {
            worker.addEventListener('message', function (msg) {
                resolve(msg.data);
            });
            worker.postMessage({jsonBlock: block.toJson(), complexity});
        });
    }
}

module.exports = Miner;