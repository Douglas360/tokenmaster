// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenMaster is ERC721 {
    address public owner;
    uint256 public totalOccasion;
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) public occasions;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(occasions[_id].tickets > 0, "No tickets available");
        require(
            occasions[_id].tickets >= _seat,
            "Not enough tickets available"
        );
        require(msg.value >= occasions[_id].cost, "Insufficient funds");
        require(seatTaken[_id][_seat] == address(0), "Seat already taken");
        require(_seat <= occasions[_id].maxTickets, "Seat does not exist");

        occasions[_id].tickets -= _seat; // Update tickets count

        hasBought[_id][msg.sender] = true; // Mark user as having bought a ticket

        seatTaken[_id][_seat] = msg.sender; // Assign seat to user

        seatsTaken[_id].push(_seat); // Add seat to list of taken seats

        totalSupply++;

        _safeMint(msg.sender, totalSupply);
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasion++;

        occasions[totalOccasion] = Occasion(
            totalOccasion,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    function getOccasion(
        uint256 _id
    ) public view returns (Occasion memory occasion) {
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }
}
