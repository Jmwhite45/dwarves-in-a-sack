import { constants } from "./scripts/constants.js";
import { actor2Item5e } from "./scripts/actor2Item.js";


function actor2Item(actor, system){
    switch(system)
    {
        case 'dnd5e':
            return actor2Item5e(actor)
    }
}


Hooks.on("init", function(){
    CONFIG.Item.dataModels.loot.itemCategories.actor = {label: 'Person'}
})

Hooks.on("dnd5e.dropItemSheetData",function(container, app, data){
    if(container.type != "container") return;

    if(data.type == "Actor"){
        let actor = game.actors.get(data.uuid.replace("Actor.",""))

        actor2Item(actor, game.system.id).then(async (actorItemData)=>{
            const toCreate = await Item.implementation.createWithContents([actorItemData], {
                container: container,
            })
            const created = Item.implementation.createDocuments(toCreate, { pack: container.pack, parent: container.actor, keepId: true, permission: container.permission});
        })
    }
})