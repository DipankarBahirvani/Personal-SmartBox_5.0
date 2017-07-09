// Import the page's CSS. Webpack will know what to do with it.
//import "stylesheets/app.css";
// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
var SolidityCoder = require("web3/lib/solidity/coder.js");

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.

import box_artifcats from '../../build/contracts/Box.json'
import toolsupplier_artifacts from '../../build/contracts/ToolSupplier.json'
import buyer_artifcats from '../../build/contracts/buyer.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var ToolSupplier = contract(toolsupplier_artifacts);
var Box= contract(box_artifcats);
var Buyer=  contract(buyer_artifcats);

var HashBox ;
var HashSupplier;
var HashBuyer;

var dict = {};

console.log(ToolSupplier);
console.log(Box);
console.log(Buyer);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;
    var bal;

    // Bootstrap the MetaCoin abstraction for Use.
       ToolSupplier.setProvider(web3.currentProvider);
       Box.setProvider(web3.currentProvider);
       Buyer.setProvider(web3.currentProvider);


      dict[web3.eth.accounts[1]]="5b3231342c2036392c2033342c203132362c203230375d" ;


    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      web3.eth.defaultAccount = web3.eth.accounts[0];
      accounts = accs;
      account = accounts[0];
      console.log(account);

      var href = document.location.href;
      var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
      console.log(lastPathSegment);


      if(lastPathSegment=='Transaction.html'){
        console.log("Entering");
        HashBox = self.getFunctionHashes(Box.abi);
        HashSupplier=self.getFunctionHashes(ToolSupplier.abi);
        HashBuyer=self.getFunctionHashes(Buyer.abi);

       self.getTransactionsByAccount("*");
      }

      //self.refreshBalance();
    });
  },

  setStatus: function(message) {
    //var status = document.getElementById("status");
    //status.innerHTML = message;
  },


 getcall: function(){
    var result;
    var self = this;

   $.ajax({
   async: false,
   type:"GET",
   url:"http://10.223.90.210:5000/rfid/",
   contentType: "application/json", //必须有
   dataType: "json", //type of return value
   success:function(data){
     result=data[0].cardUID;
     


      //alert("OK");
   }

   })

   if(result==dict[web3.eth.accounts[1]])
       { console.log("Entering"); 
         self.getcall1("Buyer","Verified");
       }
  },


  getcall1: function(a,b){

   var ur='http://10.223.90.210:5000/lcd?line1='+a+'&line2='+b;
   console.log(ur);

   $.ajax({
   async: false,
   type:"GET",
   url: ur ,
   contentType: "application/json", //必须有
   dataType: "json", //type of return value
   success:function(data){
     // console.log(data[0].cardUID);
      //console.log(data[1].cardUID);
      

      //alert("OK");
   }

   })
  },


getFunctionHashes: function(abi) {
  console.log(abi);
  var hashes = [];
  for (var i=0; i<abi.length; i++) {
    var item = abi[i];
    if (item.type != "function") continue;
    var signature = item.name + "(" + item.inputs.map(function(input) {return input.type;}).join(",") + ")";
    var hash = web3.sha3(signature);
    //console.log(item.name + '=' + hash);
    hashes.push({name: item.name, hash: hash});
  }
  return hashes;
},


 findFunctionByHash: function(hashes, functionHash) {
  for (var i=0; i<hashes.length; i++) {
    if (hashes[i].hash.substring(0, 10) == functionHash.substring(0, 10))
      return hashes[i].name;
  }
  return null;
},

 getTransactionsByAccount : function(myaccount, startBlockNumber, endBlockNumber) {

  //var balance_element = document.getElementById("TransactionTable");
      var self=this;

      var table = document.getElementById('table2');
      console.log(table);

      while(table.rows.length > 1) {
          table.deleteRow(1);
  }
      var i=0;
  if (endBlockNumber == null) {
    endBlockNumber = web3.eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 100;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 100 == 0) {
     // console.log("Searching block " + i);
    }
    var block = web3.eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      var counter=1;
      block.transactions.forEach( function(e) {

         var transaction=web3.eth.getTransactionReceipt(e.hash);

         console.log(transaction.gasUsed);
         var row = table.insertRow(counter);



        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
          /*console.log("  tx hash          : " + e.hash + "\n"
            + "   nonce           : " + e.nonce + "\n"
            + "   blockHash       : " + e.blockHash + "\n"
            + "   blockNumber     : " + e.blockNumber + "\n"
            + "   transactionIndex: " + e.transactionIndex + "\n"
            + "   from            : " + e.from + "\n"
            + "   to              : " + e.to + "\n"
            + "   value           : " + e.value + "\n"
            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
            + "   gasPrice        : " + e.gasPrice + "\n"
            + "   gas             : " + e.gas + "\n"
            + "   input           : " + e.input);*/





          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3=row.insertCell(2);
          var cell4=row.insertCell(3);

          var cell5=row.insertCell(4);
          var cell6=row.insertCell(5);


       var find = self.findFunctionByHash(HashBuyer,e.input);
       if(find==null)
          find=   self.findFunctionByHash(HashSupplier,e.input);
       if(find==null)
          find=  self.findFunctionByHash(HashBox,e.input);



          // Add some text to the new cells:
          cell1.innerHTML = e.blockNumber;
          if(find!=null)
          cell2.innerHTML = find;
          else
          cell2.innerHTML = 'Internal Blockchain Transaction';
          cell3.innerHTML = e.gasPrice;
          cell4.innerHTML = transaction.gasUsed;

          cell5.innerHTML=e.from;

          cell6.innerHTML=e.to;

          counter++;

        }
      })
    }
  }
} ,

