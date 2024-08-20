import { BlockPermutation, Container, Direction, ItemComponentUseOnEvent, ItemCustomComponent, Player, WorldInitializeBeforeEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
import { ItemAPI } from "../../lib/ItemAPI";

class ColoniesComonent implements ItemCustomComponent{
    constructor() {
        this.onUseOn = this.onUseOn.bind(this);
    }
    onUseOn(args: ItemComponentUseOnEvent): void {
        const itemStack = args.itemStack;
        const block = args.block;
        const  blockFilter=  [
            "nethersdelight:rich_soul_soil",
            "minecraft:mycelium",
            "minecraft:crimson_nylium",
            "minecraft:warped_nylium"
        ]
        if (itemStack.typeId !== 'nethersdelight:warped_fungus_colony' && itemStack.typeId !== 'nethersdelight:crimson_fungus_colony') return
        if (args.blockFace != Direction.Up) return
        if (blockFilter.includes(block.typeId)){
            const player = args.source as Player
            const main = block.above();
            const mainPerm = BlockPermutation.resolve(itemStack.typeId, { 'farmersdelight:growth': 4 });
            main?.setPermutation(mainPerm);
            if (player.getGameMode()=="creative") return
            ItemAPI.clear(player, player.selectedSlotIndex);
        }
       
    }

}
export class ColoniesComonentRegister{
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args:WorldInitializeBeforeEvent){
        args.itemComponentRegistry.registerCustomComponent('nethersdelight:colonies', new ColoniesComonent())
    }
  
}
