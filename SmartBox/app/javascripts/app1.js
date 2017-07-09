// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import supplier_artifacts from '../../build/contracts/Supplier2.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Supplier2 = contract(supplier_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Supplier2.setProvider(web3.currentProvider);

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

      accounts = accs;
      account = accounts[0];

      self.refreshBalance(account[0]);
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },




  refreshBalance: function(address) {
    var self = this;

    var meta;
    Supplier2.deployed().then(function(instance) {
      meta = instance;
      return meta.suppliergetProducts(address);
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
     
      var table = document.getElementById("table");

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
          var cell4=row.insertCell(2);

          

          // Add some text to the new cells:
          cell1.innerHTML = account;
          cell2.innerHTML = value[0].valueOf();
          cell3.innerHTML = value[2].valueOf() ;
          cell4.innerHTML = value[1].valueOf();
      }
      console.log(value)
      balance_element.innerHTML = value[1].valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;
    console.log(receiver)
    console.log(amount)
    console.log(account)

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    Supplier2.deployed().then(function(instance) {
      meta = instance;
      return meta.sellProducts(account,receiver,'test',amount,{from: web3.eth.accounts[0], gas: 200000});
    }).then(function() {
      self.setStatus("Transaction complete!");
      self.refreshBalance(account);
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }

  

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
