import { IsInt, IsNotEmpty } from 'class-validator';

export default class SellItemDto {
  @IsNotEmpty()
  stock_item_id: string;

  count: string;
}
