import * as express from 'express';
import {Routes} from '../../api-routes/routes';
import {ItemService} from './item.service';
import {Item} from '../../orm/models/Item';


const router = express.Router();

// router.get(Routes.ITEMS, (req, res) =>
//   ItemService.getItems()
//     .then((data: Item[]) => res.status(200).send(data))
// );
router.get('/items', (req, res) => ItemService.getItems().then(result => res.send(result)));
module.exports = router;
