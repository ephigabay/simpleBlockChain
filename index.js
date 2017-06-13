const CryptoJS = require("crypto-js");
const express = require("express");
const bodyParser = require("body-parser");
const webSockets = require("ws");

const Block = require("./block");
const BlockChain = require('./blockchain');

const HTTP_PORT = 3001;
const WS_PORT = 6001;

const CHAIN_COMPLEXITY = 4;

const genesisBlock = new Block("Best blockchain ever!",
                                 "0",
                                 1,
                                 "4d204000127268ec59feba5a3c7cb8d5bd18fa8a5b628633276765883f1a2055");

const blockchain = new BlockChain(genesisBlock, CHAIN_COMPLEXITY); 

console.log("Initial blockchain:");
console.dir(blockchain.chain);

console.log('\n\nMining...')
blockchain.addUnminedBlock(new Block("Ephi is the awesome")).then(() => {
    console.log('\n\nFinished mining');
    console.log('New blockchain:');
    console.dir(blockchain.chain);
});