pragma solidity ^0.4.8;
//import "github.com/Arachnid/solidity-stringutils/strings.sol";



contract Box {
    
    
    address public owner ;


    struct clientandsupplier {
    string name;
    uint balance;
    }
    mapping(address=>clientandsupplier)  public suppliers;
    mapping(address=>clientandsupplier)  public clients;
    mapping(address=>product) public supplierstock ;
    mapping(address=>product) public clientstock;
    uint public suppliercount ;
    address[]  public supplierList;

    string public productnames;
    
    struct product {
         string name ;
         uint quantity ;
         uint unitprice ;
        
    }
    function getSupplierCount() constant returns(uint count){

            count=suppliercount;
    }

    function getSupplierAddress(uint count) constant returns(address add){

           add=supplierList[count-1];
    }
    function addSupplier(address supplier_address,string supplier_name, uint bal)  {
        clientandsupplier   supp;

        supp.name=supplier_name;
        supp.balance=bal;
        suppliers[supplier_address]=supp;
        suppliercount= suppliercount+1;
        supplierList.push(supplier_address);
    }
    
    
    function addClient(address client_address, string client_name, uint bal)   {
         clientandsupplier   client;
         client.name=client_name;
         client.balance=bal;

         clients[client_address]=client ;
        
    }
    
    
    function  check_Client(address cl_address) constant returns (bool Box_member){
        
        if (nullcheck(clients[cl_address].name))
            Box_member=false ;
        else  
            Box_member=true;
        
        
    
    }
    
    
    
    function  check_supplier(address  sr_address) constant  returns(bool Box1_member){
                
                if (nullcheck(suppliers[sr_address].name))
                    Box1_member=false ;
                else  
                    Box1_member=true;
                
                
            }
            
    function nullcheck(string message )  constant returns(bool isnull){
     
                bytes memory tempEmptyStringTest = bytes(message); // Uses memory
                            if (tempEmptyStringTest.length == 0) {
                                    isnull=true;
                            } else {
                                
                                    isnull=false;
                            
                            }
     
     }
   

    
    
    function pushProducttoBox(address to, string name, uint price, uint quantity) {
        product prod;
        prod.name=name;
        prod.unitprice=price;
        prod.quantity=quantity;
        supplierstock[to]=prod;
       
    }
    
    
    function getProductsSupplier(address ofsupplier) constant returns (string prod_name,uint prod_quant,uint unit_price,uint unit_bal) {

        product allProd= supplierstock[ofsupplier];
        prod_name=allProd.name;
        prod_quant=allProd.quantity;
        unit_price=allProd.unitprice;
        unit_bal=getBalanceSeller(ofsupplier);

     }


      function getProductsBuyer(address ofbuyer) constant returns (string prod_name,uint prod_quant,uint unit_price,uint unit_bal) {

        product allProd= clientstock[ofbuyer];
        prod_name=allProd.name;
        prod_quant=allProd.quantity;
        unit_price=allProd.unitprice;
        unit_bal=getBalanceBuyer(ofbuyer);

     }


     function buyProducts(address from,address to,uint quantity1){
        product sellerProducts = supplierstock[from] ;  
        product clientprod;
        clientprod.name=sellerProducts.name ;
        clientprod.quantity=quantity1;
        clientstock[to]=clientprod;
        supplierstock[from].quantity=supplierstock[from].quantity-quantity1;
        suppliers[from].balance= suppliers[from].balance + quantity1*supplierstock[from].unitprice ;
        clients[to].balance=clients[to].balance - quantity1*supplierstock[from].unitprice ;

     }



    function getBalanceSeller(address seller) constant returns(uint bal){

         bal=suppliers[seller].balance;
    }


     function getBalanceBuyer(address client) constant returns(uint bal){

         bal=clients[client].balance;
    }




    
}







