const Miner = require('./miner');
const CryptoJS = require("crypto-js");

module.exports = class Block {

    constructor(data, previousHash = null, timestamp = null, hash = null, nonce = null) {
        this.previousHash = previousHash;
        this.timestamp = timestamp || Math.floor(Date.now() / 1000);
        this.data = data;
        this.hash = hash;
        this.nonce = nonce;
    }

    static parse(json) {
        return new Block(json.data, json.previousHash, json.timestamp, json.hash, json.nonce);
    }

    toJson() {
        return {
            previousHash: this.previousHash,
            timestamp: this.timestamp,
            data: this.data,
            hash: this.hash,
            nonce: this.nonce            
        }
    }

    calculateHash(nonce) {
        nonce = nonce || this.nonce;
        return CryptoJS.SHA256(this.previousHash + 
                               this.timestamp + 
                               this.data + 
                               nonce).toString();
    }

    static validateHash(hash, complexity) {
        return hash.startsWith(Array(complexity).fill('0').join(''));
    } 

    mine(complexity) {
        if(!this.miningPromise) {
            this.miningPromise = Miner.mine(this, complexity).then(data => {
                this.nonce = data.nonce;
                this.hash = data.hash;
                return this;
            });
        }

        return this.miningPromise;

    }
}