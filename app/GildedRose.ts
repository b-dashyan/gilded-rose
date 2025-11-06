import { Item } from "./Item";
import { UpdateService, IUpdateService } from "./UpdateService";

export class GildedRose {
  items: Array<Item>;
  private readonly updateService: IUpdateService;

  constructor(
    items = [] as Array<Item>,
    updateService: IUpdateService = new UpdateService()
  ) {
    this.items = items;
    this.updateService = updateService;
  }

  update() {
    this.updateService.updateItems(this.items);
    return this.items;
  }
}
