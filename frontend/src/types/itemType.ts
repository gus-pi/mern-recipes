export type Item = {
  _id: string;
  menuId: string;
  name: string;
  thumbnail_image: string;
  category: string;
  instructions: string;
  more: {
    prep_time: string;
    cook_time: string;
    servings: number;
    difficulty: string;
    source: string;
  };
  ingredients: [{ name: string; quantity: string }];
};
