module.exports = function main(inputs) {
    console.log("Debug Info");
    let inventory = printReceipt(inputs);
    return inventory;
};

function printReceipt(inputs){
    let receiptText = '***<store earning no money>Receipt ***\n';
    var name = '';
    var unit = '';
    var singlePrice = 0;
    var price = 0;
    var quantity = 0;
    var counter = 1;
    var total = 0;
    
    
   inputs.forEach(item => {
       if(counter === 1){
            setItemInfos(item);
            quantity++;
       }else if (name === item.Name){
            price = price + item.Price;
            quantity++;
       }else if(name !== item.Name && counter < inputs.length){
            unit = setUnitName(quantity, unit)
            receiptText += createReceipt(name, quantity, unit, singlePrice, price);
            setItemInfos(item);
            quantity = 1;
       }
       if (counter === inputs.length){
            unit = setUnitName(quantity, unit)
            receiptText += createReceipt(name, quantity, unit, singlePrice, price);
            setItemInfos(item);

            quantity = 1;
            total = total + singlePrice;
            unit = setUnitName(quantity, unit)
            receiptText += createReceipt(name, quantity, unit, singlePrice, price);
            
            receiptText = receiptText + '----------------------\n' + 
                'Total: ' + total.toFixed(2) + ' (yuan)\n' + 
                '**********************\n';
        }
        total = total + singlePrice;
        counter++;
   });

   function setItemInfos(item){
    name = item.Name;
    unit = item.Unit;
    price = item.Price;
    singlePrice = item.Price;
   };

   return receiptText;
};

   function setUnitName(quantity, unit){
    var unitName = '';
    if(unit === 'a'){
        return '';
    }
    if(quantity > 1){
        return ' ' + unit + 's';
    }
   };

   function createReceipt(name, quantity, unit, singlePrice, price){
        return 'Name: ' + name + ', Quantity: ' + quantity + '' + unit + ', Unit price: ' + singlePrice.toFixed(2) + ' (yuan), Subtotal: ' + price.toFixed(2) + ' (yuan)\n';
   };
