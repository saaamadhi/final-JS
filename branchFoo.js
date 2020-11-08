export {editBranch, addNewBranch, createDellBtn, dellUser, getCompany, addStyleType};

const getCompany = () => {
    const data = JSON.parse(localStorage.getItem('companyArr'));
    return data;
}

function editBranch(rootElOfEditBranch){
    const elemToEd = rootElOfEditBranch.getElementsByTagName('span')[0];
    const arrLS = getCompany() || [];
    const newNameOfDept = prompt('Please, select new name:');
    if(newNameOfDept !== ''){
        const isNewNameOk = confirm('Do you really want to change name?');
        if(isNewNameOk){
            arrLS.forEach(el => {
                if(el.name === elemToEd.innerText){
                    el.name = newNameOfDept;
                }
            })
            
            elemToEd.innerText = newNameOfDept;
            localStorage.setItem('companyArr', JSON.stringify(arrLS));
        }

    } else {
        confirm('Please, provide valid name');
        editBranch(rootElOfEditBranch);
    }
}
function getIdOfRootEl(rootElOfNewBranch){
    const nameOfRoot = rootElOfNewBranch.getElementsByTagName('span')[0].innerText;
    const arrLS = getCompany() || [];
    let idOfRootEl;
    arrLS.forEach(element => {
        if(element.name === nameOfRoot){
            return idOfRootEl = element.id;
        }
    });
    return idOfRootEl;
}

function addNewBranch(rootElOfNewBranch){
    const company = getCompany() || [];
    const newdept = prompt('Please, enter name for a new item:');
    if(newdept !== ''){
        const isAddOk = confirm('Do you really want to add a new element?');
        if(isAddOk){
            const newulEl = document.createElement('ul');
            const newliEl = document.createElement('li');
            const newspanEl = document.createElement('span');
        
            const newbtnEditEl = document.createElement('button');
            const newbtnAddEl = document.createElement('button');
            newspanEl.innerText = newdept;

            newbtnEditEl.innerText = 'edit';
            newbtnAddEl.innerText = 'add';
            newbtnEditEl.classList.add('editBtn');
            newbtnAddEl.classList.add('addBtn');

            company.push({
                id: generateId(),
                parentId: getIdOfRootEl(rootElOfNewBranch),
                name: newdept,
            });

            localStorage.setItem('companyArr', JSON.stringify(company));

        
            newliEl.appendChild(newspanEl);
            newliEl.appendChild(newbtnEditEl);
            newliEl.appendChild(newbtnAddEl);
    
            createDellBtn(newliEl);
            newulEl.appendChild(newliEl);
            rootElOfNewBranch.appendChild(newulEl);
        } 
    }else {
        confirm('Please, provide valid name');
        addNewBranch(rootElOfNewBranch);
    }
}

function createDellBtn(rootElOfDellBranch){
    const btnDellEl = document.createElement('button');
    btnDellEl.classList.add('closeBtn');
    btnDellEl.classList.add('dellBtn');
    rootElOfDellBranch.appendChild(btnDellEl);
}

function dellUser(ElForDell){
    const isDellOk = confirm('Do you really want to remove item?');
    if(isDellOk){
        const parentOfRoot = ElForDell.parentElement;//ul
        const rootOfParentEl = parentOfRoot.parentElement;//li
        const spanElForDell = ElForDell.getElementsByTagName('span')[0].innerText;
        const arrLS = getCompany() || [];
        const newArr = arrLS.filter(el => el.name !== spanElForDell);
        localStorage.setItem('companyArr', JSON.stringify(newArr));
        parentOfRoot.removeChild(ElForDell);
        if(parentOfRoot.children.length === 0){
            const dellI = rootOfParentEl.getElementsByTagName('i')[0];
            rootOfParentEl.removeChild(dellI);
            rootOfParentEl.removeChild(parentOfRoot);
            createDellBtn(rootOfParentEl);
        }
    }
}

function generateId(){
    const arrLS = getCompany() || [];
    let lastElId = arrLS[arrLS.length - 1].id;
    let newElId = ++lastElId;
    return newElId;
}

function addStyleType(){
    const iEl = document.createElement('i');
    iEl.classList.add('collapsed');
    return iEl;
}