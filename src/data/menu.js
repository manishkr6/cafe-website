/**
 * Café Zéro — Curated Seasonal Menu
 * Gangtok, Sikkim
 */

export const menuCategories = [
  { id: "coffee", name: "COFFEE", description: "High-altitude calibrated roasts & manual extractions" },
  { id: "breakfast", name: "BREAKFAST", description: "Slow morning fuel served until 3:00 PM" },
  { id: "small-plates", name: "SMALL PLATES", description: "Handcrafted savouries & mountain comfort" },
  { id: "desserts", name: "DESSERTS", description: "Small-batch patisserie from our morning oven" }
];

export const menuItems = [
  // COFFEE
  {
    id: "c-1",
    category: "coffee",
    name: "Espresso Doppio",
    price: 180,
    isFeatured: true,
    tags: ["Signature", "Single Origin"],
    description: "Double extraction of our Sikkim-roasted Arabica. Bright citrus acidity melting into dark chocolate and roasted hazelnut.",
    altitude: "5,800 ft Pull",
    brewTime: "28 sec",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-2",
    category: "coffee",
    name: "Himalayan Pour-Over (V60)",
    price: 260,
    isFeatured: true,
    tags: ["Manual Brew", "Micro-Lot"],
    description: "Carefully poured single-origin Meghalaya washed micro-lot. Notes of elderflower, stone fruit, and black tea with clean floral finish.",
    altitude: "Custom Grind",
    brewTime: "3.5 min",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-3",
    category: "coffee",
    name: "Flat White",
    price: 230,
    isFeatured: false,
    tags: ["Silky Microfoam"],
    description: "Ristretto double shot cut with micro-foamed organic mountain milk. Velvety, intense, and perfectly balanced.",
    altitude: "Whole Milk / Oat",
    brewTime: "Warm",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-4",
    category: "coffee",
    name: "Cortado",
    price: 200,
    isFeatured: false,
    tags: ["Balanced"],
    description: "Equal parts espresso and steamed milk in a Spanish duralex glass. The purist's afternoon companion.",
    altitude: "1:1 Ratio",
    brewTime: "Smooth",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-5",
    category: "coffee",
    name: "Cardamom Spiced Cappuccino",
    price: 240,
    isFeatured: true,
    tags: ["Sikkim Spice", "House Favorite"],
    description: "Classic velvety cappuccino infused with crushed black cardamom pods from Dzongu, North Sikkim. Smoky and warming.",
    altitude: "Local Spices",
    brewTime: "Foamed",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-6",
    category: "coffee",
    name: "Zéro 16-Hour Cold Brew",
    price: 270,
    isFeatured: true,
    tags: ["Cold Extraction", "Slow Steeped"],
    description: "Steeped slowly in chilled mountain spring water for sixteen hours. Naturally sweet, zero bitterness, served over clear artisan rock ice.",
    altitude: "16h Steep",
    brewTime: "Chilled",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-7",
    category: "coffee",
    name: "Caffè Latte",
    price: 230,
    isFeatured: false,
    tags: ["Comforting"],
    description: "Gentle espresso folded into generous steamed milk with delicate leaf latte art.",
    altitude: "Oat Milk Available",
    brewTime: "Mild",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-8",
    category: "coffee",
    name: "Dark Mountain Mocha",
    price: 260,
    isFeatured: false,
    tags: ["72% Cocoa"],
    description: "Single-origin espresso blended with melted 72% organic dark chocolate and steamed whole milk, dusted with cocoa nibs.",
    altitude: "Decadent",
    brewTime: "Rich",
    image: "https://images.unsplash.com/photo-1578314670160-2ffb4b455ff1?auto=format&fit=crop&w=800&q=80"
  },

  // BREAKFAST
  {
    id: "b-1",
    category: "breakfast",
    name: "Wild Mountain Berry Hotcakes",
    price: 360,
    isFeatured: true,
    tags: ["Signature Breakfast", "Vegetarian"],
    description: "Fluffy buttermilk hotcakes crowned with whipped ricotta, organic Sikkim forest wild berries, and raw mountain honey reduction.",
    altitude: "Made to order",
    brewTime: "12 min",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b-2",
    category: "breakfast",
    name: "Charred Sourdough & Smashed Avocado",
    price: 380,
    isFeatured: true,
    tags: ["Vegan Option", "House Baked Bread"],
    description: "Seeded country sourdough, Hass avocado with lime zest, pickled Himalayan shallots, crumbled feta, toasted pumpkin seeds, and cold-pressed chili oil.",
    altitude: "Wood-fired loaf",
    brewTime: "Fresh",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b-3",
    category: "breakfast",
    name: "Shakshuka with Tempered Dalle Khursani",
    price: 390,
    isFeatured: true,
    tags: ["Spiced", "Farm Eggs"],
    description: "Two free-range eggs poached in a rich spiced tomato, roasted bell pepper and roasted cumin sauce, with a hint of Sikkim's fragrant Dalle chili and warm sourdough.",
    altitude: "Cast Iron Skillet",
    brewTime: "Piping Hot",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b-4",
    category: "breakfast",
    name: "Himalayan Buckwheat Granola Bowl",
    price: 320,
    isFeatured: false,
    tags: ["Gluten-Free", "Nutritious"],
    description: "Crispy roasted buckwheat, pumpkin seeds, toasted walnuts, Greek hung curd, seasonal sliced fruits, and floral organic honey drizzle.",
    altitude: "Locally Harvested",
    brewTime: "Light",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b-5",
    category: "breakfast",
    name: "Scrambled Eggs on Brioche with Truffle Butter",
    price: 370,
    isFeatured: false,
    tags: ["Savory", "Vegetarian"],
    description: "Velvety soft-scrambled farm eggs over toasted golden brioche with chives, truffle butter, and garden microgreens.",
    altitude: "Slowly Curded",
    brewTime: "Tender",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
  },

  // SMALL PLATES
  {
    id: "s-1",
    category: "small-plates",
    name: "Smoked Yak Cheese & Caramelized Onion Toastie",
    price: 390,
    isFeatured: true,
    tags: ["Local Heritage", "Artisan Cheese"],
    description: "Traditional aged Himalayan cheese blended with mild gruyere and balsamic caramelized onions on sourdough, pressed until molten.",
    altitude: "North Sikkim Dairy",
    brewTime: "Pressed",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "s-2",
    category: "small-plates",
    name: "Handmade Tagliatelle with Wild Forest Mushrooms",
    price: 460,
    isFeatured: true,
    tags: ["Fresh Pasta", "Forest Foraged"],
    description: "Hand-rolled egg pasta tossed in sage butter, foraged pine mushrooms, white wine reduction, and aged parmesan.",
    altitude: "Handmade daily",
    brewTime: "Al Dente",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "s-3",
    category: "small-plates",
    name: "Crispy Rosemary & Truffle Sea Salt Fries",
    price: 240,
    isFeatured: false,
    tags: ["Vegan", "Sharable"],
    description: "Hand-cut Sikkim highland potatoes fried golden, tossed in fresh garden rosemary, truffle oil, and flaky sea salt. Served with roasted garlic aioli.",
    altitude: "Valley Potatoes",
    brewTime: "Crispy",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "s-4",
    category: "small-plates",
    name: "Charred Peach & Burrata Salad",
    price: 420,
    isFeatured: false,
    tags: ["Fresh", "Vegetarian"],
    description: "Creamy whole burrata, flame-charred local peaches, wild rocket leaves, toasted pine nuts, and 12-year aged Modena balsamic.",
    altitude: "Farm fresh",
    brewTime: "Chilled",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
  },

  // DESSERTS
  {
    id: "d-1",
    category: "desserts",
    name: "Burnt Basque Cheesecake",
    price: 320,
    isFeatured: true,
    tags: ["Signature Bake", "Gluten-Free"],
    description: "Caramelized deeply on the outside with an unctuous, custard-soft center. Served with a tart sea-buckthorn coulis.",
    altitude: "Baked daily at 7 AM",
    brewTime: "Decadent",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d-2",
    category: "desserts",
    name: "Warm Valrhona Dark Chocolate Fondant",
    price: 340,
    isFeatured: true,
    tags: ["Warm Molten", "Comfort"],
    description: "Single-origin Valrhona 70% dark chocolate sponge with molten center, accompanied by homemade vanilla bean ice cream.",
    altitude: "10 min bake",
    brewTime: "Warm",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d-3",
    category: "desserts",
    name: "Cardamom & Pistachio Financier",
    price: 220,
    isFeatured: false,
    tags: ["Tea-Cake", "Almond Butter"],
    description: "Brown butter almond cake perfumed with green cardamom and studded with Iranian pistachios. Perfect pairing with pour-over.",
    altitude: "Beurre Noisette",
    brewTime: "Light",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d-4",
    category: "desserts",
    name: "Tiramisù Tradizionale al Caffè Zéro",
    price: 340,
    isFeatured: true,
    tags: ["Classic", "Zero Roast"],
    description: "Savoiardi ladyfingers soaked in our fresh 16-hour cold brew, layered with whipped mascarpone cream and dusted with bitter cocoa.",
    altitude: "Cold aged",
    brewTime: "Velvety",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"
  }
];
