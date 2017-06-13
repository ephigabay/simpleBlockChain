const Block = require('./block');

module.exports = class BlockChain {
    constructor(genesisBlock, chainComplexity) {
        this.chainComplexity = chainComplexity;
        this.chain = [genesisBlock];
    }

    addUnminedBlock(block) {
        block.previousHash = [...this.chain].pop().hash;
        return block.mine(this.chainComplexity).then(minedBlock => {
            this.chain.push(block);
        });
    }
 validateBlockAtPosition(position) {
        const block = this.chain[position];
        if(block.previousHash !== this.chain[position - 1]) {
            return false;
        }
        if(block.hash != Block.calculateHash(block)) {
            return false;
        }
        return true;
    }
}