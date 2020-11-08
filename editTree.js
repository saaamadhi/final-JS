import company from './data/company.json';
import {editBranch, addNewBranch, createDellBtn, dellUser, getCompany, addStyleType} from './branchFoo';

function makeTree(arr){
    arr.forEach(parentEl=> {
        arr.forEach(childEl => {
            if(parentEl.id === childEl.parentId){
                if(!parentEl.children){
                    parentEl.children = [];
                }
                parentEl.children.push(childEl);
            }
        });
    });
    return arr.filter(item => item.parentId === null);
}
const treeContainer = document.querySelector('.container');

let lstorage = getCompany();
let tree;
if(!lstorage){
    tree = makeTree(company);
}else {
    tree = makeTree(lstorage);
}

function createHtmlTree(collection, container){
    const rootEl = document.createElement('ul');
    buildTree(collection, rootEl);
    container.appendChild(rootEl);
}

function buildTree(arr, rootEl){
    arr.forEach(el => {
        const liEl = document.createElement('li');
        const spanEl = document.createElement('span');
        
        const btnEditEl = document.createElement('button');
        const btnAddEl = document.createElement('button');
        spanEl.innerText = el.name;
        btnEditEl.innerText = 'edit';
        btnAddEl.innerText = 'add';
        btnEditEl.classList.add('editBtn');
        btnAddEl.classList.add('addBtn');

        
        if(el.children){
            liEl.appendChild(addStyleType());
        }

        liEl.appendChild(spanEl);
        liEl.appendChild(btnEditEl);
        liEl.appendChild(btnAddEl);

        if(el.children){
            const ulEl = document.createElement('ul');
            liEl.appendChild(ulEl);
            buildTree(el.children, ulEl);
        }

        if(!el.children) {
            createDellBtn(liEl);
        }

        rootEl.appendChild(liEl);
    })
}
createHtmlTree(tree, treeContainer);

treeContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('collapsed')){
        event.target.classList.remove('collapsed');
    } else {
        event.target.classList.add('collapsed');
    }

    if(event.target.tagName === 'I'){
        const elToHide = event.target.parentElement.getElementsByTagName('ul')[0];
        elToHide.classList.toggle('hidden');
    }

    if(event.target.classList.contains('editBtn')){
        const rootEltoEdit = event.target.parentElement;
        editBranch(rootEltoEdit);
    }

    if(event.target.classList.contains('addBtn')){
        const newRootEl = event.target.parentElement;
        const ulElem = newRootEl.getElementsByTagName('ul');
        const parseUlEl = JSON.parse(JSON.stringify(ulElem));
        const len = Object.keys(parseUlEl).length;

        if(len === 0){
            const dellBtnOfRootEl = newRootEl.getElementsByClassName('closeBtn')[0];
            newRootEl.removeChild(dellBtnOfRootEl);   
        }
        if(!newRootEl.getElementsByTagName('i')[0]){
            newRootEl.prepend(addStyleType());
        }
        
        addNewBranch(newRootEl);
    }

    if(event.target.classList.contains('dellBtn')){
        const rootElForDell = event.target.parentElement;//li
        dellUser(rootElForDell);
    }
});