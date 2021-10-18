 const pageSettings={
formSelector: ".popup__form",
inputSelector: ".popup__input",
submitButtonSelector: ".popup__save-button",
inactiveButtonClass: "popup__save-button_disabled",
inputErrorClass: "popup__input_type_error",
errorClass: "popup__error_visible"
}

function showInputError(formElement, inputElement,errorMessage,pageSettings) { //func. show error ,select error element and adds active class to it and message + adds class to the input element
const errorElement=formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add(pageSettings.inputErrorClass);
errorElement.textContent=errorMessage;
errorElement.classList.add(pageSettings.errorClass);

}
function hideInputError(formElement, inputElement,pageSettings){  // func. hide error (same like show func. just the opposite one)
const errorElement=formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.remove(pageSettings.inputErrorClass);
errorElement.classList.remove(pageSettings.errorClass);
errorElement.textContent="";

}

function checkInputValidity(formElement, inputElement,pageSettings){
if (!inputElement.validity.valid){// if input element has not valid (true) show input message (with func.) //
    showInputError(formElement, inputElement,inputElement.validationMessage,pageSettings); 
    
}
else  { // else hide the message (with func.)
    hideInputError(formElement, inputElement,pageSettings);
    
}

}
function hasInvalidInput(inputList) {
    return inputList.some((inputElement)=>{return !inputElement.validity.valid});
}


function toggleButtonState(inputList, buttonElement,pageSettings){
if (hasInvalidInput(inputList)){
    buttonElement.classList.add(pageSettings.inactiveButtonClass);
}
else{
    buttonElement.classList.remove(pageSettings.inactiveButtonClass);
}
}

function setEventListeners(formElement, pageSettings )  {
    const inputList= Array.from(formElement.querySelectorAll(pageSettings.inputSelector));  //find all inputs in our page and creating an array !
    const buttonElement=formElement.querySelector(pageSettings.submitButtonSelector); // find all symbit button in our page & creating array ! 
    toggleButtonState(inputList, buttonElement,pageSettings); // takes 
    inputList.forEach((inputElement)=> {inputElement.addEventListener("input", ()=>{ //for all input element add event and check validity & toggle button according the validity 
        checkInputValidity(formElement, inputElement,pageSettings);
        toggleButtonState(inputList, buttonElement,pageSettings);
    })})

}

function enableValidation(pageSettings){

const formList= Array.from(document.querySelectorAll(pageSettings.formSelector));//find all forms and creating an Array 
formList.forEach((formElement)=>{
    formElement.addEventListener("submit", (evt)=> {evt.preventDefault();}); // for each for element  prevent refresh at the submit event ! 
    setEventListeners(formElement,pageSettings)}); // and for each form activate function setEventListeners
}


enableValidation(pageSettings);
//console.log("work");

//const inputList=Array.from(document.querySelectorAll(inputSelector));