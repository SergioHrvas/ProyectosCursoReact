export const products = [
  // Hamburguesas veganas
  {
    name: "Beyond Vurguer - Hamburguesa Beyond Meat",
    price: 12.5,
    image: "hamburguesas_01",
    categoryId: 1,
    description: "Hamburguesa vegana con Beyond Meat, lechuga, tomate, cebolla caramelizada y salsa especial en pan integral orgánico"
  },
  {
    name: "Vurguer Clásica - Hamburguesa de Lentejas",
    price: 9.5,
    image: "hamburguesas_02",
    categoryId: 1,
    description: "Hamburguesa de lentejas casera con avena, acompañada de aguacate, germinados y mayonesa de cilantro"
  },
  {
    name: "Vurguer Picante - Hamburguesa de Frijol Negro",
    price: 10.5,
    image: "hamburguesas_03",
    categoryId: 1,
    description: "Hamburguesa de frijol negro con chipotle, jalapeños asados, pico de gallo y crema de aguacate"
  },
  {
    name: "Vurguer BBQ - Hamburguesa de Garbanzos",
    price: 11.0,
    image: "hamburguesas_04",
    categoryId: 1,
    description: "Hamburguesa de garbanzos con salsa BBQ casera, aros de cebolla crujientes y coleslaw vegano"
  },
  {
    name: "Vurguer Doble - Doble hamburguesa vegana",
    price: 13.5,
    image: "hamburguesas_06",
    categoryId: 1,
    description: "Doble hamburguesa vegana con queso vegetal fundido, tocino de coco, pepinillos y salsa thousand island"
  },
  {
    name: "Vurguer Mediterránea - Hamburguesa de berenjena",
    price: 11.5,
    image: "hamburguesa_05",
    categoryId: 1,
    description: "Hamburguesa de berenjena asada con pesto de albahaca, tomate seco y queso vegetal de anacardos"
  },
  
  // Pizzas veganas
  {
    name: "Pizza Margherita",
    price: 13.0,
    image: "pizzas_01",
    categoryId: 2,
    description: "Pizza clásica con salsa de tomate natural, queso mozzarella vegetal, albahaca fresca y aceite de oliva extra virgen"
  },
  {
    name: "Pizza de Champiñones",
    price: 14.0,
    image: "pizzas_02",
    categoryId: 2,
    description: "Pizza con champiñones portobello salteados, ajo, romero y queso vegano fundido sobre base de masa madre"
  },
  {
    name: "Pizza de Verduras Grilladas",
    price: 14.5,
    image: "pizzas_03",
    categoryId: 2,
    description: "Pizza con berenjena, calabacín y pimientos asados, cebolla morada y reducción balsámica"
  },
  {
    name: "Pizza de 'Pepperoni' Vegetal",
    price: 14.5,
    image: "pizzas_04",
    categoryId: 2,
    description: "Pizza con pepperoni vegetal a base de seitán, queso vegano y orégano fresco sobre salsa de tomate artesanal"
  },
  {
    name: "Pizza Hawaiana con 'Jamón' Vegetal",
    price: 15.0,
    image: "pizzas_05",
    categoryId: 2,
    description: "Pizza tropical con jamón vegetal de gluten, piña asada, queso vegano y salsa barbacoa"
  },
  {
    name: "Pizza 4 Estaciones",
    price: 15.5,
    image: "pizzas_06",
    categoryId: 2,
    description: "Pizza gourmet con alcachofas, champiñones, olivas negras y pimientos asados sobre base integral"
  },
  
  // Platos veganos
  {
    name: "Bowl de Quinoa con Verduras",
    price: 10.5,
    image: "plato_01",
    categoryId: 3,
    description: "Bowl nutritivo con quinoa, aguacate, zanahoria asada, espinacas, garbanzos y aderezo de tahini"
  },
  {
    name: "Tacos de Jackfruit Deshebrada",
    price: 9.5,
    image: "plato_02",
    categoryId: 3,
    description: "Tacos de jaca deshebrada al estilo carnitas, con cebolla morada, cilantro y salsa de habanero mango"
  },
  {
    name: "Lasagna de Berenjena Vegana",
    price: 12.0,
    image: "plato_03",
    categoryId: 3,
    description: "Lasaña de berenjena con capas de 'ricotta' de anacardos, espinacas y salsa boloñesa de lentejas"
  },
  {
    name: "Curry de Garbanzos y Espinacas",
    price: 10.5,
    image: "plato_04",
    categoryId: 3,
    description: "Curry cremoso de garbanzos, espinacas y leche de coco, servido con arroz basmati y naan vegano"
  },
  {
    name: "Fajitas de Verduras con Guacamole",
    price: 10.0,
    image: "plato_05",
    categoryId: 3,
    description: "Fajitas de pimientos, cebolla y champiñones salteados, con guacamole fresco y frijoles negros"
  },
  {
    name: "Risotto de Champiñones",
    price: 11.0,
    image: "plato_06",
    categoryId: 3,
    description: "Risotto cremoso de champiñones silvestres con vino blanco, ajo y perejil, terminado con 'parmesano' vegetal"
  },
  
  // Postres veganos
  {
    name: "Cheesecake de Frutos Rojos",
    price: 5.5,
    image: "postre_01",
    categoryId: 4,
    description: "Cheesecake cremoso de anacardos con base de nueces y dátiles, cubierto con coulis de frutos rojos"
  },
  {
    name: "Brownie de Chocolate",
    price: 4.5,
    image: "postre_02",
    categoryId: 4,
    description: "Brownie intenso de chocolate sin horno, hecho con avocado y nueces, sin gluten ni azúcar refinada"
  },
  {
    name: "Tarta de Manzana Vegana",
    price: 5.0,
    image: "postre_03",
    categoryId: 4,
    description: "Tarta de manzana canela con crujiente de avena y relleno de compota de manzana sin azúcar añadido"
  },
  {
    name: "Helado de Vainilla",
    price: 3.5,
    image: "postre_04",
    categoryId: 4,
    description: "Helado cremoso de vainilla de Madagascar hecho con leche de coco y endulzado con sirope de agave"
  },
  {
    name: "Mousse de Chocolate",
    price: 4.0,
    image: "postre_05",
    categoryId: 4,
    description: "Mousse aéreo de chocolate oscuro y aguacate, decorado con nibs de cacao y frambuesas frescas"
  },
  {
    name: "Donas Glaseadas",
    price: 3.0,
    image: "postre_06",
    categoryId: 4,
    description: "Donas esponjosas sin huevo ni lácteos, glaseadas con chocolate o vainilla y toppings coloridos"
  },
  
  // Bebidas veganas
  {
    name: "Batido Verde Detox",
    price: 4.5,
    image: "bebida_01",
    categoryId: 5,
    description: "Batido revitalizante de espinacas, piña, jengibre, pepino y limón con semillas de chía"
  },
  {
    name: "Smoothie de Frutos Rojos",
    price: 4.0,
    image: "bebida_02",
    categoryId: 5,
    description: "Smoothie cremoso de frutos rojos, plátano y leche de almendras, rico en antioxidantes"
  },
  {
    name: "Leche Dorada con Cúrcuma",
    price: 3.5,
    image: "bebida_03",
    categoryId: 5,
    description: "Bebida antiinflamatoria de cúrcuma, jengibre, canela y leche de coco endulzada con miel de agave"
  },
  {
    name: "Café con Leche de Avena",
    price: 3.0,
    image: "bebida_04",
    categoryId: 5,
    description: "Café espresso orgánico con leche de avena barista y option de canela o cacao en polvo"
  },
  {
    name: "Té Chai",
    price: 2.5,
    image: "bebida_05",
    categoryId: 5,
    description: "Té chai especiado tradicional con cardamomo, canela, clavo y jengibre, con leche vegetal"
  },
  {
    name: "Limonada de Lavanda",
    price: 3.5,
    image: "bebida_06",
    categoryId: 5,
    description: "Limonada refrescante infusionada con lavanda orgánica y endulzada con jarabe de arce"
  },
  
  // Snacks veganos
  {
    name: "Nuggets de Tofu Crujientes",
    price: 4.5,
    image: "snack_01",
    categoryId: 6,
    description: "Nuggets crujientes de tofu marinado empanizado con almendras, acompañados de salsa barbacoa"
  },
  {
    name: "Rollitos de Primavera",
    price: 4.0,
    image: "snack_02",
    categoryId: 6,
    description: "Rollitos de primavera rellenos de verduras frescas y vermicelli, con salsa agridulce sin gluten"
  },
  {
    name: "Hummus con Verduras",
    price: 3.5,
    image: "snack_03",
    categoryId: 6,
    description: "Hummus cremoso de garbanzo con tahini, ajo y limón, servido con crudités de temporada"
  },
  {
    name: "Papas Fritas con 'Queso'",
    price: 4.5,
    image: "snack_04",
    categoryId: 6,
    description: "Papas fritas caseras al horno con salsa de queso vegetal de papa y zanahoria, y cebolla crispy"
  },
  {
    name: "Alitas de Coliflor Picantes",
    price: 5.0,
    image: "snack_05",
    categoryId: 6,
    description: "Alitas de coliflor empanizadas con salsa buffalo picante y acompañadas de dip de anacardos"
  },
  {
    name: "Empanadas de Espinaca",
    price: 5.5,
    image: "snack_06",
    categoryId: 6,
    description: "Empanadas horneadas de espinaca, tofu ahumado y pasas de uva, con salsa chimichurri"
  }
]