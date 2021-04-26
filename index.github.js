var CryptoJS = require('crypto-js');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var BIP39 = require('bip39');
var HDKEY = require('ethereumjs-wallet/hdkey');
var CSA = require('ethereum-checksum-address');







function computeAddressFromPrivKeyHtml()
{
  var privKey =document.getElementById("input").value;	
  var keyPair = ec.genKeyPair();
  keyPair._importPrivate(privKey, 'hex');
  var compact = false;
  var pubKey = keyPair.getPublic(compact, 'hex').slice(2);
  var pubKeyWordArray = CryptoJS.enc.Hex.parse(pubKey);
  var hash = CryptoJS.SHA3(pubKeyWordArray, { outputLength: 256 });
  var address = hash.toString(CryptoJS.enc.Hex).slice(24);

  document.write('Ethereum address : ', '0x' + address);

};




function addOnClick()
{
  var x = document.getElementById("monbouton");
  x.addEventListener("click", computeAddressFromPrivKeyHtml, false);
}
window.onload=addOnClick;















