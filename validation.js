export {isNameCorrect, isPhoneCorrect, isSalaryCorrect};

function isNameCorrect(val){
    if(val.match(/(\d+)/g)){
        return confirm("Provade valid name!\nName shouldn't contain numbers!");
    }else if(val.length > 4){
        return val;
    }else{
        return confirm('Provade valid name!\nName should be at least 4 symbols!');
    }
}

function isPhoneCorrect(val){
    if(val.length === 10){
        return val;
    }else{
        return confirm('Provade valid phone number!\nPhone number should be 10 symbols!');
    }
}

function isSalaryCorrect(val){
    if(val > 0){
        return val
    } else{
        return confirm('Provade valid salary!');
    }
}