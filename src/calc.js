const pricing = require("../data/pricing.json");
const extras_config = require("../data/extra_config.json");
var pricingDict = {};
var extrasDict = {};

pricing.forEach( item => {
   pricingDict[item.id]  = item
});

extras_config.forEach( item => {
   extrasDict[item.id]  = item
});

function calc(order){

    var baseSum = 0;
    var extrasSum = 0;
    var baseSavings = 0;
    var frameSavings = 0;
    
    var imageCD = false;
    var frameUnits = [];

    order.forEach(function(o){
        if(o.id == 130){imageCD = true;return;}//skip for now
        var _item = pricingDict[o.id];
        if(!_item)throw new Error("BAAAAD DATA");
        baseSum += _item.bp * o.qty;
        var keys = Object.keys(o.extras);
        var temp_extras = 0;
        for(var i=0;i<keys.length;i++){
            var key = keys[i];
            if(!o.extras[key])continue;
            var extra_cfg = extrasDict[key];

            if(key == "frame"){
                frameUnits.push(_item[key]);
            }

            if(o.extras[key] && key != "cards"){
                temp_extras += _item[key];
            }
            
            if(key == "cards"){
                var fullCardPricePaid = false;
                var cardCt = o.extras[key];
                
                for(var j=0;j<cardCt;j++){
                    var price = 40;
                    if(fullCardPricePaid){
                        price = 20;
                    }
                    temp_extras += price;
                    fullCardPricePaid = true;
                }
            }


            if(extra_cfg.conflicts && extra_cfg.conflicts.length > 0){
                for(var k = 0;k< extra_cfg.conflicts.length;k++){
                   if(o.extras[extra_cfg.conflicts[k]]){
                        throw new Error("BAAAAD DATA");
                   }
                }
            }
        }
        extrasSum += temp_extras * o.qty;
    })

    if(imageCD){
        if(baseSum < 175){
            extrasSum += 250
        }else{
            extrasSum += 60
        }
    }

    //save %10 on additional frames
    frameUnits.sort()
    if(frameUnits.length > 1){
        frameUnits.pop()
        var oldSum = frameUnits.reduce(function(acc,val){return acc + val;},0)
        extrasSum -= oldSum;
        var reducedPrices = frameUnits.map(function(price){
            frameSavings += price * 0.10;
            return price * 0.90;
        })
        var newSum = reducedPrices.reduce(function(acc,val){return acc + val;},0)
        extrasSum += newSum;
    }

    if(baseSum > 500){
        baseSavings = baseSum * 0.3
    }else if(baseSum >375){
        baseSavings = baseSum * 0.25
    }else if(baseSum >250){
        baseSavings = baseSum * 0.20
    }else if(baseSum > 175){
        baseSavings = baseSum * 0.15
    }else if(baseSum >100){
        baseSavings = baseSum * 0.1
    }

    var ret = {
        total : baseSum + extrasSum - baseSavings,
        base : baseSum,
        extrasSum : extrasSum,
        baseSavings : baseSavings,
        frameSavings : frameSavings
    }

    return ret;

}

export {calc}