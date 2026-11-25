export type MenuCategoryId =
  | 'hot-coffee'
  | 'cold-coffee'
  | 'shakes'
  | 'non-coffee'
  | 'coolers'
  | 'matcha'
  | 'all-day-breakfast'
  | 'breakfast-add-ons'
  | 'appetizers'
  | 'soul-food'
  | 'pasta'
  | 'shawarma'
  | 'soup'
  | 'fried-rice-chowmein'
  | 'quesadillas'
  | 'pizzas'
  | 'mains'
  | 'burgers'
  | 'sandwiches'
  | 'cakes'
  | 'loaf-cakes'
  | 'whole-cheesecakes'
  | 'cupcakes'
  | 'brownies'
  | 'cheesecake-desserts'
  | 'tiramisu'
  | 'creative-experiences';

export interface MenuVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  price?: number;
  priceDisplay: string;
  variants?: MenuVariant[];
  description?: string;
  dietary?: 'Veg' | 'Contains Egg' | 'Non-Veg';
  note?: string;
}

export interface MenuCategoryMeta {
  id: MenuCategoryId;
  label: string;
  group: 'Beverages' | 'Kitchen' | 'Bakery & Desserts' | 'Creative Studio';
  variantHeaderNote?: string;
  footnote?: string;
}

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  { id: 'hot-coffee', label: 'Hot Coffee', group: 'Beverages' },
  { id: 'cold-coffee', label: 'Cold Coffee', group: 'Beverages' },
  { id: 'shakes', label: 'Shakes', group: 'Beverages' },
  { id: 'non-coffee', label: 'Non-Coffee', group: 'Beverages' },
  { id: 'coolers', label: 'Coolers', group: 'Beverages' },
  { id: 'matcha', label: 'Matcha', group: 'Beverages' },
  { id: 'all-day-breakfast', label: 'All Day Breakfast', group: 'Kitchen' },
  { id: 'breakfast-add-ons', label: 'Breakfast Add-ons', group: 'Kitchen' },
  { id: 'appetizers', label: 'Appetizers', group: 'Kitchen' },
  { id: 'soul-food', label: 'Soul Food', group: 'Kitchen' },
  { id: 'pasta', label: 'Pasta', group: 'Kitchen', variantHeaderNote: 'Veg / Chicken' },
  { id: 'shawarma', label: 'Shawarma', group: 'Kitchen' },
  { id: 'soup', label: 'Soup', group: 'Kitchen', footnote: 'Variant labels (180 / 200) pending confirmation on printed menu.' },
  { id: 'fried-rice-chowmein', label: 'Fried Rice & Chowmein', group: 'Kitchen', variantHeaderNote: 'Veg / Egg / Chicken' },
  { id: 'quesadillas', label: 'Quesadillas', group: 'Kitchen' },
  { id: 'pizzas', label: 'Pizzas', group: 'Kitchen' },
  { id: 'mains', label: 'Mains', group: 'Kitchen' },
  { id: 'burgers', label: 'Burgers', group: 'Kitchen' },
  {
    id: 'sandwiches',
    label: 'Sandwiches',
    group: 'Kitchen',
    footnote: 'One additional item at the bottom edge of the Sandwiches menu photograph is cropped and pending confirmation.',
  },
  { id: 'cakes', label: 'Cakes', group: 'Bakery & Desserts', variantHeaderNote: 'Whole Cakes' },
  { id: 'loaf-cakes', label: 'Loaf Cakes', group: 'Bakery & Desserts' },
  { id: 'whole-cheesecakes', label: 'Whole Cheesecakes', group: 'Bakery & Desserts' },
  { id: 'cupcakes', label: 'Cupcakes', group: 'Bakery & Desserts' },
  { id: 'brownies', label: 'Brownies', group: 'Bakery & Desserts' },
  { id: 'cheesecake-desserts', label: 'Cheesecake Desserts', group: 'Bakery & Desserts', variantHeaderNote: 'Dessert Servings' },
  { id: 'tiramisu', label: 'Tiramisu', group: 'Bakery & Desserts' },
  { id: 'creative-experiences', label: 'Creative Experiences', group: 'Creative Studio' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Hot Coffee
  { id: 'hc-espresso', category: 'hot-coffee', name: 'Espresso', priceDisplay: '₹90 / ₹100', variants: [{ label: 'Single', price: 90 }, { label: 'Double', price: 100 }], note: 'Two price tiers (90/100) shown on menu' },
  { id: 'hc-americano', category: 'hot-coffee', name: 'Americano', priceDisplay: '₹100 / ₹110', variants: [{ label: 'Option 1', price: 100 }, { label: 'Option 2', price: 110 }], note: 'Two price tiers (100/110) shown on menu' },
  { id: 'hc-cappuccino', category: 'hot-coffee', name: 'Cappuccino', price: 130, priceDisplay: '₹130' },
  { id: 'hc-cafe-latte', category: 'hot-coffee', name: 'Cafe Latte', price: 130, priceDisplay: '₹130' },
  { id: 'hc-cafe-mocha', category: 'hot-coffee', name: 'Cafe Mocha', price: 140, priceDisplay: '₹140' },
  { id: 'hc-cinnamon-latte', category: 'hot-coffee', name: 'Cinnamon Latte', price: 140, priceDisplay: '₹140' },
  { id: 'hc-caramel-latte', category: 'hot-coffee', name: 'Caramel Latte', price: 140, priceDisplay: '₹140' },
  { id: 'hc-caramel-macchiato', category: 'hot-coffee', name: 'Caramel Macchiato', price: 140, priceDisplay: '₹140' },
  { id: 'hc-hazelnut-latte', category: 'hot-coffee', name: 'Hazelnut Latte', price: 140, priceDisplay: '₹140' },
  { id: 'hc-biscoff-latte', category: 'hot-coffee', name: 'Biscoff Latte', price: 200, priceDisplay: '₹200' },

  // Cold Coffee
  { id: 'cc-iced-americano', category: 'cold-coffee', name: 'Iced Americano', price: 110, priceDisplay: '₹110' },
  { id: 'cc-iced-latte', category: 'cold-coffee', name: 'Iced Latte', price: 140, priceDisplay: '₹140' },
  { id: 'cc-iced-cafe-mocha', category: 'cold-coffee', name: 'Iced Cafe Mocha', price: 150, priceDisplay: '₹150' },
  { id: 'cc-iced-hazelnut-latte', category: 'cold-coffee', name: 'Iced Hazelnut Latte', price: 150, priceDisplay: '₹150' },
  { id: 'cc-iced-biscoff-latte', category: 'cold-coffee', name: 'Iced Biscoff Latte', price: 220, priceDisplay: '₹220' },
  { id: 'cc-iced-caramel-latte', category: 'cold-coffee', name: 'Iced Caramel Latte', price: 150, priceDisplay: '₹150' },
  { id: 'cc-affogato', category: 'cold-coffee', name: 'Affogato', price: 160, priceDisplay: '₹160' },
  { id: 'cc-cold-coffee', category: 'cold-coffee', name: 'Cold Coffee', price: 150, priceDisplay: '₹150' },
  { id: 'cc-cold-coffee-ice-cream', category: 'cold-coffee', name: 'Cold Coffee with Ice Cream', price: 200, priceDisplay: '₹200' },

  // Shakes
  { id: 'sh-oreo', category: 'shakes', name: 'Oreo Shake', price: 200, priceDisplay: '₹200' },
  { id: 'sh-kitkat', category: 'shakes', name: 'Kitkat Shake', price: 200, priceDisplay: '₹200' },
  { id: 'sh-vanilla', category: 'shakes', name: 'Vanilla Shake', price: 160, priceDisplay: '₹160' },
  { id: 'sh-strawberry', category: 'shakes', name: 'Strawberry Shake', price: 170, priceDisplay: '₹170' },
  { id: 'sh-blueberry', category: 'shakes', name: 'Blueberry Shake', price: 180, priceDisplay: '₹180' },

  // Non-Coffee
  { id: 'nc-black-tea', category: 'non-coffee', name: 'Black Tea', price: 60, priceDisplay: '₹60' },
  { id: 'nc-milk-tea', category: 'non-coffee', name: 'Milk Tea', price: 80, priceDisplay: '₹80' },
  { id: 'nc-green-tea', category: 'non-coffee', name: 'Green Tea', price: 70, priceDisplay: '₹70' },
  { id: 'nc-ginger-lemon-honey', category: 'non-coffee', name: 'Ginger Lemon Honey', price: 100, priceDisplay: '₹100' },
  { id: 'nc-blue-pea-tea', category: 'non-coffee', name: 'Blue Pea Tea', price: 120, priceDisplay: '₹120' },
  { id: 'nc-hot-chocolate', category: 'non-coffee', name: 'Hot Chocolate', price: 200, priceDisplay: '₹200' },

  // Coolers
  { id: 'co-virgin-mojito', category: 'coolers', name: 'Virgin Mojito', price: 160, priceDisplay: '₹160' },
  { id: 'co-blueberry-mojito', category: 'coolers', name: 'Blueberry Mojito', price: 170, priceDisplay: '₹170' },
  { id: 'co-strawberry-mojito', category: 'coolers', name: 'Strawberry Mojito', price: 170, priceDisplay: '₹170' },
  { id: 'co-peach-garden', category: 'coolers', name: 'Peach Garden', price: 190, priceDisplay: '₹190' },
  { id: 'co-peach-iced-tea', category: 'coolers', name: 'Peach Iced Tea', price: 150, priceDisplay: '₹150' },
  { id: 'co-cranberry-margarita', category: 'coolers', name: 'Cranberry Margarita', price: 200, priceDisplay: '₹200' },
  { id: 'co-strawberry-blast', category: 'coolers', name: 'Strawberry Blast', price: 170, priceDisplay: '₹170' },
  { id: 'co-blueberry-iced-tea', category: 'coolers', name: 'Blueberry Iced Tea', price: 150, priceDisplay: '₹150' },
  { id: 'co-ice-cream-float', category: 'coolers', name: 'Ice Cream Float', price: 160, priceDisplay: '₹160' },
  { id: 'co-fresh-lime-soda', category: 'coolers', name: 'Fresh Lime Soda', price: 120, priceDisplay: '₹120' },
  { id: 'co-blue-pea-mango', category: 'coolers', name: 'Blue Pea Mango', price: 190, priceDisplay: '₹190' },
  { id: 'co-cranberry-fizz', category: 'coolers', name: 'Cranberry Fizz', price: 180, priceDisplay: '₹180' },
  { id: 'co-watermelon-crush', category: 'coolers', name: 'Watermelon Crush', price: 180, priceDisplay: '₹180' },

  // Matcha
  { id: 'ma-latte', category: 'matcha', name: 'Matcha Latte (Hot / Cold)', price: 200, priceDisplay: '₹200' },
  { id: 'ma-strawberry', category: 'matcha', name: 'Matcha Strawberry', price: 250, priceDisplay: '₹250' },
  { id: 'ma-mango', category: 'matcha', name: 'Matcha Mango', price: 250, priceDisplay: '₹250' },
  { id: 'ma-blueberry', category: 'matcha', name: 'Matcha Blueberry', price: 250, priceDisplay: '₹250' },
  { id: 'ma-coconut-cloud', category: 'matcha', name: 'Matcha Coconut Cloud', price: 250, priceDisplay: '₹250' },

  // All Day Breakfast
  {
    id: 'bk-english-breakfast',
    category: 'all-day-breakfast',
    name: 'English Breakfast',
    price: 450,
    priceDisplay: '₹450',
    description: 'Eggs, grilled tomato, sauteed mushrooms, Bacon, Toast and black tea/ black coffee',
    dietary: 'Non-Veg',
  },
  { id: 'bk-french-toast', category: 'all-day-breakfast', name: 'French Toast', price: 250, priceDisplay: '₹250' },
  { id: 'bk-tiramisu-french-toast', category: 'all-day-breakfast', name: 'Tiramisu French Toast', price: 300, priceDisplay: '₹300' },
  { id: 'bk-bacon-egg-sausage', category: 'all-day-breakfast', name: 'Bacon, Egg & Sausage', price: 350, priceDisplay: '₹350', dietary: 'Non-Veg' },

  // Breakfast Add-ons
  { id: 'ao-sausage', category: 'breakfast-add-ons', name: 'Sausage (2pc)', price: 80, priceDisplay: '₹80', dietary: 'Non-Veg' },
  { id: 'ao-cheese', category: 'breakfast-add-ons', name: 'Cheese', price: 30, priceDisplay: '₹30', dietary: 'Veg' },
  { id: 'ao-ham', category: 'breakfast-add-ons', name: 'Ham (2pc)', price: 60, priceDisplay: '₹60', dietary: 'Non-Veg' },
  { id: 'ao-salami', category: 'breakfast-add-ons', name: 'Salami (4pc)', price: 60, priceDisplay: '₹60', dietary: 'Non-Veg' },
  { id: 'ao-toast', category: 'breakfast-add-ons', name: 'Toast', price: 30, priceDisplay: '₹30' },
  { id: 'ao-egg', category: 'breakfast-add-ons', name: 'Egg', price: 20, priceDisplay: '₹20', dietary: 'Contains Egg' },
  { id: 'ao-bacon', category: 'breakfast-add-ons', name: 'Bacon (3pc)', price: 120, priceDisplay: '₹120', dietary: 'Non-Veg' },

  // Appetizers
  { id: 'ap-fries', category: 'appetizers', name: 'Fries', price: 150, priceDisplay: '₹150' },
  { id: 'ap-peri-peri-fries', category: 'appetizers', name: 'Peri Peri Fries', price: 170, priceDisplay: '₹170' },
  { id: 'ap-cheesy-fries', category: 'appetizers', name: 'Cheesy Fries', price: 190, priceDisplay: '₹190' },
  { id: 'ap-wedges', category: 'appetizers', name: 'Wedges', price: 220, priceDisplay: '₹220' },
  { id: 'ap-peri-peri-wedges', category: 'appetizers', name: 'Peri Peri Wedges', price: 230, priceDisplay: '₹230' },
  { id: 'ap-potato-onion-rings', category: 'appetizers', name: 'Potato Onion Rings', price: 180, priceDisplay: '₹180' },
  { id: 'ap-fried-mushroom', category: 'appetizers', name: 'Fried Mushroom', price: 200, priceDisplay: '₹200' },
  { id: 'ap-dynamite-mushroom', category: 'appetizers', name: 'Dynamite Mushroom', price: 280, priceDisplay: '₹280' },
  { id: 'ap-loaded-veggie-fries', category: 'appetizers', name: 'Loaded Veggie Fries', price: 230, priceDisplay: '₹230', dietary: 'Veg' },
  { id: 'ap-loaded-chicken-fries', category: 'appetizers', name: 'Loaded Chicken Fries', price: 260, priceDisplay: '₹260', dietary: 'Non-Veg' },
  { id: 'ap-dynamite-shrimps', category: 'appetizers', name: 'Dynamite Shrimps', price: 400, priceDisplay: '₹400', dietary: 'Non-Veg' },
  { id: 'ap-dynamite-chicken', category: 'appetizers', name: 'Dynamite Chicken', price: 320, priceDisplay: '₹320', dietary: 'Non-Veg' },
  { id: 'ap-teriyaki-chicken-wings', category: 'appetizers', name: 'Teriyaki Chicken Wings', price: 300, priceDisplay: '₹300', dietary: 'Non-Veg' },
  { id: 'ap-spicy-bbq-tenders', category: 'appetizers', name: 'Spicy BBQ Tenders', price: 320, priceDisplay: '₹320', dietary: 'Non-Veg' },
  { id: 'ap-bacon-wrapped-sausage', category: 'appetizers', name: 'Bacon Wrapped Sausage', price: 250, priceDisplay: '₹250', dietary: 'Non-Veg' },
  { id: 'ap-peri-peri-chicken-strips', category: 'appetizers', name: 'Peri Peri Chicken Strips', price: 320, priceDisplay: '₹320', dietary: 'Non-Veg' },
  { id: 'ap-korean-spicy-wings', category: 'appetizers', name: 'Korean Spicy Wings', price: 370, priceDisplay: '₹370', dietary: 'Non-Veg' },
  { id: 'ap-fish-and-chips', category: 'appetizers', name: 'Fish and Chips', price: 300, priceDisplay: '₹300', dietary: 'Non-Veg' },

  // Soul Food
  { id: 'sf-veg-steamed-momo', category: 'soul-food', name: 'Veg Steamed Momo', price: 140, priceDisplay: '₹140', dietary: 'Veg' },
  { id: 'sf-veg-jhol-momo', category: 'soul-food', name: 'Veg Jhol Momo', price: 180, priceDisplay: '₹180', dietary: 'Veg' },
  { id: 'sf-chilly-veg-momo', category: 'soul-food', name: 'Chilly Veg Momo', price: 200, priceDisplay: '₹200', dietary: 'Veg' },
  { id: 'sf-chicken-steamed-momo', category: 'soul-food', name: 'Chicken Steamed Momo', price: 160, priceDisplay: '₹160', dietary: 'Non-Veg' },
  { id: 'sf-chicken-jhol-momo', category: 'soul-food', name: 'Chicken Jhol Momo', price: 200, priceDisplay: '₹200', dietary: 'Non-Veg' },
  { id: 'sf-chilly-chicken-momo', category: 'soul-food', name: 'Chilly Chicken Momo', price: 220, priceDisplay: '₹220', dietary: 'Non-Veg' },
  { id: 'sf-veg-keema-noodles', category: 'soul-food', name: 'Veg Keema Noodles', price: 230, priceDisplay: '₹230', dietary: 'Veg' },
  { id: 'sf-chicken-keema-noodles', category: 'soul-food', name: 'Chicken Keema Noodles', price: 250, priceDisplay: '₹250', dietary: 'Non-Veg' },
  { id: 'sf-ramen-sausage-egg', category: 'soul-food', name: 'Ramen with Sausage, egg & Seasonal Veggies', price: 280, priceDisplay: '₹280', dietary: 'Non-Veg' },

  // Pasta
  { id: 'pa-alfredo', category: 'pasta', name: 'Pasta Alfredo', priceDisplay: '₹290 / ₹320', variants: [{ label: 'Veg', price: 290 }, { label: 'Chicken', price: 320 }] },
  { id: 'pa-bolognese', category: 'pasta', name: 'Pasta Bolognese', priceDisplay: '₹290 / ₹320', variants: [{ label: 'Veg', price: 290 }, { label: 'Chicken', price: 320 }] },
  { id: 'pa-pesto', category: 'pasta', name: 'Pesto Pasta', priceDisplay: '₹300 / ₹330', variants: [{ label: 'Veg', price: 300 }, { label: 'Chicken', price: 330 }] },
  { id: 'pa-aglio-e-olio', category: 'pasta', name: 'Aglio e Olio', priceDisplay: '₹270 / ₹290', variants: [{ label: 'Veg', price: 270 }, { label: 'Chicken', price: 290 }] },
  { id: 'pa-mix-sauce', category: 'pasta', name: 'Mix Sauce Pasta', priceDisplay: '₹300 / ₹330', variants: [{ label: 'Veg', price: 300 }, { label: 'Chicken', price: 330 }] },
  { id: 'pa-spaghetti-meatballs', category: 'pasta', name: 'Spaghetti with Meatballs', price: 320, priceDisplay: '₹320', dietary: 'Non-Veg' },

  // Shawarma
  { id: 'sw-chicken-shawarma', category: 'shawarma', name: 'Chicken Shawarma', price: 180, priceDisplay: '₹180', dietary: 'Non-Veg' },
  { id: 'sw-cheesy-chicken-shawarma', category: 'shawarma', name: 'Cheesy Chicken Shawarma', price: 200, priceDisplay: '₹200', dietary: 'Non-Veg' },
  { id: 'sw-falafel-wrap', category: 'shawarma', name: 'Falafel Wrap', price: 170, priceDisplay: '₹170', dietary: 'Veg' },
  { id: 'sw-falafel-cheese-wrap', category: 'shawarma', name: 'Falafel Cheese Wrap', price: 190, priceDisplay: '₹190', dietary: 'Veg' },

  // Soup
  { id: 'sp-manchow', category: 'soup', name: 'Manchow Soup', priceDisplay: '₹180 / ₹200', variants: [{ label: 'Option 1', price: 180 }, { label: 'Option 2', price: 200 }], note: 'Two price tiers (180 / 200) shown on menu' },
  { id: 'sp-hot-and-sour', category: 'soup', name: 'Hot & Sour Soup', priceDisplay: '₹180 / ₹200', variants: [{ label: 'Option 1', price: 180 }, { label: 'Option 2', price: 200 }], note: 'Two price tiers (180 / 200) shown on menu' },

  // Fried Rice & Chowmein
  { id: 'rc-fried-rice', category: 'fried-rice-chowmein', name: 'Fried Rice', priceDisplay: '₹180 / ₹200 / ₹220', variants: [{ label: 'Veg', price: 180 }, { label: 'Egg', price: 200 }, { label: 'Chicken', price: 220 }] },
  { id: 'rc-chowmein', category: 'fried-rice-chowmein', name: 'Chowmein', priceDisplay: '₹180 / ₹200 / ₹220', variants: [{ label: 'Veg', price: 180 }, { label: 'Egg', price: 200 }, { label: 'Chicken', price: 220 }] },

  // Quesadillas
  { id: 'qd-veg', category: 'quesadillas', name: 'Veg Quesadilla', price: 230, priceDisplay: '₹230', dietary: 'Veg' },
  { id: 'qd-chicken', category: 'quesadillas', name: 'Chicken Quesadilla', price: 260, priceDisplay: '₹260', dietary: 'Non-Veg' },

  // Pizzas
  { id: 'pz-veggie-delight', category: 'pizzas', name: 'Veggie Delight Pizza', price: 370, priceDisplay: '₹370', dietary: 'Veg' },
  { id: 'pz-margarita', category: 'pizzas', name: 'Margarita Pizza', price: 320, priceDisplay: '₹320', dietary: 'Veg' },
  { id: 'pz-chicken-bbq', category: 'pizzas', name: 'Chicken BBQ Pizza', price: 450, priceDisplay: '₹450', dietary: 'Non-Veg' },
  { id: 'pz-chicken-salami', category: 'pizzas', name: 'Chicken Salami Pizza', price: 460, priceDisplay: '₹460', dietary: 'Non-Veg' },

  // Mains
  { id: 'mn-chicken-schnitzel', category: 'mains', name: 'Chicken Schnitzel', price: 400, priceDisplay: '₹400', dietary: 'Non-Veg' },
  { id: 'mn-lemon-cajun-fish', category: 'mains', name: 'Pan Seared Lemon Cajun Fish Fillet', price: 460, priceDisplay: '₹460', dietary: 'Non-Veg' },
  { id: 'mn-meat-platter', category: 'mains', name: 'Meat Platter', price: 450, priceDisplay: '₹450', dietary: 'Non-Veg' },

  // Burgers
  { id: 'bg-veg', category: 'burgers', name: 'Veg Burger', price: 230, priceDisplay: '₹230', dietary: 'Veg' },
  { id: 'bg-chicken', category: 'burgers', name: 'Chicken Burger', price: 290, priceDisplay: '₹290', dietary: 'Non-Veg' },
  { id: 'bg-chicken-bacon', category: 'burgers', name: 'Chicken & Bacon Burger', price: 320, priceDisplay: '₹320', dietary: 'Non-Veg' },
  { id: 'bg-big-bite-chicken', category: 'burgers', name: 'Big Bite Chicken Burger', price: 370, priceDisplay: '₹370', dietary: 'Non-Veg' },
  { id: 'bg-peri-peri-fried-chicken', category: 'burgers', name: 'Peri Peri Fried Chicken Burger', price: 370, priceDisplay: '₹370', dietary: 'Non-Veg' },
  { id: 'bg-mini-bear-veg', category: 'burgers', name: 'Mini Bear Burger (veg)', price: 230, priceDisplay: '₹230', dietary: 'Veg' },
  { id: 'bg-mini-bear-chicken', category: 'burgers', name: 'Mini Bear Burger (chicken)', price: 250, priceDisplay: '₹250', dietary: 'Non-Veg' },
  { id: 'bg-fish', category: 'burgers', name: 'Fish Burger', price: 320, priceDisplay: '₹320', dietary: 'Non-Veg' },

  // Sandwiches
  { id: 'sd-coleslaw', category: 'sandwiches', name: 'Coleslaw Sandwich', price: 220, priceDisplay: '₹220' },
  { id: 'sd-corn-slaw', category: 'sandwiches', name: 'Corn Slaw Sandwich', price: 230, priceDisplay: '₹230' },
  { id: 'sd-corn-mushroom', category: 'sandwiches', name: 'Corn & Mushroom Sandwich', price: 250, priceDisplay: '₹250' },
  { id: 'sd-grilled-cheese', category: 'sandwiches', name: 'Grilled Cheese Sandwich', price: 250, priceDisplay: '₹250' },
  { id: 'sd-chicken-slaw', category: 'sandwiches', name: 'Chicken Slaw Sandwich', price: 280, priceDisplay: '₹280', dietary: 'Non-Veg' },
  { id: 'sd-chicken-bacon', category: 'sandwiches', name: 'Chicken & Bacon Sandwich', price: 320, priceDisplay: '₹320', dietary: 'Non-Veg' },

  // Cakes (Whole Cakes)
  { id: 'ck-red-velvet', category: 'cakes', name: 'Red Velvet Cake', price: 850, priceDisplay: '₹850' },
  { id: 'ck-lemon', category: 'cakes', name: 'Lemon Cake', price: 900, priceDisplay: '₹900' },
  { id: 'ck-cookies-cream', category: 'cakes', name: 'Cookies & Cream Cake', price: 800, priceDisplay: '₹800' },
  { id: 'ck-vanilla', category: 'cakes', name: 'Vanilla Cake', price: 700, priceDisplay: '₹700' },
  { id: 'ck-chocolate', category: 'cakes', name: 'Chocolate Cake', price: 700, priceDisplay: '₹700' },
  { id: 'ck-fudge-brownie', category: 'cakes', name: 'Fudge Brownie Cake', price: 1200, priceDisplay: '₹1,200' },
  { id: 'ck-carrot', category: 'cakes', name: 'Carrot Cake', price: 1000, priceDisplay: '₹1,000' },

  // Loaf Cakes
  { id: 'lc-carrot', category: 'loaf-cakes', name: 'Carrot Cake Loaf', price: 700, priceDisplay: '₹700' },
  { id: 'lc-banana-bread', category: 'loaf-cakes', name: 'Banana Bread', price: 600, priceDisplay: '₹600' },

  // Whole Cheesecakes
  { id: 'wc-basque-burnt', category: 'whole-cheesecakes', name: 'Basque Burnt Cheesecake (Whole)', price: 1200, priceDisplay: '₹1,200' },
  { id: 'wc-blueberry', category: 'whole-cheesecakes', name: 'Blueberry Cheesecake (Whole)', price: 1300, priceDisplay: '₹1,300' },
  { id: 'wc-nutella-san-sebastian', category: 'whole-cheesecakes', name: 'Nutella San Sebastian (Whole)', price: 1500, priceDisplay: '₹1,500' },
  { id: 'wc-san-sebastian', category: 'whole-cheesecakes', name: 'San Sebastian (Whole)', price: 1400, priceDisplay: '₹1,400' },

  // Cupcakes
  { id: 'cp-red-velvet', category: 'cupcakes', name: 'Red Velvet Cupcake', price: 80, priceDisplay: '₹80' },
  { id: 'cp-nutella', category: 'cupcakes', name: 'Nutella Cupcake', price: 90, priceDisplay: '₹90' },
  { id: 'cp-pumpkin', category: 'cupcakes', name: 'Pumpkin Cupcake', price: 90, priceDisplay: '₹90' },
  { id: 'cp-dog', category: 'cupcakes', name: 'Dog Cupcake', price: 70, priceDisplay: '₹70' },
  { id: 'cp-biscoff', category: 'cupcakes', name: 'Biscoff Cupcake', price: 100, priceDisplay: '₹100' },

  // Brownies
  { id: 'br-nutella', category: 'brownies', name: 'Nutella Brownie', price: 230, priceDisplay: '₹230' },
  { id: 'br-ice-cream', category: 'brownies', name: 'Ice Cream Brownie', price: 260, priceDisplay: '₹260' },
  { id: 'br-lotus-biscoff', category: 'brownies', name: 'Lotus Biscoff Brownie', price: 230, priceDisplay: '₹230' },
  { id: 'br-peanut-butter', category: 'brownies', name: 'Peanut Butter Brownie', price: 200, priceDisplay: '₹200' },
  { id: 'br-classic-walnut', category: 'brownies', name: 'Classic Walnut Brownie', price: 200, priceDisplay: '₹200' },
  { id: 'br-chocolate-fudge', category: 'brownies', name: 'Chocolate Fudge Brownie', price: 200, priceDisplay: '₹200' },

  // Cheesecake Desserts
  { id: 'cd-oreo', category: 'cheesecake-desserts', name: 'Oreo Cheesecake', price: 200, priceDisplay: '₹200' },
  { id: 'cd-mango', category: 'cheesecake-desserts', name: 'Mango Cheesecake', price: 200, priceDisplay: '₹200' },
  { id: 'cd-caramel', category: 'cheesecake-desserts', name: 'Caramel Cheesecake', price: 200, priceDisplay: '₹200' },
  { id: 'cd-blueberry', category: 'cheesecake-desserts', name: 'Blueberry Cheesecake', price: 220, priceDisplay: '₹220' },
  { id: 'cd-strawberry', category: 'cheesecake-desserts', name: 'Strawberry Cheesecake', price: 200, priceDisplay: '₹200' },
  { id: 'cd-lotus-biscoff', category: 'cheesecake-desserts', name: 'Lotus Biscoff Cheesecake', price: 220, priceDisplay: '₹220' },

  // Tiramisu
  { id: 'tr-classic', category: 'tiramisu', name: 'Classic Italian coffee dessert', price: 230, priceDisplay: '₹230' },

  // Creative Experiences
  {
    id: 'ce-cake-decorating',
    category: 'creative-experiences',
    name: 'Cake Decorating',
    price: 350,
    priceDisplay: '₹350',
    description: 'Vanilla, Chocolate, or Red Velvet',
  },
  {
    id: 'ce-clay-studio',
    category: 'creative-experiences',
    name: 'Clay Studio',
    price: 300,
    priceDisplay: '₹300',
    description: 'Paint Your Clay Piece (pre-crafted clay keepsake to paint and take home) or Mini Sculpt Kit (air-dry clay and sculpting tools for your own creation)',
  },
  {
    id: 'ce-canvas-painting',
    category: 'creative-experiences',
    name: 'Canvas Painting',
    price: 200,
    priceDisplay: '₹200',
    description: 'Your canvas, your story.',
  },
];
