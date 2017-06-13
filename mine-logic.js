const Block = require('./block.js');

self.onmessage = function (request) {
  const { jsonBlock, complexity } = request.data;
  const block = Block.parse(jsonBlock);
  while(1) {
        const possibleNonce = Math.random().toString(36).substring(5);
        const hash = block.calculateHash(possibleNonce);
        if(Block.validateHash(hash, complexity)) {
            postMessage({hash, nonce: possibleNonce});
            break;
        }
    }
};