var item1;
var item2;
var erc20;
var upappView;
var appListView;
var upTitle;
var account = "";
var lists = [];
var upType = "";
var appid = "";
var upappname;
var updeccibeText;
var upiconHash;
var Admin = "";
var upzipHash;
var latestUpdateTime;
var address = '0x2EdB874129E611A225351C3D629Fa46a0B2FCC2E';
var abi = `[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_desc","type":"string"},{"internalType":"string","name":"_source","type":"string"},{"internalType":"string","name":"_icon","type":"string"}],"name":"addProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"string","name":"source","type":"string"},{"internalType":"string","name":"icon","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"createTime","type":"uint256"},{"internalType":"uint256","name":"updateTime","type":"uint256"}],"indexed":false,"internalType":"struct CloverOsProject.Project","name":"info","type":"tuple"}],"name":"AddProject","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"controller","type":"address"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"string","name":"source","type":"string"},{"internalType":"string","name":"icon","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"createTime","type":"uint256"},{"internalType":"uint256","name":"updateTime","type":"uint256"}],"indexed":false,"internalType":"struct CloverOsProject.Project","name":"info","type":"tuple"}],"name":"ProjectStatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"controller","type":"address"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"string","name":"source","type":"string"},{"internalType":"string","name":"icon","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"createTime","type":"uint256"},{"internalType":"uint256","name":"updateTime","type":"uint256"}],"indexed":false,"internalType":"struct CloverOsProject.Project","name":"info","type":"tuple"}],"name":"RemovedProject","type":"event"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"removeProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_desc","type":"string"},{"internalType":"string","name":"_source","type":"string"},{"internalType":"string","name":"_icon","type":"string"}],"name":"updateProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"controller","type":"address"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"string","name":"source","type":"string"},{"internalType":"string","name":"icon","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"createTime","type":"uint256"},{"internalType":"uint256","name":"updateTime","type":"uint256"}],"indexed":false,"internalType":"struct CloverOsProject.Project","name":"info","type":"tuple"}],"name":"UpdateProject","type":"event"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"_status","type":"uint8"}],"name":"updateProjectStatusByAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"_status","type":"uint8"}],"name":"updateProjectStatusByOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"autoIncrementId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"developers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProjectCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_end","type":"uint256"}],"name":"getProjects","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"string","name":"source","type":"string"},{"internalType":"string","name":"icon","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"createTime","type":"uint256"},{"internalType":"uint256","name":"updateTime","type":"uint256"}],"internalType":"struct CloverOsProject.Project[]","name":"pjs","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idIndexMapping","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDevelover","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isRemovedProject","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"projects","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"string","name":"source","type":"string"},{"internalType":"string","name":"icon","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"enum CloverOsProject.ProjectStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"createTime","type":"uint256"},{"internalType":"uint256","name":"updateTime","type":"uint256"}],"stateMutability":"view","type":"function"}]`;

var appNamePath = 'AppName.txt';
var appDescribePath = 'Describe.txt';
var appIconPath = 'icon.png';
var appZipPath = 'app.zip';

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function login() {
    if (!window.ethereum) {
        window.alert('Please install MetaMask first.');
    } else {
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
            account = accounts[0];
        }
        ethereum.on('accountsChanged', function (accounts) {
            if (accounts.length == 0) {
                account = "";
            } else {
                account = accounts[0];
            }
        });
        ethereum.on('chainChanged', (_chainId) => window.location.reload());
        let provider = new ethers.providers.Web3Provider(ethereum);
        erc20 = new ethers.Contract(address, abi, provider.getSigner());
        AutoReflush();
    }
}

const IPFS = IpfsHttpClient("https://ipfs.clover.finance");

