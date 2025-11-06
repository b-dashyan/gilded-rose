import { Item } from "./Item";

export interface IUpdateService {
  updateItems(items: Array<Item>): void;
}

export class UpdateService implements IUpdateService {
  private readonly MIN_QUALITY = 0;
  private readonly MAX_QUALITY = 50;

  private readonly CONJURED = "Conjured";
  private readonly AGED_BRIE = "Aged Brie";
  private readonly SULFURAS = "Sulfuras, Hand of Ragnaros";
  private readonly BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";

  private isConjuredItem({ name }: Item): boolean {
    return name.includes(this.CONJURED);
  }

  private isAgedBrie({ name }: Item): boolean {
    return name.includes(this.AGED_BRIE);
  }

  private isBackstagePass({ name }: Item): boolean {
    return name.includes(this.BACKSTAGE_PASS);
  }

  private isSulfuras({ name }: Item): boolean {
    return name.includes(this.SULFURAS);
  }

  private getRegularItemQualityDelta(item: Item): number {
    // Regular items decrease in quality by 1
    let delta = -1;

    // 'Aged Brie' increases in quality by 1
    if (this.isAgedBrie(item)) {
      delta = delta * -1;
    }

    // Quality delta doubles past sellIn date
    if (item.sellIn < 0) {
      delta = delta * 2;
    }

    return delta;
  }

  private getBackstagePassQualityDelta(item: Item): number {
    // Quality drops to 0 past sellIn date
    if (item.sellIn < 0) {
      return 0 - item.quality;
    }

    // Quality increases by 3 when there are 5 days or less left
    if (item.sellIn < 5) {
      return 3;
    }

    // Quality increases by 2 when there are 10 days or less left
    if (item.sellIn < 10) {
      return 2;
    }

    // Quality increases by 1 otherwise
    return 1;
  }

  private getQualityDelta(item: Item): number {
    let delta = this.isBackstagePass(item)
      ? this.getBackstagePassQualityDelta(item)
      : this.getRegularItemQualityDelta(item);

    // Quality delta doubles for 'Conjured' items
    if (this.isConjuredItem(item)) {
      delta = delta * 2;
    }

    return delta;
  }

  private clampQuality(quality: number): number {
    if (quality < this.MIN_QUALITY) {
      return this.MIN_QUALITY;
    } else if (quality > this.MAX_QUALITY) {
      return this.MAX_QUALITY;
    }
    return quality;
  }

  private updateItemSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }

  private updateItemQuality(item: Item): void {
    const qualityWithDelta = item.quality + this.getQualityDelta(item);
    item.quality = this.clampQuality(qualityWithDelta);
  }

  private updateItem(item: Item): void {
    if (this.isSulfuras(item)) return;
    this.updateItemSellIn(item);
    this.updateItemQuality(item);
  }

  updateItems(items: Array<Item>): void {
    for (const item of items) {
      this.updateItem(item);
    }
  }
}
