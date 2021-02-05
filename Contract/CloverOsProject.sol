// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract CloverOsProject {
    address public admin;

    event AddProject(address indexed owner, Project info);
    event UpdateProject(address indexed controller, Project info);
    event RemovedProject(address indexed controller, Project info);
    event ProjectStatusChanged(address indexed controller, Project info);
    enum ProjectStatus {OPENING, CLOSED, ADMIN_CLOSED}

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
    uint256 public latestUpdateTime = block.timestamp; // for indicate the last project update time
    uint256 public autoIncrementId = 0; // project id and will be auto increment when add new project
    mapping(uint256 => uint256) public idIndexMapping; // for del projects array index
    mapping(uint256 => bool) public isRemovedProject;
    constructor() {
        admin = msg.sender;
    }

    modifier ensureExist(uint256 _id) {
        require(
            !isRemovedProject[_id] &&
                projects[idIndexMapping[_id]].owner != address(0),
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
            projects[idIndexMapping[_id]].owner == msg.sender,
            "Clover OS: permission deny of owner"
        );
        _;
    }

    modifier onlyAdminOrOwner(uint256 _id) {
        require(
            msg.sender == admin ||
                projects[idIndexMapping[_id]].owner == msg.sender,
            "Clover OS: permission deny of admin or owner"
        );
        _;
    }

    function addProject(
        string calldata _name,
        string calldata _desc,
        string calldata _source,
        string calldata _icon
    ) external {
        bytes32 uuid = keccak256(
            abi.encodePacked(_name, _desc, _source, _icon, autoIncrementId)
        );
        idIndexMapping[autoIncrementId] = projects.length;
        projects.push(
            Project(
                _name,
                _desc,
                _source,
                _icon,
                1,
                uuid,
                autoIncrementId,
                msg.sender,
                ProjectStatus.OPENING,
                block.timestamp,
                block.timestamp
            )
        );
        latestUpdateTime = block.timestamp;
        autoIncrementId++;
        emit AddProject(msg.sender, projects[projects.length - 1]);
    }

    function removeProject(uint256 _id)
        external
        ensureExist(_id)
        onlyAdminOrOwner(_id)
    {
        idIndexMapping[projects[projects.length - 1].id] = idIndexMapping[_id];
        Project storage p = projects[idIndexMapping[_id]];
        projects[idIndexMapping[_id]] = projects[projects.length - 1];
        projects.pop();
        latestUpdateTime = block.timestamp;
        isRemovedProject[_id] = true;
        emit RemovedProject(msg.sender, p);
    }

    function updateProjectStatusByAdmin(uint256 _id, ProjectStatus _status)
        external
        ensureExist(_id)
        onlyAdmin
    {
        require(
            projects[idIndexMapping[_id]].status != _status,
            "Clover OS: status not been changed"
        );
        projects[idIndexMapping[_id]].status = _status;
        projects[idIndexMapping[_id]].updateTime = block.timestamp;
        latestUpdateTime = block.timestamp;
        emit ProjectStatusChanged(msg.sender, projects[idIndexMapping[_id]]);
    }

    function updateProjectStatusByOwner(uint256 _id, ProjectStatus _status)
        external
        ensureExist(_id)
        onlyOwner(_id)
    {
        require(
            projects[idIndexMapping[_id]].status != ProjectStatus.ADMIN_CLOSED,
            "Clover OS: project have been closed by admin"
        );
        require(
            projects[idIndexMapping[_id]].status != _status,
            "Clover OS: status not been changed"
        );
        projects[idIndexMapping[_id]].status = _status;
        projects[idIndexMapping[_id]].updateTime = block.timestamp;
        latestUpdateTime = block.timestamp;
        emit ProjectStatusChanged(msg.sender, projects[idIndexMapping[_id]]);
    }

    function updateProject(
        uint256 _id,
        string calldata _name,
        string calldata _desc,
        string calldata _source,
        string calldata _icon
    ) external ensureExist(_id) onlyAdminOrOwner(_id) {
        require(
            projects[idIndexMapping[_id]].status != ProjectStatus.ADMIN_CLOSED,
            "Clover OS: project have been closed"
        );
        projects[idIndexMapping[_id]].name = _name;
        projects[idIndexMapping[_id]].desc = _desc;
        projects[idIndexMapping[_id]].source = _source;
        projects[idIndexMapping[_id]].icon = _icon;
        projects[idIndexMapping[_id]].version = projects[idIndexMapping[_id]].version + 1;
        projects[idIndexMapping[_id]].updateTime = block.timestamp;
        latestUpdateTime = block.timestamp;
        emit UpdateProject(msg.sender, projects[idIndexMapping[_id]]);
    }

    function getProjectCount() external view returns (uint256) {
        return projects.length;
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
