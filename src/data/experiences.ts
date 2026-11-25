export interface CreativeExperience {
  id: 'cake-decorating' | 'clay-studio' | 'canvas-painting';
  number: string;
  title: string;
  price: number;
  priceDisplay: string;
  tagline: string;
  editorialCopy: string;
  options?: {
    name: string;
    detail?: string;
  }[];
  illustrationType: 'cake' | 'clay' | 'canvas';
}

export const CREATIVE_EXPERIENCES: CreativeExperience[] = [
  {
    id: 'cake-decorating',
    number: '01',
    title: 'Cake Decorating',
    price: 350,
    priceDisplay: '₹350',
    tagline: 'Vanilla · Chocolate · Red Velvet',
    editorialCopy: 'Make something sweet, and make it yours.',
    options: [
      { name: 'Vanilla' },
      { name: 'Chocolate' },
      { name: 'Red Velvet' },
    ],
    illustrationType: 'cake',
  },
  {
    id: 'clay-studio',
    number: '02',
    title: 'Clay Studio',
    price: 300,
    priceDisplay: '₹300',
    tagline: 'Two ways to shape a keepsake',
    editorialCopy: 'Something made by your hands, something to remember.',
    options: [
      {
        name: 'Paint Your Clay Piece',
        detail: 'Pre-crafted clay keepsake to paint and take home',
      },
      {
        name: 'Mini Sculpt Kit',
        detail: 'Air-dry clay and sculpting tools for your own creation',
      },
    ],
    illustrationType: 'clay',
  },
  {
    id: 'canvas-painting',
    number: '03',
    title: 'Canvas Painting',
    price: 200,
    priceDisplay: '₹200',
    tagline: 'Your canvas, your story.',
    editorialCopy: 'A little colour, a little imagination, a moment of your own.',
    options: [
      {
        name: 'Canvas Painting Session',
        detail: 'Your canvas, your story.',
      },
    ],
    illustrationType: 'canvas',
  },
];
