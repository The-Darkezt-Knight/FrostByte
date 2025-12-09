export const products = [
  {
    id: 1,
    name: "Intel Core i9-14900K",
    category: "CPU",
    brand: "Intel",
    price: 32999,
    rating: 4.8,
    reviews: 342,
    stock: 12,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80",
    specs: {
      cores: "24 (8P + 16E)",
      threads: "32",
      baseClock: "3.0 GHz",
      boostClock: "6.0 GHz",
      cache: "36MB",
      tdp: "125W"
    }
  },
  {
    id: 2,
    name: "NVIDIA GeForce RTX 4090",
    category: "GPU",
    brand: "NVIDIA",
    price: 89999,
    rating: 4.9,
    reviews: 567,
    stock: 5,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
    specs: {
      memory: "24GB GDDR6X",
      coreClock: "2230 MHz",
      boostClock: "2520 MHz",
      cudaCores: "16384",
      tdp: "450W"
    }
  },
  {
    id: 3,
    name: "AMD Ryzen 9 7950X",
    category: "CPU",
    brand: "AMD",
    price: 28999,
    rating: 4.7,
    reviews: 289,
    stock: 8,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
    specs: {
      cores: "16",
      threads: "32",
      baseClock: "4.5 GHz",
      boostClock: "5.7 GHz",
      cache: "64MB",
      tdp: "170W"
    }
  },
  {
    id: 4,
    name: "Corsair Vengeance DDR5 32GB",
    category: "RAM",
    brand: "Corsair",
    price: 8499,
    rating: 4.6,
    reviews: 421,
    stock: 24,
    image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=400&q=80",
    specs: {
      capacity: "32GB (2x16GB)",
      speed: "6000MHz",
      latency: "CL36",
      voltage: "1.35V"
    }
  },
  {
    id: 5,
    name: "Samsung 990 PRO 2TB NVMe SSD",
    category: "Storage",
    brand: "Samsung",
    price: 12999,
    rating: 4.8,
    reviews: 612,
    stock: 18,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&q=80",
    specs: {
      capacity: "2TB",
      interface: "PCIe 4.0 x4",
      readSpeed: "7450 MB/s",
      writeSpeed: "6900 MB/s"
    }
  },
  {
    id: 6,
    name: "ASUS ROG Strix X670E-E",
    category: "Motherboard",
    brand: "ASUS",
    price: 24999,
    rating: 4.7,
    reviews: 178,
    stock: 6,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80",
    specs: {
      socket: "AM5",
      chipset: "X670E",
      formFactor: "ATX",
      memorySlots: "4 x DDR5"
    }
  },
  {
    id: 7,
    name: "Corsair RM1000e 1000W PSU",
    category: "PSU",
    brand: "Corsair",
    price: 9999,
    rating: 4.9,
    reviews: 334,
    stock: 15,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80",
    specs: {
      wattage: "1000W",
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fanSize: "135mm"
    }
  },
  {
    id: 8,
    name: "NZXT H7 Flow RGB",
    category: "Case",
    brand: "NZXT",
    price: 6999,
    rating: 4.5,
    reviews: 256,
    stock: 11,
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&q=80",
    specs: {
      formFactor: "Mid Tower",
      color: "Black",
      sidePannel: "Tempered Glass",
      fans: "3x 120mm RGB"
    }
  }
];

export const orders = [
  {
    id: "ORD-2024-001234",
    date: "2024-11-25",
    status: "Out for Delivery",
    total: 45998,
    items: [
      { productId: 1, quantity: 1, name: "Intel Core i9-14900K", price: 32999 },
      { productId: 4, quantity: 1, name: "Corsair Vengeance DDR5 32GB", price: 8499 }
    ],
    timeline: [
      { status: "Order Placed", date: "2024-11-25 10:23", completed: true },
      { status: "Payment Confirmed", date: "2024-11-25 10:25", completed: true },
      { status: "Processing", date: "2024-11-25 14:30", completed: true },
      { status: "Shipped", date: "2024-11-26 09:15", completed: true },
      { status: "Out for Delivery", date: "2024-11-27 08:00", completed: true },
      { status: "Delivered", date: "", completed: false }
    ],
    address: "Unit 4B, Tech Plaza Tower, Makati City, Metro Manila 1226"
  },
  {
    id: "ORD-2024-001189",
    date: "2024-11-18",
    status: "Delivered",
    total: 89999,
    items: [
      { productId: 2, quantity: 1, name: "NVIDIA GeForce RTX 4090", price: 89999 }
    ],
    timeline: [
      { status: "Order Placed", date: "2024-11-18 15:42", completed: true },
      { status: "Payment Confirmed", date: "2024-11-18 15:44", completed: true },
      { status: "Processing", date: "2024-11-19 10:00", completed: true },
      { status: "Shipped", date: "2024-11-20 11:30", completed: true },
      { status: "Out for Delivery", date: "2024-11-21 07:45", completed: true },
      { status: "Delivered", date: "2024-11-21 16:20", completed: true }
    ],
    address: "Unit 4B, Tech Plaza Tower, Makati City, Metro Manila 1226"
  },
  {
    id: "ORD-2024-000987",
    date: "2024-11-10",
    status: "Delivered",
    total: 19998,
    items: [
      { productId: 5, quantity: 1, name: "Samsung 990 PRO 2TB NVMe SSD", price: 12999 },
      { productId: 8, quantity: 1, name: "NZXT H7 Flow RGB", price: 6999 }
    ],
    timeline: [
      { status: "Order Placed", date: "2024-11-10 09:15", completed: true },
      { status: "Payment Confirmed", date: "2024-11-10 09:17", completed: true },
      { status: "Processing", date: "2024-11-10 13:00", completed: true },
      { status: "Shipped", date: "2024-11-11 10:20", completed: true },
      { status: "Out for Delivery", date: "2024-11-12 08:30", completed: true },
      { status: "Delivered", date: "2024-11-12 15:45", completed: true }
    ],
    address: "Unit 4B, Tech Plaza Tower, Makati City, Metro Manila 1226"
  }
];

