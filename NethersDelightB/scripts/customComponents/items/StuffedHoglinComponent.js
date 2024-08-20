var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { StructureRotation, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
import { ItemAPI } from "../../lib/ItemAPI";
class StuffedHoglinComponent {
    constructor() {
        this.onUseOn = this.onUseOn.bind(this);
    }
    onUseOn(args) {
        const itemStack = args.itemStack;
        const itemId = itemStack.typeId;
        const block = args.block;
        const dimension = args.source.dimension;
        const source = args.source;
        if (itemId == "nethersdelight:stuffed_hoglin") {
            let rot = source.getRotation().y;
            if (rot > 180)
                rot -= 360;
            if (-45 <= rot && rot < 45) {
                const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z + 1 };
                if (dimension.getBlock(location)?.typeId == "minecraft:air") {
                    const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.None });
                }
            }
            else if (45 <= rot && rot < 135) {
                const location = { x: block.location.x - 1, y: block.location.y + 1, z: block.location.z };
                if (dimension.getBlock(location)?.typeId == "minecraft:air") {
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.Rotate90 });
                }
            }
            else if (-135 <= rot && rot < -45) {
                const location = { x: block.location.x + 1, y: block.location.y + 1, z: block.location.z };
                if (dimension.getBlock(location)?.typeId == "minecraft:air") {
                    const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.Rotate270 });
                }
            }
            else if (135 <= rot || rot < -135) {
                const location = { x: block.location.x, y: block.location.y + 1, z: block.location.z - 1 };
                if (dimension.getBlock(location)?.typeId == "minecraft:air") {
                    world.structureManager.place("nethersdelight:stuffed_hoglin", dimension, location, { rotation: StructureRotation.Rotate180 });
                }
            }
            ;
            if (source.getGameMode() == "creative")
                return;
            ItemAPI.clear(source, source.selectedSlotIndex);
        }
    }
}
export class StuffedHoglinComponentRegister {
    register(args) {
        args.itemComponentRegistry.registerCustomComponent('nethersdelight:stuffed_hoglin', new StuffedHoglinComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], StuffedHoglinComponentRegister.prototype, "register", null);
//# sourceMappingURL=StuffedHoglinComponent.js.map