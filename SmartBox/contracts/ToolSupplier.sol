 pragma solidity ^0.4.8;
 import "./Box.sol" ;
 contract ToolSupplier {
      address public owner ;
      
      struct details {
          string name ;
          uint balance ;
          
      }
      mapping(address => details)  public clientmapping ;
      
      
      function ToolSupplier(){
          
           owner=msg.sender;
           
      }
      
      
      function addSupplierToBox(address ofBox,address ofclient, uint balance, string name){
          
         /* details d ;
          d.name=name;
          d.balance=balance;
          clientmapping[ofclient]=d;*/
          Box box=Box(ofBox);
          //box.addSupplier.value(10).gas(800)(ofclient,name,balance);
          box.addSupplier(ofclient,name,balance);
          
      }


      function addToolsToBox(address ofBox,address by, string name, uint price, uint quantity){

          Box box=Box(ofBox);
          //box.pushProducttoBox.value(10).gas(800)(by,name,price,quantity);
          box.pushProducttoBox(by,name,price,quantity);

      }
      
      
 }  