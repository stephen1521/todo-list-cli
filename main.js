const prompt = require('prompt-sync')({sigint: true});
let end = 0;
let toDoList = [];
let toDoListUtil = [];
let toDoListUtilDate = [];
let toDoListUtilTime = [];
let incomplete = '[incomplete] ';
let complete = '[complete] ';
let bool = false;
let bool2 = false;
let str = 'None';

console.log('\n'+'Welcome to the To-Do List Manager Application!');
divider();
isEmpty();

while(end !== -1){
    while(action() === -1){
        console.log('Please enter a valid action number\n');
    }
    if(end === -1){
        process.exit();
    }
    divider();
    list();
}

function divider(){
    console.log('');
    let str = '';
    for(let i = 0;i < 46; i++){
        str += '=';
    }
    console.log(str+'\n');
}

function isEmpty(){
    if(toDoListUtil.length === 0){
        console.log('Your to-do list is empty.'+'\n');
    }
}

function action(){
    console.log('~ Select an action ~');
    console.log('[1] Create a to-do item');
    console.log('[2] Complete a to-do item');
    console.log('[3] Uncomplete a to-do item');
    console.log('[4] Delete a to-do item');
    console.log('[5] Edit to-do item text');
    console.log('[6] Add a date, time, or both to a to-do item');
    console.log('[7] Edit to-do item date, time, or both');
    console.log('[8] Exit application');
    let input = Number(prompt('> '));
    console.log('');
    if(input === 1){
        createToDo();
    }else if(input === 2){
        if(isComplete()){
            while(completeToDo() === -1){
                console.log('Please enter a valid item number\n');
            }
        }else{
            console.log('All to-do items are complete\n');
        }   
    }else if(input === 3){
        if(isIncomplete()){
            while(uncompleteToDo() === -1){
                console.log('Please enter a valid item number\n');
            }
        }else{
            console.log('All to-do items are incomplete\n');
        }
    }else if(input === 4){
        if(toDoList.length !== 0){
            while(deleteToDo() === -1){
                console.log('Please enter a valid item number\n');
            }
        }else{
            console.log('There is nothing to delete becuase the to-do list is empty');
        }
    }else if(input === 5){
        if(toDoList.length !== 0){
            while(editToDoText() === -1){
                console.log('Please enter a valid item number\n');
            }
        }else{
            console.log('There is nothing to edit becuase the to-do list is empty');
        }
    }else if(input === 6){
        if(toDoList.length !== 0){
            while(dateTimeUtil() === -1){
                console.log('Please enter a valid item number\n');
            }
        }else{
            console.log('There is nothing to add date or time to becuase the to-do list is empty');
        }
    }else if(input === 7){
        if(toDoList.length !== 0){
            while(editDateTime() === -1){
                console.log('Please enter a valid item number\n');
            }
        }else{
            console.log('There is nothing to edit becuase the list is empty');
        }
    }else if(input === 8){
        end = -1;
    } else{
        return -1;
    }
}

function createToDo(){
    console.log('~ Creating a new to-do item ~');
    console.log('What is this to-do item called?');
    let input = prompt('> ');
    toDoListUtil.push((incomplete));
    toDoList.push(input);
    toDoListUtilDate.push(str);
    toDoListUtilTime.push(str);
}

function completeToDo(){
    console.log('~ Completing a to-do item ~');
    console.log('Which to-do item would you like to complete?');
    let input = Number(prompt('> '));
    console.log('');
    if(input > 0 && input < toDoList.length + 1){
        toDoListUtil[input - 1] = complete;
    }else{
        return -1;
    }
}

function list(){
    console.log('You have ' + toDoList.length + ' to-do item(s).');
    for(let i = 0; i < toDoList.length; i++){
        console.log((i + 1) + '. ' + toDoListUtil[i] + ' ' + toDoList[i] + ' | Date to be done by: ' + toDoListUtilDate[i] + ' | Time to be done by: ' + toDoListUtilTime[i]);
    }
    console.log('');
}

function uncompleteToDo(){
     console.log('~ Uncompleting a to-do item ~');
     console.log('Which to-do item would you like to uncomplete?');
    let input = Number(prompt('> '));
    if(input > 0 && input < toDoList.length + 1){
        toDoListUtil[input - 1] = incomplete;
    }else{
        return -1;
    }
}

function isIncomplete(){
    for(let i of toDoListUtil){
        if(i === complete){
            return bool = true;
        }
    }
}

function isComplete(){
    for(let i of toDoListUtil){
        if(i === incomplete){
            return bool2 = true;
        }
    }
}

function deleteToDo(){
    console.log('~ What to-do item would you like to delete? ~');
    let input = Number(prompt('> '));
    if(input > 0 && input < toDoList.length + 1){
        toDoList.splice(input - 1, 1);
        toDoListUtil.splice(input - 1, 1);
    }else{
        return -1;
    }
}

function editToDoText(){
    console.log('~ What to-do item would you like to edit ~');
    let input = Number(prompt('> '));
    console.log('Please enter new text');
    let input2 = prompt('> ');
    if(input > 0 && input < toDoList.length + 1){
       toDoList[input - 1] = input2;
    }else{
        return -1;
    }
}

function dateTimeUtil(){
    console.log('What to-do item would you like to add a date, time, or both to?');
    let input = Number(prompt('> '));
    if(input > 0 && input < toDoList.length + 1){
        console.log('What would you like to add?\n [1] Date\n [2] Time\n [3] Both date and time');
        let input2 = Number(prompt('> '));
            if(input2 === 1){
                if(toDoListUtilDate[input - 1] !== 'None'){
                    console.log('Can\'t add a date becuase a date already exist');
                    return;
                }
                addDate(input - 1);
            }else if(input2 === 2){
                if(toDoListUtilTime[input - 1] !== 'None'){
                    console.log('Can\'t add a time becuase a time already exist');
                    return;
                }
                addTime(input - 1);
            }else if(input2 === 3){
                if(toDoListUtilDate[input - 1] !== 'None' || toDoListUtilTime[input - 1] !== 'None'){
                    console.log('Can\'t add a date and time becuase a date and time already exist');
                    return;
                }
                addDate(input - 1);
                addTime(input - 1);
            }else{
                return -1;
            }
    } else {
        return -1;
    }
}

function addDate(input){
    console.log('Enter a date, day, or both')
    let input2 = prompt('> ');
    toDoListUtilDate[input] = input2;


}

function addTime(input){
    console.log('Enter a time');
    let input2 = prompt('> ');
    toDoListUtilTime[input] = input2;

}

function editDateTime(){
    console.log('What to-do item would you like to edit the date, time, or both to?');
    let input = Number(prompt('> '));
    if(input > 0 && input < toDoList.length + 1){
        console.log('What would you like to edit?\n [1] Date\n [2] Time\n [3] Both date and time');
        let input2 = Number(prompt('> '));
            if(input2 === 1){
                if(toDoListUtilDate[input - 1] === 'None'){
                    console.log('No date to edit in that to-do item');
                    return;
                }
                addDate(input - 1);
            }else if(input2 === 2){
                if(toDoListUtilTime[input - 1] === 'None'){
                    console.log('No time to edit in that to-do item');
                    return;
                }
                addTime(input - 1);
            }else if(input2 === 3){
                if((toDoListUtilDate[input - 1] === 'None') || (toDoListUtilTime[input - 1] === 'None')){
                    console.log('No time and date to edit in that to-do item');
                    return;
                }
                addDate(input - 1);
                addTime(input - 1);
            }else{
                return -1;
            }
    } else {
        return -1;
    }
}