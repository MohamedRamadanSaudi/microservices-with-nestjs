export class CreateProductDto {
  id: number;
  title: string;
  image: string;
  likes: number = 0;
}
