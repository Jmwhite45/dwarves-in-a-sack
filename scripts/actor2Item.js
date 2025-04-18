function Level2Rarity5e(lv)
{
    if(lv<=5){
        return "common"
    }
    else if(lv<=8){
        return "uncommon"
    }
    else if(lv<=11){
        return "rare"
    }
    else if(lv<=14){
        return "veryRare"
    }
    else if(lv<=17){
        return "legendary"
    }
    else{
        return "artifact"
    }
}

export async function actor2Item5e(actor){
     return {
        name: actor.name,
        img: actor.img,
        type: "loot",
        "system.rarity": Level2Rarity5e(actor.system.details.level),
        "system.type.value": "actor",
        "system.type.label": "Person",
        "system.weight.units":"lb",
        "system.weight.value": (parseInt(actor.system.details.weight?.replace(/[^0-9]/g, ''))||0)+actor.system.attributes.encumbrance.value,
        "system.description.value": `<p>@UUID[${actor.uuid}]{${actor.name}}</p>`,
    }
}