var getPassword = document.getElementById("password");
var getInput = document.getElementById("input");

function getWordCode(password) {
  let wordCode = 0;
  for (let i = 0; i < password.length; i++) {
    wordCode += password[i].codePointAt();
    //************si la palabra tiene las mismas letras, tendra el mismo codigo******************************//
  }
  return wordCode;
}

function onEncrypt() {
  let password = getPassword.value;
  let input = getInput.value;

  if (password == "") {
    //codificacion por defecto()
    let newText = defaultEncrypt(input);

    // document.getElementById("output").textContent = newText;
    animation(newText);
  } else {
    //codificacion por contraseña
    let wordCode = getWordCode(password);
    let newText = encrypt(input, wordCode);

    // document.getElementById("output").textContent = newText;
    animation(newText);
  }
}

function onDecrypt() {
  let password = getPassword.value;
  let input = getInput.value;

  if (password == "") {
    //decodificacion por defecto()
    let originText = defaultDecrypt(input);
    // document.getElementById("output").textContent = originText;
    animation(originText);

  } else {
    let wordCode = getWordCode(password);
    let originText = decrypt(input, wordCode);

    // document.getElementById("output").textContent = originText;
    animation(originText);
  }
}

function encrypt(input, wordCode) {
  let newText = "";
  for (let i = 0; i < input.length; i++) {
    //obtengo el codigo de la letra:
    let letterCode = input[i].codePointAt();
    //le sumo el valor de la contraseña para obtener otra letra:
    let newLetterCode = letterCode + wordCode;
    //obtengo la nueva letra a partir del nuevo codigo:
    let newLetter = String.fromCodePoint(newLetterCode);
    newText = newText + newLetter;
  }
  return newText;
  //si el codigo de la letra + la contraseña es muy alto sobrepasara el valor de unicode.
}

function decrypt(input, wordCode) {
  try {
    let newText = "";
  for (let i = 0; i < input.length; i++) {
    let letterCode = input[i].codePointAt();
    let newLetterCode = letterCode - wordCode; //en lugar de sumar: restar
    let newLetter = String.fromCodePoint(newLetterCode);
    newText = newText + newLetter;
  }
  return newText;
  } catch (error) {
    //si la contraseña no es correcta puede resultar un codigo negativo
    alert("contraseña invalida");
  }
  
}

function defaultEncrypt(input) {
  let newText = "";
  for (let i = 0; i < input.length; i++) {
    letter = input[i];
    switch (letter) {
      case "a":
        letter = "ai";
        break;
      case "e":
        letter = "enter";
        break;
      case "i":
        letter = "imes";
        break;
      case "o":
        letter = "ober";
        break;
      case "u":
        letter = "ufat";
        break;
      default:
        break;
    }
    newText = newText + letter;
  }
  return newText;
}

function defaultDecrypt(input) {
  let newText = input
    .replaceAll("ai", "a")
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
  return newText;
}

function onCopy() {
  var text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);
}

function animation(newText) {
  document.getElementById("output").textContent = "";

  for (let i = 0; i < newText.length; i++) {
          setTimeout(function() {
            document.getElementById("output").textContent = newText.substring(0, i+1);
          }, 100 * i);
  }
}
