var getPassword = document.getElementById("password");
var getInput = document.getElementById("input");




function onEncrypt() {
  let password = getPassword.value;
  let input = getInput.value;


  if (password == "") {

    //codificacion por defecto

  } 
  else {  //codificacion por contraseña
    let wordCode = getWordCode(password);
    let newText = encrypt(input, wordCode);

    document.getElementById("output").textContent = newText;
  }

}



function getWordCode(password) {
    let wordCode = 0;
    for (let i = 0; i < password.length; i++) {
        wordCode += password[i].codePointAt();
//************si la palabra tiene las mismas letras, tendra el mismo codigo******************************//
    }
    return wordCode;
}

function encrypt (input, wordCode) {

    let newText = ""; 
    for (let i = 0; i < input.length; i++) {    
        let letterCode = input[i].codePointAt();  //obtengo el codigo de la letra 
        let newLetterCode = letterCode + wordCode;   //le sumo el valor de la contraseña para obtener otra letra
        let newLetter = String.fromCodePoint(newLetterCode);    //desencripto la nueva letra
        newText = newText + newLetter;    //agrego la letra al nuevo texto
    }
    return newText;
//*********si el codigo de la letra + la contraseña es muy alto sobrepasara el valor de unicode: Invalid code point*************/
}
