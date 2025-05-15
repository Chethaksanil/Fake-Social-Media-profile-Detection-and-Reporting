// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DetectionRecord {
    struct Record {
        string username;
        string result;
    }

    Record[] public records;

    function addRecord(string memory username, string memory result) public {
        records.push(Record(username, result));
    }

    function getRecords() public view returns (Record[] memory) {
        return records;
    }
}
