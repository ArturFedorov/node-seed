import {Item} from '../../orm/models/Item';
import {ErrorService} from '../../../shared/services/ErrorService';

export class ItemService {
  private static source = 'ItemService';

  public static getItems() {
    return Item.findAll<Item>()
      .catch((error: Error) => ErrorService.generateError(this.source, error.message, 500));
  }
}