async function getSource(hash, type) {
    let arr = [];
    let cons = IPFS.cat(hash);
    for await (let item of cons) {
        arr.push(item);
    }
    if (type == "img") {
        return window.URL.createObjectURL(new Blob(arr));
    } else if (type = "txt") {
        return String.fromCharCode.apply(null, arr.toString().split(","));
    }
    return arr;
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString()
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

async function AutoReflush() {
    let _UpdatTime = await erc20.functions.latestUpdateTime();
    let currentUpdateTime = _UpdatTime[0]._hex;
    if (latestUpdateTime !== currentUpdateTime) {
        initList();
        latestUpdateTime = currentUpdateTime
    }
    setTimeout(() => {
        AutoReflush();
    }, 5000);
}

async function initList() {
    let t = await getProjects(0, 500);
    lists = t[0];
    let parent = document.getElementsByClassName("scroll")[0];
    if (!item1) {
        item1 = document.getElementsByClassName("item")[0];
        item2 = document.getElementsByClassName("item")[1];
    }
    upTitle = document.getElementsByClassName("title")[0];
    upappView = document.getElementsByClassName("container")[0];
    appListView = document.getElementsByClassName("container")[1];
    for (var i = parent.children.length - 1; i >= 0; i--) {
        parent.children[i].remove();
    }
    document.getElementsByClassName("scroll")[0].style.display = "block";
    let ele;
    for (var i = 0; i < lists.length; i++) {
        if (account !== lists[i].owner.toLowerCase() && account !== Admin) {
            continue;
        }
        if (lists[i].status == 0) {
            ele = item1.cloneNode(true);
        } else {
            ele = item2.cloneNode(true);
        }
        setItemData(ele, lists[i])
        parent.appendChild(ele);
        await sleep(800);
    }
    Admin = await await erc20.functions.admin();
}

async function setItemData(item, data) {
    let img = await getSource(data.icon, "img");
    let desc = await getSource(data.desc, "txt");
    let timestamp = Number(data.updateTime);
    item.firstElementChild.firstElementChild.src = img;                                                                        //logo
    item.children[1].children[0].children[0].textContent = data.name;                                                          //name
    item.children[1].children[1].children[0].textContent = "V " + Number(data.version).toString();                             //version
    item.children[1].children[1].children[1].textContent = dateFormat("YYYY-mm-dd HH:MM:SS", new Date(timestamp * 1000));      //time
    if (data.status === 0) {
        let btn1 = item.children[2].children[0].children[0];
        btn1.addEventListener("click", () => {
            updateBtn([data.id, data.name, desc, data.icon, data.source]);
        })
        let btn2 = item.children[2].children[1].children[0];
        btn2.addEventListener("click", () => {
            ShelfApp(data.id);
        })
    } else {
        let btn3 = item.children[2];
        btn3.addEventListener("click", () => {
            RemoveApp(data.id);
        })
    }
}

async function ShelfApp(id) {
    SetLoadingType(true);
    try {
        if (account === Admin) {
            let res = await erc20.functions.updateProjectStatusByAdmin(id, 1);
        } else {
            let res = await erc20.functions.updateProjectStatusByOwner(id, 1);
        }
    } catch (e) {
        console.log(e);
    } finally {
        SetLoadingType(false);
    }
}

async function RemoveApp(id) {
    SetLoadingType(true);
    try {
        let res = await erc20.functions.removeProject(id);
    } catch (e) {
        console.log(e);
    } finally {
        SetLoadingType(false);
    }
}

async function getProjects(_start, _end) {
    if (window.ethereum) {
        return await erc20.functions.getProjects(_start, _end);
    }
}

async function addProject([_name, _desc, _source, _icon]) {
    try {
        if (window.ethereum) {
            if (upType === "update") {
                await erc20.functions.updateProject(appid, _name, _desc, _source, _icon);
            } else {
                await erc20.functions.addProject(_name, _desc, _source, _icon);                     //{ nonce: 3, gasPrice: 100 * 1e9, gasLimit: 500000 }
            }
        }
    } catch (e) {
        console.log(e);
    } finally {
        SetLoadingType(false);
    }
}

function select(value) {
    if (value == 1) {
        document.getElementById("AppIcon").click();
    } else if (value == 2) {
        document.getElementById("file").click();
    }
}

function changePath(value) {
    if (value == 1) {
        let p = document.getElementById("AppIcon").value;
        document.getElementById("iconPath").textContent = p;
    } else if (value == 2) {
        let file = document.getElementById("file");
        if (file.files[0].size > 104857600) {
            showMsg("", 3.5);
            file.value = "";
            return;
        }
        document.getElementById("filePath").textContent = file.value;
    }
}

function captureFile() {
    let name = document.getElementById("AppName").value;
    let describe = document.getElementById("Describe").value;
    let icon = document.getElementById("AppIcon").files;
    let file = document.getElementById("file").files;
    let descObj = { "describe": describe, "size": file.length > 0 ? file[0].size : 1 };
    if (name !== "" && describe !== "" && icon.length !== 0 && file.length !== 0) {
        saveToIpfs({
            AppName: name,
            Describe: descObj,
            AppIcon: icon,
            File: file
        });
        SetLoadingType(true);
        return;
    }
    if (upType === "update") {
        if (name !== upappname || describe !== updeccibeText || icon.length !== 0 || file.length !== 0) {
            if (name !== "" && describe !== "") {
                saveToIpfs({
                    AppName: name,
                    Describe: descObj,
                    AppIcon: icon,
                    File: file
                });
                SetLoadingType(true);
            }
        }
    }
};

async function saveToIpfs(obj) {
    let added3;
    let added4;
    let pro = document.getElementsByClassName("process")[0];
    pro.style.display = "block";
    try {
        let added1 = await IPFS.add({
            path: appNamePath,
            content: obj.AppName
        });
        let added2 = await IPFS.add({
            path: appDescribePath,
            content: obj.Describe.describe
        });
        if (obj.AppIcon.length !== 0) {
            added3 = await IPFS.add({
                path: appIconPath,
                content: obj.AppIcon[0]
            });
        }
        if (obj.File.length !== 0) {
            added4 = await IPFS.add({
                path: appZipPath,
                content: obj.File[0]
            }, {
                progress: (prog) => {
                    let p = Math.floor(100 * Number(prog) / Number(obj.Describe.size));
                    if (p > 100) p = 100;
                    pro.textContent = p.toString() + "%";
                }
            });
        }
        let info = {};
        info._name = obj.AppName;
        info._desc = added2.cid.string;
        if (added3) {
            info._icon = added3.cid.string;
        } else {
            info._icon = upiconHash;
        }
        if (added4) {
            info._source = added4.cid.string;
        } else {
            info._source = upzipHash;
        }
        addProject([info._name, info._desc, info._source, info._icon]);
        init();
        result("SUCCEED");
    } catch (err) {
        console.error(err);
        result("FAIL");
    }
}

function init() {
    if (upType !== "update") {
        document.getElementById('AppName').value = "";
        document.getElementById('Describe').value = "";
    }
    document.getElementById('iconPath').textContent = "";
    document.getElementById('filePath').textContent = "(The packet size < 100M)";
    document.getElementById("AppIcon").value = "";
    document.getElementById("file").value = "";
    let pro = document.getElementsByClassName("process")[0];
    pro.style.display = "none";
    pro.textContent = "";
}

function result(msg) {
    document.getElementById('resault').textContent = msg;
    setTimeout(() => {
        document.getElementById('resault').textContent = "";
    }, 5000);
}

function add() {
    upTitle.textContent = "| Add App";
    upType = "up";
    appid = "";
    appListView.style.display = "none";
    upappView.style.display = "block";
}

function updateBtn([id, name, deccibeText, iconHash, zipHash]) {
    appListView.style.display = "none";
    upappView.style.display = "block";
    upTitle.textContent = "| Update App";
    document.getElementById('AppName').value = name;
    document.getElementById('Describe').value = deccibeText;
    upType = "update";
    appid = id;
    upappname = name;
    updeccibeText = deccibeText;
    upiconHash = iconHash;
    upzipHash = zipHash;
}

function exit() {
    upTitle.textContent = "| Add App";
    upType = "up";
    appid = "";
    init();
    document.getElementById('AppName').value = "";
    document.getElementById('Describe').value = "";
    appListView.style.display = "block";
    upappView.style.display = "none";
}

function SetLoadingType(isShow) {
    let load = document.getElementsByClassName('loading')[0];
    let maskHalf = document.getElementsByClassName('maskHalf')[0];
    load.style.display = isShow ? "block" : "none";
    maskHalf.style.display = isShow ? "block" : "none";
}

function showMsg(msg, timer) {
    let message = document.getElementsByClassName('message')[0];
    let maskHalf = document.getElementsByClassName('maskHalf')[0];
    message.style.display = "block";
    maskHalf.style.display = "block";
    if (msg !== "") {
        message.children[0].children[0].textContent = msg;
    }
    setTimeout(() => {
        message.style.display = "none";
        maskHalf.style.display = "none";
    }, timer * 1000);
}