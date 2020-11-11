import company from './data/company.json';
import employees from './data/employees.json';
import {getCompany, addStyleType} from './branchFoo';

let employeeLS = JSON.parse(localStorage.getItem('employeesArr'));
if(!employeeLS){
    localStorage.setItem('employeesArr', JSON.stringify(employees));
    employeeLS = JSON.parse(localStorage.getItem('employeesArr'));
} else if(employeeLS === undefined || employeeLS === null){
    localStorage.removeItem(employeeLS);
}

const employeeIdLS = JSON.parse(localStorage.getItem('employeeId'));
if(employeeIdLS){
    localStorage.removeItem('employeeId');
}

let selectedEmployeeTreeItem = null;

const selectCur = document.getElementById('select-currience');

const deptIds = [];

employeeLS.forEach(e => {
    if(!deptIds.includes(e.dept_id)){
        deptIds.push(e.dept_id);
    }
});

const cloneCompany = (collection) => {
    return JSON.parse(JSON.stringify(collection));
}

function makeTree(arr){
    localStorage.setItem('companyArr', JSON.stringify(arr));
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
    tree = makeTree(cloneCompany(company));
} else {
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
        
        spanEl.innerText = el.name;
        spanEl.dataset.deptId = el.id;

        if(el.children){
            liEl.appendChild(addStyleType());
        }

        if(!deptIds.includes(el.id)){
            spanEl.classList.add('disabled-tree-item');
        }

        liEl.appendChild(spanEl);

        if(el.children){
            const ulEl = document.createElement('ul');
            liEl.appendChild(ulEl);
            buildTree(el.children, ulEl);
        }

        rootEl.appendChild(liEl);
    })
}

createHtmlTree(tree, treeContainer);

treeContainer.addEventListener('click', (event) => {
    if(event.target.tagName === 'SPAN'){
        if(selectCur.value === 'USD'){
            selectCur.value = 'BYN';
        }
        const filteredEmployees = getEmployeesByDeptId(employeeLS, +event.target.dataset.deptId);
        displayEmployeesData(filteredEmployees);
        selectTreeItem(event.target);
        return;
    }

    if(event.target.classList.contains('collapsed')){
        event.target.classList.remove('collapsed');
    } else if (!event.target.classList.contains('collapsed')){
        event.target.classList.add('collapsed');
    }

    if(event.target.tagName === 'I'){
        const elToHide = event.target.parentElement.getElementsByTagName('ul')[0];
        elToHide.classList.toggle('hidden');
    }
});

function getEmployeesByDeptId(employeesCollection, id){
    return employeesCollection.filter(employee => employee.dept_id === id);
}

function displayEmployeesData(employees){
    clearTable();
    const fields = ['id', 'name', 'phone', 'salary', 'actions'];
    const tBody = getTableBody();
    
    employees.forEach(e => {
        const tRow = document.createElement('tr');
        for(let i = 0; i < fields.length; i++){
            const tD = document.createElement('td');
            const fieldName = fields[i];
            tD.innerText = e[fieldName];
            
            tRow.dataset.emplId = e.id;

            if(fieldName === 'name'){
                const aEl = document.createElement('a');
                aEl.innerText = tD.innerText; 
                aEl.setAttribute("href", "#");
                tD.innerText = '';
                tD.appendChild(aEl);
            }

            if(fieldName === 'salary'){
                tD.dataset.cellId = 'salary';
                tD.classList.add('blur-salary');
                tD.setAttribute('data-select-value', selectCur.value);
            }

            if(fieldName === 'actions'){
                const delPersonBtn = document.createElement('button');
                delPersonBtn.innerText = 'Delete';
                tD.innerText = '';
                tD.appendChild(delPersonBtn);  
            }
            tRow.appendChild(tD);
        }
        tBody.appendChild(tRow);
    })
}
const clearTableBtn = document.querySelector('.clearTableBtn');
const clearAllBtn = document.querySelector('.clear-btn');

function clearTable(){
    const tBody = getTableBody();
    const table = document.getElementsByTagName('table')[0];

    if(tBody){
        table.removeChild(tBody);
    }
}

function getTableBody(){
    const tBodyEl = document.getElementsByTagName('tbody')[0];

    if(tBodyEl){
        return tBodyEl;
    }

    const table = document.getElementsByTagName('table')[0];
    const newTBodyEl = document.createElement('tbody');
    table.appendChild(newTBodyEl);
    return newTBodyEl;
}

clearTableBtn.addEventListener('click', clearTable);

function selectTreeItem(selectedItem){
    clearTreeSelection();
    selectedEmployeeTreeItem = selectedItem;
    selectedItem.classList.add('selected-tree-item');
}

function clearAll(){
    clearTable();
    clearTreeSelection();
}

function clearTreeSelection(){
    if(selectedEmployeeTreeItem){
        selectedEmployeeTreeItem.classList.remove('selected-tree-item');
    }
}

clearAllBtn.addEventListener('click', clearAll);

const table = document.querySelector('table');

table.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON'){
        const isAgree = confirm('Do you really want to dellete user?');
        if(isAgree){
            const tRow = event.target.parentElement.parentElement;
            const tRowAttribute = tRow.getAttribute('data-empl-id');

            const idOFEmpl = JSON.parse(tRowAttribute);

            let employeesFromLS = JSON.parse(localStorage.getItem('employeesArr'));
            const newEmplArr = employeesFromLS.filter(el => el.id !== idOFEmpl);

            localStorage.setItem('employeesArr', JSON.stringify(newEmplArr));

            const tBody = tRow.parentElement;
            tBody.removeChild(tRow);
        }
      return;  
    }

    if(event.target.tagName === 'A'){
        const tRow = event.target.parentElement.parentElement;
        const tRowAttribute = tRow.getAttribute('data-empl-Id');
        localStorage.setItem('employeeId', tRowAttribute);

        const tdAttribute = event.target.parentElement.getElementsByTagName('a')[0];
        tdAttribute.href = 'editUser.html';
    }
})