# Donation Smart Contract to Crypton

This contract can recieve donations from other addresses and storing whole list of unique addresses and total sum of their donations\n
After that owner of the contract, which is the address deploys exact contract, can withdraw certain amount of available tokens to any address

## Functions
```shell
donate(amount) make donation with certain amount
getDonators() returns unique list of donator addresses
getAmount(address) returns total amount of donations of exact address
withdraw(address, amount) send certain amount of tokens from contract balance to provided address, this function can be called just by the owner of contract
'''

## HardHat Custom Tasks and Deploying command


```shell
node scripts/deploy.js --network rinkeby
npx hardhat donate --amount 100
npx hardhat donators
npx hardhat total-amount --address 0x5FbDB2315678afecb367f032d93F642f64180aa3
npx hardhat withdraw --address 0x5FbDB2315678afecb367f032d93F642f64180aa3 --amount 100
```
## Summary
It was amazing experience to write and deploy my first smart contract
At first I was developing in Remix IDE and tested all features manually there,and they worked.
But I cannot test on my local space with tasks, and couldnt figure out why, googling and asking for help on discord makes no sense
It's little bit strange because same functionality working on unit testing 'almost' perfectly
'almost' because I cant set donation amount more than zero, but in Remix IDE I was able to
