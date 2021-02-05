// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract CloverOsProject {
    address public admin;

    event NewProject(address indexed owner, Project info);
    event UpdateProject(address indexed controller, Project info);
    event ProjectStatusChanged(address indexed  controller, Project info) ;

    constructor() {
        admin = msg.sender;
    }

    modifier ensureExist(uint256 _id){
        require(
             projects[_id].owner != address(0),
            "Clover OS: project not eixst"
        );
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Clover OS: not admin");
        _;
    }

    modifier onlyOwner(uint256 _id) {
        require(
             projects[_id].owner == msg.sender,
            "Clover OS: permission deny of owner"
        );
        _;
    }

    modifier onlyAdminOrOwner(uint256 _id) {
        require(
            msg.sender == admin || projects[_id].owner == msg.sender,
            "Clover OS: permission deny of admin or owner"
        );
        _;
    }

    enum ProjectStatus {OPENING, CLOSED, ADMIN_CLOSED }

    struct Project {
        string name;
        string desc; // ipfs hash, can be update
        string source; // ipfs hash, can be update
        string icon; // ipfs hash, can be update
        uint256 version; //auto update when update project content
        bytes32 uuid; // uinique for this project
        uint256 id; // the order of this project of add
        address owner;
        ProjectStatus status;
        uint256 createTime;
        uint256 updateTime;
    }
    // TODO
    address[] public developers;
    Project[] public projects;
    mapping(address => bool) public isDevelover;
    uint256 public latestUpdateTime = block.timestamp;

    function addProject(
        string calldata _name,
        string calldata _desc,
        string calldata _source,
        string calldata _icon
    ) external {
        uint256 id = projects.length;
        bytes32 uuid = keccak256(
            abi.encodePacked(_name, _desc, _source, _icon, id)
        );
        projects.push(
            Project(
                _name,
                _desc,
                _source,
                _icon,
                1,
                uuid,
                id,
                msg.sender,
                ProjectStatus.OPENING,
                block.timestamp,
                block.timestamp
            )
        );
        latestUpdateTime = block.timestamp;
        emit NewProject(msg.sender, projects[id]);
    }

    function updateProjectStatusByAdmin(uint256 _id, ProjectStatus _status) ensureExist(_id) onlyAdmin external {
         require(projects[_id].status != _status,"Clover OS: status not been changed");
         projects[_id].status = _status;
         projects[_id].updateTime =  block.timestamp;
         latestUpdateTime = block.timestamp;
         emit ProjectStatusChanged(msg.sender,  projects[_id]);
    }

    function updateProjectStatusByOwner(uint256 _id, ProjectStatus _status) onlyOwner(_id) external {
         require(projects[_id].status != ProjectStatus.ADMIN_CLOSED,"Clover OS: project have been closed by admin");
         require(projects[_id].status != _status,"Clover OS: status not been changed");
         projects[_id].status = _status;
         projects[_id].updateTime =  block.timestamp;
         latestUpdateTime = block.timestamp;
         emit ProjectStatusChanged(msg.sender, projects[_id]);
    }

    function updateProject(
        uint256 _id,
        string calldata _name,
        string calldata _desc,
        string calldata _source,
        string calldata _icon
    ) external onlyAdminOrOwner(_id) {
        require( projects[_id].status != ProjectStatus.ADMIN_CLOSED,"Clover OS: project have been closed");
        projects[_id].name = _name;
        projects[_id].desc = _desc;
        projects[_id].source = _source;
        projects[_id].icon = _icon;
        projects[_id].version = projects[_id].version + 1;
        projects[_id].updateTime =  block.timestamp;
        latestUpdateTime = block.timestamp;
        emit UpdateProject(msg.sender, projects[_id]);
    }

    function getProjects(uint256 _start, uint256 _end)
        external
        view
        returns (Project[] memory pjs)
    {
        uint256 end = _end > projects.length ? projects.length : _end;
        pjs = new Project[](end - _start);
        for (uint256 i = _start; i < end; i++) {
            pjs[i - _start] = projects[i];
        }
    }
}