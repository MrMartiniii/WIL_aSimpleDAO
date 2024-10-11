import { Clarinet, Tx, Chain, Account, types } from "clarinet";
import { assert } from "chai";

describe('Smart Contract Tests', () => {
  it('should only allow the owner to start the contract', () => {
    let chain = new Chain();
    let deployer = chain.accounts.get("deployer");
    let notOwner = chain.accounts.get("wallet_1");

    let block = chain.mineBlock([
      Tx.contractCall(
        "your-contract-name", // Replace with your contract's name
        "start",              // Replace with the name of the function you're testing
        [types.list([types.principal(deployer.address)]), types.uint(1)],
        notOwner.address      // Call from a non-owner account to test failure
      )
    ]);

    block.receipts[0].result.expectErr().expectUint(100); // Expecting an error with code 100
  });
});
