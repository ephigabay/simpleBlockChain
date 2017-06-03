import CryptoJS from "crypto-js";
import "express";
import "body-parser";
import "ws";

import { Worker } from 'webworker-threads';

const HTTP_PORT = 3001;
const WS_PORT = 6001;

const CHAIN_COMPLEXITY = 2;

const GENESIS_BLOCK = new Block(0,
                                 "0",
                                 0, "Best blockchain ever!", 
                                 "4d204000127268ec59feba5a3c7cb8d5bd18fa8a5b628633276765883f1a2055");

class Block {

    miningPromise = null;

    constructor(index, previousHash, timestamp, data, hash = null, nonce = null) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.nonce = nonce;
    }

    static calculateHash(block) {
        return CryptoJS.SHA256(block.index + 
                               block.previousHash + 
                               block.timestamp + 
                               block.data + 
                               block.nonce).toString();
    }

    static validateHash(hash, complexity) {
        return hash.startsWith('0' * complexity);
    } 

    mine(complexity) {
        if(!this.miningPromise) {
            this.miningPromise = new Promise(resolve => {
                
                while(1) {

                }
                
                worker.onmessage = function(event) {
                    resolve(event.data);
                };

                worker.postMessage('ali');
            });
        }

        return miningPromise;

    }
}

class BlockChain {

    blockchain = [GENESIS_BLOCK];


    constructor() {

    }
}

