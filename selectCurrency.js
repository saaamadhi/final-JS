const curOptions = ['BYN', 'USD'];

const selectCur = document.getElementById('select-currience');

function setSelectCurOptions(array) {
    array.forEach(cur => {
        const newoption = document.createElement('option');
        newoption.innerHTML = cur;
        selectCur.appendChild(newoption);
    });
}
setSelectCurOptions(curOptions); 

selectCur.addEventListener('change', async (event) => {
    let curId;
    const cellIds = document.querySelectorAll('[data-cell-id]');
    
    curId = 145;
    const response = await fetch('https://www.nbrb.by/api/exrates/rates/' + curId);

    if(response.ok){
        const result = await response.json(); 

        if(event.target.value === 'USD'){
            cellIds.forEach(salary => {
                salary.innerText = (salary.innerText * result.Cur_OfficialRate).toFixed(2);
                return;
            });
        } else if(event.target.value === 'BYN'){
            cellIds.forEach(salary => {
                salary.innerText = (salary.innerText / result.Cur_OfficialRate).toFixed();
                return;
            });
        }

    } else {
        alert("Error!");
    }
});