export const services = [
  {
    id: "SRV-2024-00345",
    type: "PC Assembly",
    status: "In Progress",
    scheduledDate: "2024-11-30",
    scheduledTime: "14:00 - 16:00",
    address: "Unit 4B, Tech Plaza Tower, Makati City",
    technician: {
      name: "Mark Santos",
      phone: "+63 917 123 4567",
      rating: 4.9
    },
    notes: "Custom gaming build with RGB setup",
    progress: 50
  },
  {
    id: "SRV-2024-00312",
    type: "Diagnostics / Repair",
    status: "Completed",
    scheduledDate: "2024-11-20",
    scheduledTime: "10:00 - 12:00",
    address: "Unit 4B, Tech Plaza Tower, Makati City",
    technician: {
      name: "John Reyes",
      phone: "+63 917 234 5678",
      rating: 4.8
    },
    notes: "PC not booting - RAM issue fixed",
    progress: 100
  }
];

export const buybackRequests = [
  {
    id: "BBK-2024-00178",
    componentType: "GPU",
    productName: "NVIDIA RTX 3080 Ti",
    condition: "Good",
    submittedDate: "2024-11-24",
    status: "Offer Received",
    offer: 28500,
    estimatedValue: "25000-30000",
    images: 3
  },
  {
    id: "BBK-2024-00145",
    componentType: "CPU",
    productName: "Intel Core i7-12700K",
    condition: "Excellent",
    submittedDate: "2024-11-15",
    status: "Completed",
    offer: 15200,
    paidAmount: 15200,
    estimatedValue: "14000-16000",
    images: 2
  }
];

export const notifications = [
  {
    id: 1,
    type: "order",
    title: "Order Out for Delivery",
    message: "Your order ORD-2024-001234 is out for delivery and will arrive today",
    timestamp: "2024-11-27 08:00",
    read: false
  },
  {
    id: 2,
    type: "service",
    title: "Service Appointment Confirmed",
    message: "Your PC Assembly service is scheduled for Nov 30, 2:00 PM - 4:00 PM",
    timestamp: "2024-11-26 15:30",
    read: false
  },
  {
    id: 3,
    type: "buyback",
    title: "Buyback Offer Received",
    message: "We've appraised your RTX 3080 Ti. Offer: ₱28,500",
    timestamp: "2024-11-26 11:20",
    read: false
  },
  {
    id: 4,
    type: "promo",
    title: "Black Friday Sale",
    message: "Up to 30% off on selected components. Limited time only!",
    timestamp: "2024-11-25 09:00",
    read: true
  },
  {
    id: 5,
    type: "stock",
    title: "Wishlist Item Back in Stock",
    message: "AMD Ryzen 9 7950X3D is now available",
    timestamp: "2024-11-24 14:15",
    read: true
  }
];

export const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Metro Manila orders typically arrive within 1-2 business days. Provincial deliveries take 3-5 business days depending on location."
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 1 hour of placement if the status is still 'Processing'. Contact support for assistance."
      }
    ]
  },
  {
    category: "Products",
    questions: [
      {
        q: "Do products come with warranty?",
        a: "All products come with manufacturer warranty. Coverage periods vary by brand - check product details for specific warranty information."
      },
      {
        q: "Can I return a product?",
        a: "Yes, unopened products can be returned within 7 days of delivery. Opened products may be returned if defective, subject to inspection."
      }
    ]
  },
  {
    category: "Services",
    questions: [
      {
        q: "What areas do you service?",
        a: "We currently provide installation and repair services in Metro Manila and surrounding areas. Contact us to check availability in your location."
      },
      {
        q: "How much does PC assembly cost?",
        a: "Basic PC assembly starts at ₱1,500. Complex builds with custom cooling and cable management range from ₱2,500-5,000."
      }
    ]
  }
];
