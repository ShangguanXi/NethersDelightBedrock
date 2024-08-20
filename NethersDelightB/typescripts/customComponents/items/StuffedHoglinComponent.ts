import { ItemComponentUseOnEvent, ItemCustomComponent, Player, StructureRotation, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
import { ItemAPI } from "../../lib/ItemAPI";

class StuffedHoglinComponent implements ItemCustomComponent {
    constructor() {
        this.onUseOn = this.onUseOn.bind(this);
    }
    onUseOn(args: ItemComponentUseOnEvent) {
        const itemStack = args.itemStack;
        const itemId = itemStack.typeId;
        const block = args.block;
        const dimension = args.source.dimension;
        const source = args.source as Player
        if (itemId == "nethersdelight:stuffed_hoglin") {
            let rot = source.getRotation().y
            if (rot > 180) rot -= 360;
            if (-45 <= rot && rot < 45) {
                const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z+1 }
                if (dimension.getBlock(location)?.typeId == "minecraft:air"){
                    const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z }
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.None })
                }
            }
            else if (45 <= rot && rot < 135) {
                const location = { x: block.location.x-1, y: block.location.y + 1, z: block.location.z }
                if (dimension.getBlock(location)?.typeId == "minecraft:air"){
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.Rotate90 })
                }
               
            }
            else if (-135 <= rot && rot < -45) {
                const location = { x: block.location.x+1, y: block.location.y + 1, z: block.location.z }
                if (dimension.getBlock(location)?.typeId == "minecraft:air"){
                    const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z }
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.Rotate270 })
                }
            }
            else if (135 <= rot || rot < -135) {
                const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z-1 }
                if (dimension.getBlock(location)?.typeId == "minecraft:air"){
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.Rotate180 })
                }
            };
            if (source.getGameMode()=="creative")return
            ItemAPI.clear(source,source.selectedSlotIndex)
        }
    }
}
export class StuffedHoglinComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.itemComponentRegistry.registerCustomComponent('nethersdelight:stuffed_hoglin', new StuffedHoglinComponent());

    }
}