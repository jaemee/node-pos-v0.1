module.exports = function main(inputs) {
    console.log("Debug Info");
    let inventory = printReceipt(inputs);
    return inventory;
};

function printReceipt(inputs){
    let receiptText = '***<store earning no money>Receipt ***\n';
    var name = '';
    var unit = '';
    var singlePrice = '';
    var price = 0;
    var unitCount = 0;
    var counter = 1;
    var total = 0;
    
    
   inputs.forEach(item => {
       if(counter === 1){
           name = item.Name;
           unit = item.Unit;
           price = item.Price;
           singlePrice = item.Price;
           unitCount++;
       }else if (name === item.Name){
            price = price + item.Price;
            unitCount++;
       }else if(name !== item.Name && counter < inputs.length){
           if(unitCount > 1){
            unit = unit + 's';
           }
            receiptText = receiptText + 'Name: ' + name + ', Quantity: ' + unitCount + ' ' + unit + ', Unit price: ' + singlePrice.toFixed(2) + ' (yuan), Subtotal: ' + price.toFixed(2) + ' (yuan)\n';
            name = item.Name;
            unit = item.Unit;
            price = item.Price;
            singlePrice = item.Price;
            unitCount = 1;
       }
       if (counter === inputs.length){
        if(unitCount > 1){
         unit = unit + 's';
        }
            receiptText = receiptText + 'Name: ' + name + ', Quantity: ' + unitCount + ' ' + unit + ', Unit price: ' + singlePrice.toFixed(2) + ' (yuan), Subtotal: ' + price.toFixed(2) + ' (yuan)\n';
            name = item.Name;
            unit = item.Unit;
            price = item.Price;
            singlePrice = item.Price;
            unitCount = 1;
            total = total + singlePrice;
            receiptText = receiptText + 'Name: ' + name + ', Quantity: ' + unitCount + ', Unit price: ' + singlePrice.toFixed(2) + ' (yuan), Subtotal: ' + price.toFixed(2) + ' (yuan)\n';
            receiptText = receiptText + '----------------------\n' + 
                'Total: ' + total.toFixed(2) + ' (yuan)\n' + 
                '**********************\n';
        }
        total = total + singlePrice;
        counter++;
   });

   return receiptText;
};