refreshBalance: function(){

  var self=this;
  var box;
  var count=0;
  var address=[];
  //Box.deployed().then(function(instance){box=instance});
  //Box.deployed().then(function(instance){box=instance});
 
  var suppliercount;
  Box.deployed().then(function(instance) {
      console.log("entering");
      box=instance ;
      return box.getSupplierCount();

    }

      console.log(suppliercount);
      //suppliercount = suppliercount['c'][0];

      if(suppliercount>0){
        while(count<=suppliercount){
          address.push(box.getSupplierAddress(count));
          count=count+1;
        }
      }
      return address;

}).then((address) =>{
     
     console.log("*****");
     console.log(address);

    var table = document.getElementById("table1");

      while(table.rows.length > 1) {
          table.deleteRow(1);
      }


      for (var i = 0; i < address.length; i++) { 
          //console.log("Length"address[i]);
          console.l
          var value=box.getProductsSupplier(address[i]);
          var row = table.insertRow(i+1);

          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3=row.insertCell(2);
          var cell4=row.insertCell(3);
          var cell5=row.insertCell(4);



          // Add some text to the new cells:
          cell1.innerHTML = address[i];
          cell2.innerHTML = value[0].valueOf();
          cell3.innerHTML = value[2].valueOf() ;
          cell4.innerHTML = value[1].valueOf();

          //var temp=web3.toBigNumber(meta.getBalanceSeller(account));
          cell5.innerHTML= value[3].valueOf();

      } 



   }

  //console.log(box);
  //console.log(suppliercount);
  //var suppliercount=box.getSupplierCount();
  
  //console.log(suppliercount);
  
  
)
  

},

 refreshBalance2: function() {

    var self = this;
    //refreshBalance1();


    var meta;
    var meta1;
    var val;





      //ToolSupplier.setProvider(web3.currentProvider);
      Box.deployed().then(function(instance) {
      meta = instance;
      return meta.getProductsSupplier(web3.eth.accounts[0]);
       //return meta.getBalanceSeller(account);
    }).then(function(value) {

      var table = document.getElementById("table1");

      while(table.rows.length > 1) {
          table.deleteRow(1);
  }
      var i=0;


      for(i=0;i<1;i++){




          // Create an empty <tr> element and add it to the 1st position of the table:
          var row = table.insertRow(1);

          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3=row.insertCell(2);
          var cell4=row.insertCell(3);
          var cell5=row.insertCell(4);



          // Add some text to the new cells:
          cell1.innerHTML = account;
          cell2.innerHTML = value[0].valueOf();
          cell3.innerHTML = value[2].valueOf() ;
          cell4.innerHTML = value[1].valueOf();

          //var temp=web3.toBigNumber(meta.getBalanceSeller(account));
          cell5.innerHTML= value[3].valueOf();



      }
     // console.log(value)

    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },







  sendCoin: function() {
    var self = this;
   // ToolSupplier.setProvider(web3.currentProvider);
    var amount = parseInt(document.getElementById("sellForm").elements["amount"].value);
    var receiver = document.getElementById("sellForm").elements["receiver"].value;
    console.log(receiver);
    console.log(amount);
    console.log(account);
   // self.getcall();
    // buyProduct  address ofBox, address ofseller, address ofbuyer, uint quantity
    //Uncomment this method for Rasperyyy pi 
    this.setStatus("Initiating transaction... (please wait)");
    var box;
    var meta;
     Box.deployed().then(function(instance){box=instance});


     Buyer.deployed().then(function(instance) {
      meta = instance;
      return meta.buyProduct(box.address,web3.eth.accounts[0],receiver,amount,{from: web3.eth.accounts[0], gas: 200000});
    }).then(function() {
      self.setStatus("Transaction complete!");
      //Uncomment this method for Rasberry Pi
      //self.getcall1("Purchase","Successfull");
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  },

    addBuyers: function(){
    var self=this;
    var client_address = document.getElementById("addClientAddr").value;
    console.log(client_address);
    this.setStatus("Initiating transaction... (please wait)");
     var meta;
     var box ;

      Box.deployed().then(function(instance){box=instance})

      Buyer.deployed().then(function(instance) {
      meta = instance;
      return meta.addClienttoBox(box.address,client_address,1000,'Test',{from: client_address, gas: 200000 , gasPrice : 100000});
    }).then(function() {
      self.setStatus("Transaction complete!");
      //self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error in adding client see log.");
    });


  },


   addSuppliers: function(){


    var self=this;
    var supp_address=document.getElementById("addSupplierAddr").value ;
    console.log(supp_address);
    this.setStatus("Initiating transaction... (please wait)");
     var meta;
     var box;
     console.log(Box.deployed());
     Box.deployed().then(function(instance){box=instance});
     console.log('*******');
     
     ToolSupplier.deployed().then(function(instance) {
      meta = instance;
      //console.log(web3.eth.accounts[0]);
      console.log("Hello");
      console.log(meta);
      return meta.addSupplierToBox(box.address,supp_address,1000,'Test',{from: supp_address, gas: 200000, gasPrice : 100000});
    }).then(function() {
      self.setStatus("Transaction complete!");
     // self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error in adding client see log.");
    });





   }



};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(Web3.givenProvider);
    //window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
