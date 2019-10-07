module.exports = function main(inputs) {
    console.log("Debug Info");
    let inventory = printReceipt(inputs);
    return inventory;
};

function printReceipt(inputs){
    const barCodes = [...new Set(inputs.map(input => input.Barcode))];
    var itemList = processData(inputs, barCodes);
   return createReceipt(itemList);
};

function processData(inputs, barCodes){
    var itemList = [];
    barCodes.forEach(barCode => {
        var item = {};
        var itemName = inputs.filter(input => input.Barcode === barCode)
                            .map(input => input.Name)[0];
        var itemPrice = inputs.filter(input => input.Barcode === barCode)
                            .map(input => input.Price)[0];   
        var itemUnit = inputs.filter(input => input.Barcode === barCode)
                            .map(input => input.Unit)[0];  
        var totalPricePerItem = inputs.filter(input => input.Barcode === barCode)
                                .map(input => input.Price)
                                .reduce((price, totalPrice) => price + totalPrice, 0);
        var quantity = inputs.filter(input => input.Barcode === barCode)
                                .reduce((totalQuantity) => totalQuantity+1, 0);

        item = {
            Barcode: barCode,
            ItemName: itemName,
            ItemPrice: itemPrice,
            TotalPrice: totalPricePerItem,
            Quantity: quantity,
            Unit: itemUnit
        }
        itemList.push(item);
    });
    return itemList;
}

function createReceipt(itemList){
    let receiptText = '***<store earning no money>Receipt ***\n';
    itemList.forEach(item => {
      receiptText += 'Name: ' + item.ItemName + ', Quantity: ' + item.Quantity + '' + setUnitName(item.Quantity, item.Unit) + ', Unit price: ' + item.ItemPrice.toFixed(2) + ' (yuan), Subtotal: ' + item.TotalPrice.toFixed(2) + ' (yuan)\n';
    })

    var totalPrice = itemList.map(item => item.TotalPrice)
                         .reduce((price, totalPrice) => price + totalPrice, 0);

    receiptText += '----------------------\n' + 
             'Total: ' + totalPrice.toFixed(2) + ' (yuan)\n' + 
             '**********************\n';
    return receiptText;
};

function setUnitName(quantity, unit){
    if(unit === 'a'){
        return '';
    }
    if(quantity > 1){
        return ' ' + unit + 's';
    }
};


