from web3 import Web3
import json

w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))  # Ganache RPC URL
with open('backend/blockchain/contract.sol', 'r') as file:
    contract_code = file.read()

compiled_contract = w3.eth.contract(abi=[], bytecode="")  # Use Solidity compiler to get ABI & Bytecode
contract = w3.eth.contract(bytecode=compiled_contract.bytecode, abi=compiled_contract.abi)
tx_hash = contract.constructor().transact({'from': w3.eth.accounts[0]})
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

print("Contract Deployed at:", tx_receipt.contractAddress)
