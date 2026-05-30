export const menuCategories = [
  { id: 'ice-creams', name: 'Ice Creams', icon: '🍦' },
  { id: 'shakes', name: 'Shakes', icon: '🥤' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'snacks', name: 'Snacks', icon: '🍟' },
  { id: 'beverages', name: 'Beverages', icon: '🍹' }
];

export const menuItems = [
  // Ice Creams
  {
    id: 'ic-1',
    name: 'Unicorn Bubblegum Softy',
    description: 'Our signature pastel pink and purple bubblegum softy swirl, loaded with mini marshmallows and edible gold glitter.',
    price: 90,
    category: 'ice-creams',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: true,
    rating: 4.9,
    reviews: 142
  },
  {
    id: 'ic-2',
    name: 'Double Chocolate Waffle Cone',
    description: 'Creamy dark Belgian chocolate scoop topped with hot fudge, dark chocolate chips, and served in a freshly baked waffle cone.',
    price: 120,
    category: 'ice-creams',
    image: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    isVeg: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 'ic-3',
    name: 'Vibrant Strawberry Sundae',
    description: 'Local hand-churned strawberry ice cream layered with fresh strawberry compote, vanilla cream, and neon-pink sprinkles.',
    price: 140,
    category: 'ice-creams',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: true,
    rating: 4.8,
    reviews: 115
  },

  // Shakes
  {
    id: 'sh-1',
    name: 'Lotus Biscoff Freakshake',
    description: 'Thick vanilla milkshake blended with authentic Biscoff spread, crushed Biscoff cookies, topped with whipped cream and caramel drizzle.',
    price: 190,
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: true,
    rating: 4.9,
    reviews: 210
  },
  {
    id: 'sh-2',
    name: 'Classic Nutella & Oreo Shake',
    description: 'Rich chocolate shake blended with Nutella and crunchy Oreo crumbs, served in a glass coated with hot chocolate fudge.',
    price: 180,
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    isVeg: true,
    rating: 4.6,
    reviews: 84
  },
  {
    id: 'sh-3',
    name: 'Vibrant Mango Mastani',
    description: 'Thick Alphonso mango shake topped with a scoop of vanilla ice cream, chopped almonds, pistachios, and glazed cherries.',
    price: 170,
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: true,
    rating: 4.8,
    reviews: 130
  },

  // Burgers
  {
    id: 'bg-1',
    name: 'Lips Double Cheese Burger',
    description: 'Double flame-grilled seasoned patties stacked with cheddar cheese, caramelized onions, crisp lettuce, and our secret Lips pink sauce.',
    price: 220,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: false,
    rating: 4.9,
    reviews: 320
  },
  {
    id: 'bg-2',
    name: 'Crispy Zinger Chicken Burger',
    description: 'Crispy golden fried chicken breast, spicy habanero mayo, crunchy house slaw, and pickles on a toasted brioche bun.',
    price: 190,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    isVeg: false,
    rating: 4.7,
    reviews: 175
  },
  {
    id: 'bg-3',
    name: 'Spicy Paneer Tikka Burger',
    description: 'Crispy crumb-fried paneer block marinated in tikka spices, layered with mint mayo, tandoori sauce, onions, and capsicum.',
    price: 170,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: true,
    rating: 4.8,
    reviews: 190
  },

  // Snacks
  {
    id: 'sn-1',
    name: 'Loaded Neon Nachos',
    description: 'Crispy tortilla chips smothered in warm cheese sauce, dynamic neon-pink sour cream, jalapenos, and freshly chopped tomato salsa.',
    price: 150,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    isVeg: true,
    rating: 4.5,
    reviews: 92
  },
  {
    id: 'sn-2',
    name: 'Spicy Peri-Peri French Fries',
    description: 'Our famous golden crinkle-cut fries tossed in hot peri-peri seasoning, served with a side of signature garlic aioli.',
    price: 110,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: true,
    rating: 4.8,
    reviews: 245
  },
  {
    id: 'sn-3',
    name: 'Lips Fried Chicken Strips',
    description: 'Juicy buttermilk-brined chicken tenders, golden fried with a signature crunch, served with spicy honey mustard dip.',
    price: 180,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: false,
    rating: 4.9,
    reviews: 188
  },

  // Beverages
  {
    id: 'bv-1',
    name: 'Blue Curacao Neon Mocktail',
    description: 'A vibrant electric-blue sparkling drink with curacao syrup, freshly squeezed lime juice, mint leaves, and a glowing neon sugar rim.',
    price: 130,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    isVeg: true,
    rating: 4.7,
    reviews: 106
  },
  {
    id: 'bv-2',
    name: 'Tondiarpet Cold Brew',
    description: 'Slow-steeped signature coffee beans served over ice, with a splash of sweet condensed milk and a velvety cold foam top.',
    price: 140,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    isVeg: true,
    rating: 4.9,
    reviews: 154
  },
  {
    id: 'bv-3',
    name: 'Iced Peach Green Tea',
    description: 'Refreshing brewed green tea infused with sweet peach pulp syrup, fresh mint leaves, and lime slices.',
    price: 110,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    isVeg: true,
    rating: 4.6,
    reviews: 79
  }
];
