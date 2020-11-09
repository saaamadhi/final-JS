import {isNameCorrect, isPhoneCorrect, isSalaryCorrect} from './validation';
const employee = JSON.parse(localStorage.getItem('employeesArr'));
const emplId = JSON.parse(localStorage.getItem('employeeId'));

const companyFromLS = JSON.parse(localStorage.getItem('companyArr'));

const userName = document.getElementById('user-name');
const userPhone = document.getElementById('user-phone');
const userSalary = document.getElementById('user-salary');

const selectDepts = document.getElementById('select-depts');

const saveBtn = document.getElementById('submit');

function getDepts(){
    let depts = [];
    companyFromLS.filter(item => item.parentId !== null).forEach(element => {
        depts.push(element.name);
    });
    return depts;
}

function setSelectDeptsOptions(array) {
    array.forEach(dept => {
        const newoption = document.createElement('option');
        newoption.innerHTML = dept;
        selectDepts.appendChild(newoption);
    });
}
setSelectDeptsOptions(getDepts());

function getIdOfDept(arr){
    let id;
    arr.forEach(el => {
        if(el.name === selectDepts.value){
            id = el.id;
        }
    })
    return id;
}

function getNameOfDept(arr, id){
    let name;
    arr.forEach(el => {
        if(el.id === id){
            name = el.name;
        }
    })
    return name;
}

function setPlaceholder(arr){
    arr.forEach(el => {
        if(el.id === emplId){
            userName.setAttribute('placeholder', el.name);
            userPhone.setAttribute('placeholder', el.phone);
            userSalary.setAttribute('placeholder', el.salary);
            selectDepts.value = getNameOfDept(companyFromLS, el.dept_id);
        }
    })
}
setPlaceholder(employee);

saveBtn.addEventListener('click', (event) => {
    let valid;
    event.preventDefault();
        employee.forEach(empl => {
            if(empl.id === emplId){
                empl.name = isNameCorrect(userName.value);
                empl.phone = isPhoneCorrect(userPhone.value);
                empl.salary = isSalaryCorrect(userSalary.value);
                empl.dept_id = getIdOfDept(companyFromLS);
                if((empl.name === true || empl.name === false) ||
                (empl.phone === true || empl.phone === false) ||
                (empl.salary ===true || empl.salary === false)){
                    valid = false;
                }else {
                    valid = true;
                }
            }
        });
        if(valid === true){
            localStorage.setItem('employeesArr', JSON.stringify(employee));
        }
})