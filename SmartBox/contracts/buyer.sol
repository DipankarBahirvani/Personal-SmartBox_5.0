 pragma solidity ^0.4.8;
 import "./Box.sol" ;
 contract buyer {
      address public owner ;
      
      struct details {
          string name ;
          uint balance ;
          
      }
      mapping(address => details)  public clientmapping ;
      
      
      function buyer(){
          
           owner=msg.sender;
           
      }
      
      
      function addClienttoBox(address ofBox,address ofclient, uint balance, string name){
          
          Box box=Box(ofBox);
          box.addClient(ofclient,name,balance);
          
      }


      function buyProduct(address ofBox, address ofseller, address ofbuyer, uint quantity){

          Box box=Box(ofBox);
          box.buyProducts(ofseller,ofbuyer,quantity);
          

      }
      
      
 }
