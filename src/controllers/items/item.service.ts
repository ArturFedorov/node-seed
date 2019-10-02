import {Item} from '../../orm/models/Item';
import AppError from '../../../shared/AppError';

export class ItemService {
  public static getItems() {
    return Item.findAll<Item>()
      .catch((error: Error) => new AppError('ItemsService getItems',500));
  }
}
