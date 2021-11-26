var CryptoJS = require('crypto-js');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var BIP39 = require('bip39');
var HDKEY = require('ethereumjs-wallet/hdkey');
var CSA = require('ethereum-checksum-address');
var Web3 = require('web3');

var BigNumber = require('bignumber.js');
var BN = require('bn.js');

/////////////
/*

var varc = "je suis le maitre du monde";
var pass = "mdp";


function encryption(clearMessage, password)
{
	var encrypted = CryptoJS.AES.encrypt(clearMessage, password);
	return encrypted
};


function decryption(encryptedMessage, password)
{
	var decrypted = CryptoJS.AES.decrypt(encryptedMessage, password);
	return decrypted
};

//console.log("message : " + varc);
//var varc2 = encryption(varc, pass);
//console.log("message : " + varc2.toString());
//var varc3 = decryption(varc2, pass);
//console.log("message : " + varc3.toString(CryptoJS.enc.Utf8));

*/
/////////////////////


// Variables definition
const addressFrom = '0x3f1Eae7D46d88F08fc2F8ed27FCb2AB183EB2d0E';
const addressTo = '0xe2148eE53c0755215Df69b2616E552154EdC584f';
const web3 = new Web3('http://192.168.1.10:7545');







const balances = async () =>
{
   const balanceFrom = web3.utils.fromWei(
      await web3.eth.getBalance(addressFrom),
      'ether'
   );
   const balanceTo = await web3.utils.fromWei(
      await web3.eth.getBalance(addressTo),
      'ether'
   );

   console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH.`);
   console.log(`The balance of ${addressTo} is: ${balanceTo} ETH.`);


};






web3.eth.getBalance("0x3f1Eae7D46d88F08fc2F8ed27FCb2AB183EB2d0E")
.then(function(balance)
{
	web3.eth.getGasPrice()
	.then(function(gasPrice)
	{
		var BN21000 = new BigNumber('21000', 10);
		var result = balance - (gasPrice * BN21000);
		console.log("resulte async 1 = " + result);
	});
});




async function calculTotalFee()
{
	const balance = await web3.eth.getBalance("0x3f1Eae7D46d88F08fc2F8ed27FCb2AB183EB2d0E");
	const gasPrice = await web3.eth.getGasPrice();
	const BN21000 = new BigNumber('21000', 10);
	return (balance-(gasPrice * BN21000));
}



calculTotalFee()
.then(function(totalFee)
{
console.log("resulte async 2 = " + totalFee);
});






async function sendTransaction()
{

	const keystore = "b6b15c8cb491557369f3c7d2c287b053eb229daa9c22138887752191c9520659";
//var privateKeystore = Buffer.from('b6b15c8cb491557369f3c7d2c287b053eb229daa9c22138887752191c9520659', 'hex');
	const gasPrice = await web3.eth.getGasPrice();
	const totalFee = await calculTotalFee();

	const rawTransaction = 
	{
		"from": "0x3f1Eae7D46d88F08fc2F8ed27FCb2AB183EB2d0E",
		"to": "0xe2148eE53c0755215Df69b2616E552154EdC584f",
		"value": web3.utils.toHex(totalFee),
		"gas": 21000,
		"chainId": 5777,
		"gasPrice": gasPrice
	};

//var privateKey = Buffer.from('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex');

        //const receipt = await web3.eth.sendTransaction(rawTransaction).then(receipt => console.log("Transaction receipt: ", receipt));

	const transactionData = await web3.eth.accounts.signTransaction(rawTransaction, keystore);
	const receipt = await web3.eth.sendSignedTransaction(transactionData.rawTransaction);


	return receipt;

}

sendTransaction()
.then(function(receipt)
{
console.log(receipt);
});







generatePairKey();	




function generateMnemonic()
{
    return BIP39.generateMnemonic()
};



function generatePrivKey(mnemonic)
{
//seedHex = BIP39.mnemonicToSeedSync(mnemonic).toString('hex');
seedHex = BIP39.mnemonicToSeedSync(mnemonic);

console.log('pkey3 :' + HDKEY.fromMasterSeed(seedHex).derivePath(`m/44'/60'/0'/0/0`).getWallet().getPrivateKey().toString("hex"));

//	return HDKEY.fromMasterSeed(seedHex).derivePath(`m/44'/60'/0'/0/0`).getWallet().getPrivateKeyString()
return HDKEY.fromMasterSeed(seedHex).derivePath(`m/44'/60'/0'/0/0`).getWallet().getPrivateKey()

};


function computeAddressFromPrivKey(privKey)
{
  var keyPair = ec.genKeyPair();
 console.log("coucou"+ privKey.toString());
	keyPair._importPrivate(privKey, 'hex');
	 console.log("keypair : " + JSON.stringify(keyPair.priv));
  var compact = false;
  var pubKey = keyPair.getPublic(compact, 'hex').slice(2);
  var pubKeyWordArray = CryptoJS.enc.Hex.parse(pubKey);
  var hash = CryptoJS.SHA3(pubKeyWordArray, { outputLength: 256 });
  var address = hash.toString(CryptoJS.enc.Hex).slice(24);

  return address;
};



function generatePairKey()
{


mnemonic = generateMnemonic();
//mnemonic = "indoor dish desk flag debris potato excuse depart ticket judge file exit";

console.log('mnemonic : ' + mnemonic);

var isValid = BIP39.validateMnemonic(mnemonic);

if(isValid)
{
//privateKey = generatePrivKey(mnemonic);

//privateKey = Buffer.from('0000000000000000000000000000000000000000000000000000000000000001', 'hex');

privateKey = Buffer.from('1231373191231373191231373191231373191231373191231373191231373191231373191231373190', 'hex');

//privateKey = Buffer.from('0000000000000000000000000000000000000000000000000000000000000001', 'hex');


console.log('pvkey hex : ', privateKey.toString('hex'));

console.log('pvkey string  : ', privateKey.toString('utf8'));


}


console.log('Ethereum address : ', '0x' + computeAddressFromPrivKey(privateKey));
console.log('Ethereum address checksumed : '+  CSA.toChecksumAddress(computeAddressFromPrivKey(privateKey)));



var pute = "1231373191231373191231373191231373191231373191231373191231373191231373191231373190";

console.log("pute : " + pute.toString(16));

//document.write(computeAddressFromPrivKey(privateKey));

}




