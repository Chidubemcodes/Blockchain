const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(timestamp, data) {
    this.index = 0;
    this.nonce = this.index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = 0;
    this.hash = this.calculateHash();
  }

  // hashes all the block data
  calculateHash() {
    return SHA256(
      this.index + this.previousHash + this.timestamp + this.data + this.nonce
    ).toString();
  }
  mineBlock(difficulty) {}
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()];
  }

  // creates the genesis block
  createGenesis() {
    return new Block(0, "11/10/2022", "Genesis block", "0");
  }

  // this gets the latest block
  latestBlock() {
    this.index = this.chain.length;
    return this.chain[this.index - 1];
  }

  // this adds new blocks to the blockchain
  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  // this check if the block hash are valid
  checkValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
let value = "thidfdjfks"; // you can change this

const d = new Date();
let time = d.getTime();

let jsChain = new Blockchain();
const validator = jsChain.checkValid(); //bool
jsChain.addBlock(new Block(time, value));

console.log(JSON.stringify(jsChain, null, 4));
console.log(`is block valid? ${validator}`);
