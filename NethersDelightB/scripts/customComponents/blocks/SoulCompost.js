var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, WorldInitializeBeforeEvent, BlockPermutation, BlockVolume } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
const organicCompostDetectList = [
    'minecraft:soul_sand',
    'minecraft:soul_soil',
    'minecraft:podzol',
    'minecraft:mycelium',
    'minecraft:nether_wart',
    'minecraft:bone_block',
    'nethersdelight:soul_compost',
    'nethersdelight:rich_soul_soil',
    'minecraft:crimson_fungus',
    'minecraft:warped_fungus'
];
class SoulCompostComonent {
    constructor() {
        this.onRandomTick = this.onRandomTick.bind(this);
    }
    onRandomTick(args) {
        let transChance = 0.1;
        let hasWater = false;
        const compostBlock = args.block;
        if (compostBlock?.typeId !== "nethersdelight:soul_compost")
            return;
        const currentProcess = compostBlock.permutation.getState("farmersdelight:process") ?? 0;
        const { x, y, z } = compostBlock.location;
        const dimension = compostBlock.dimension;
        const fromLocation = { x: x - 1, y: y - 1, z: z - 1 };
        const toLocation = { x: x + 1, y: y + 1, z: z + 1 };
        const detectLocs = new BlockVolume(fromLocation, toLocation).getBlockLocationIterator();
        for (const location of detectLocs) {
            const block = dimension.getBlock(location);
            if (!block)
                continue;
            if (organicCompostDetectList.includes(block.typeId)) {
                transChance += 0.02;
            }
            else if (block.hasTag('compost_activators')) {
                transChance += 0.02;
            }
            else if (block.typeId in ['minecraft:lava', 'minecraft:fire', 'minecraft:soul_fire']) {
                hasWater = true;
            }
        }
        ;
        if (hasWater)
            transChance += 0.1;
        if (Math.random() < transChance) {
            if (currentProcess < 7) {
                compostBlock.setPermutation(compostBlock.permutation.withState('farmersdelight:process', currentProcess + 1));
            }
            else {
                compostBlock.setPermutation(BlockPermutation.resolve('nethersdelight:rich_soul_soil'));
            }
        }
    }
}
export class SoulCompostComonentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:soul_compost', new SoulCompostComonent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], SoulCompostComonentRegister.prototype, "register", null);
//# sourceMappingURL=SoulCompost.js.map