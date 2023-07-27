const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {ethers} = require("hardhat");

describe("BuyCoffee", ()=> {
     async function deployFunctionFixture()  {
        const [owner, address1, address2] = await ethers.getSigners();
        const amountToSend = ethers.parseEther("0.1");      
        const BuyCoffee = await ethers.getContractFactory("BuyCoffee");
        const buyCoffee = await BuyCoffee.deploy(owner);
        return { owner,address1, buyCoffee};
    }
    it(" should Check the Contract", async () =>  {
        const amountToSend = ethers.parseEther("0.1");        
        const d = new Date();

        const { owner, address1, buyCoffee} = await loadFixture(deployFunctionFixture);
        const tx = await buyCoffee.transactions("Aniket", "hello i am using",{
            value : amountToSend
        });
        expect(tx).to.emit(buyCoffee, "showMessage").withArgs(
            address1.address,
            d,
            "aniket",
            "i should testing this contract right now lets see"
            );
        const name = await buyCoffee.person(0);
        // console.log(`${name.name}  ${name.message}`);
        expect(name.name).to.equal("Aniket");
        expect(name.messsage).to.equal("hello i am using");
    });

    it("Should test the withdraw function", async () => {
        const [buyCoffee, owner, address1] = await loadFixture(deployFunctionFixture);

        expect(buyCoffee.connect(address1).withdraw()).to.be.revertedWith("only owner can withdraw the transaction");
    })
});

