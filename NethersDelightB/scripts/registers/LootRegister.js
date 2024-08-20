var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EntityEquippableComponent, EntityHurtAfterEvent, EquipmentSlot, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { RandomAPI } from "../lib/RandomAPI";
import { ItemAPI } from "../lib/ItemAPI";
export class LootingRegister {
    knifeLoot(args) {
        const entity = args.damageSource.damagingEntity;
        const hurtEntity = args.hurtEntity;
        if (!entity || !hurtEntity)
            return;
        const equipment = entity.getComponent(EntityEquippableComponent.componentId);
        const onFire = hurtEntity.getComponent('minecraft:onfire')?.onFireTicksRemaining;
        const mainHand = equipment?.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainHand)
            return;
        //if (!mainHand?.hasTag('nethersdelight:is_machete')) return;
        const health = hurtEntity.getComponent('minecraft:health');
        if (!health?.currentValue && hurtEntity.typeId === 'minecraft:hoglin') {
            if (onFire != undefined) {
                ItemAPI.spawn(hurtEntity, 'nethersdelight:hoglin_hide', 1 + RandomAPI.RandomInt(2));
            }
            else {
                ItemAPI.spawn(hurtEntity, 'nethersdelight:hoglin_loin', 1 + RandomAPI.RandomInt(2));
            }
            if (!mainHand?.hasTag('farmersdelight:is_knife'))
                return;
            ItemAPI.spawn(hurtEntity, 'nethersdelight:hoglin_hide', 1 + RandomAPI.RandomInt(1));
        }
        if (!health?.currentValue && hurtEntity.typeId === 'minecraft:strider') {
            if (!mainHand?.hasTag('farmersdelight:is_knife'))
                return;
            ItemAPI.spawn(hurtEntity, 'nethersdelight:strider_slice', 1 + RandomAPI.RandomInt(1));
        }
    }
}
__decorate([
    EventAPI.register(world.afterEvents.entityHurt),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtAfterEvent]),
    __metadata("design:returntype", void 0)
], LootingRegister.prototype, "knifeLoot", null);
//# sourceMappingURL=LootRegister.js.map