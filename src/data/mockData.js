// Mock data & multi-language locale dictionary for E-Waste Connect

export const PRESET_PRODUCTS = [
  {
    id: "fridge-01",
    name: "Old Refrigerator",
    category: "Large Household E-Waste",
    defaultCondition: "Non-functional",
    estimatedWeightKg: 70,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80",
    materials: [
      { name: "Steel", percentage: 55, estKg: 38.5, ratePerKg: 38 },
      { name: "Copper", percentage: 12, estKg: 8.4, ratePerKg: 680 },
      { name: "Aluminium", percentage: 8, estKg: 5.6, ratePerKg: 190 },
      { name: "Plastic (ABS/HIPS)", percentage: 15, estKg: 10.5, ratePerKg: 35 },
      { name: "Compressor / Glass / Others", percentage: 10, estKg: 7.0, ratePerKg: 20 }
    ],
    specialHandling: ["Refrigerant (R134a/R600a) Evacuation Required", "Compressor Oil Drain", "Capacitor Discharge"],
    hazardLevel: "Medium",
    minFairValue: 3000,
    maxFairValue: 3600,
    sampleOffers: [
      { recyclerId: "rec-1", name: "GreenCycle Recycling Unit", rating: 4.9, distanceKm: 18, isAuthorized: true, offerPrice: 3400, status: "FAIR", tag: "Best Match" },
      { recyclerId: "rec-2", name: "EcoMetals Processing Ltd", rating: 4.7, distanceKm: 24, isAuthorized: true, offerPrice: 3100, status: "FAIR", tag: "Quick Pickup" },
      { recyclerId: "rec-3", name: "Local Scrap Buyer (Uncertified)", rating: 3.5, distanceKm: 5, isAuthorized: false, offerPrice: 2400, status: "UNFAIR", tag: "Lowball" }
    ]
  },
  {
    id: "washing-02",
    name: "Front-Load Washing Machine",
    category: "Large Household E-Waste",
    defaultCondition: "Partial Functional / Motor Dead",
    estimatedWeightKg: 62,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
    materials: [
      { name: "Stainless Steel & Iron", percentage: 60, estKg: 37.2, ratePerKg: 40 },
      { name: "Copper Winding (Motor)", percentage: 14, estKg: 8.68, ratePerKg: 690 },
      { name: "Polypropylene Plastic", percentage: 18, estKg: 11.16, ratePerKg: 30 },
      { name: "Control PCB & Harness", percentage: 8, estKg: 4.96, ratePerKg: 150 }
    ],
    specialHandling: ["Concrete Counterweight Removal", "Water Pump Separation"],
    hazardLevel: "Low",
    minFairValue: 2800,
    maxFairValue: 3300,
    sampleOffers: [
      { recyclerId: "rec-1", name: "GreenCycle Recycling Unit", rating: 4.9, distanceKm: 18, isAuthorized: true, offerPrice: 3150, status: "FAIR", tag: "Recommended" },
      { recyclerId: "rec-4", name: "Apex E-Waste Disposers", rating: 4.8, distanceKm: 31, isAuthorized: true, offerPrice: 2900, status: "FAIR", tag: "Bulk Buyer" }
    ]
  },
  {
    id: "laptop-03",
    name: "Used Gaming / Business Laptop",
    category: "IT & Telecommunications",
    defaultCondition: "Non-functional / Motherboard Failure",
    estimatedWeightKg: 2.3,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    materials: [
      { name: "Gold/Silver PCB Contacts", percentage: 5, estKg: 0.11, ratePerKg: 8500 },
      { name: "Aluminium Body & Heatpipes", percentage: 35, estKg: 0.8, ratePerKg: 210 },
      { name: "Lithium-Ion Battery Cell", percentage: 20, estKg: 0.46, ratePerKg: 120 },
      { name: "Display Glass & Plastic", percentage: 40, estKg: 0.92, ratePerKg: 25 }
    ],
    specialHandling: ["Li-Ion Battery Isolation", "Data Storage Zeroing / Destruction Tag"],
    hazardLevel: "High",
    minFairValue: 1200,
    maxFairValue: 1600,
    sampleOffers: [
      { recyclerId: "rec-5", name: "Silicon Recovery Solutions", rating: 4.9, distanceKm: 12, isAuthorized: true, offerPrice: 1500, status: "FAIR", tag: "High Precious Metals" },
      { recyclerId: "rec-1", name: "GreenCycle Recycling Unit", rating: 4.9, distanceKm: 18, isAuthorized: true, offerPrice: 1300, status: "FAIR", tag: "Standard" }
    ]
  },
  {
    id: "phone-04",
    name: "Old Smartphone (Broken Screen)",
    category: "Consumer Electronics",
    defaultCondition: "Scrapped / Damaged Battery",
    estimatedWeightKg: 0.22,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    materials: [
      { name: "Gold/Palladium IC Chips", percentage: 8, estKg: 0.017, ratePerKg: 14000 },
      { name: "Copper & Cobalt Battery", percentage: 30, estKg: 0.066, ratePerKg: 1100 },
      { name: "Gorilla Glass & Polymer", percentage: 62, estKg: 0.136, ratePerKg: 40 }
    ],
    specialHandling: ["Thermal Battery Safety Enclosure"],
    hazardLevel: "High",
    minFairValue: 350,
    maxFairValue: 500,
    sampleOffers: [
      { recyclerId: "rec-5", name: "Silicon Recovery Solutions", rating: 4.9, distanceKm: 12, isAuthorized: true, offerPrice: 480, status: "FAIR", tag: "Instant Cash" }
    ]
  },
  {
    id: "tv-05",
    name: "Old CRT / Smart TV Unit",
    category: "Consumer Electronics",
    defaultCondition: "Broken Screen / Defective Board",
    estimatedWeightKg: 28,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    materials: [
      { name: "Lead Glass / Frame", percentage: 45, estKg: 12.6, ratePerKg: 15 },
      { name: "Copper Yoke Coil", percentage: 12, estKg: 3.36, ratePerKg: 650 },
      { name: "High Impact Plastic", percentage: 33, estKg: 9.24, ratePerKg: 30 },
      { name: "Power PCB Board", percentage: 10, estKg: 2.8, ratePerKg: 140 }
    ],
    specialHandling: ["Lead Glass Separation", "Capacitor High Voltage Discharge"],
    hazardLevel: "High",
    minFairValue: 900,
    maxFairValue: 1250,
    sampleOffers: [
      { recyclerId: "rec-2", name: "EcoMetals Processing Ltd", rating: 4.7, distanceKm: 24, isAuthorized: true, offerPrice: 1150, status: "FAIR", tag: "Verified Lead Recycler" }
    ]
  },
  {
    id: "cable-06",
    name: "Industrial Copper Wires & Cables",
    category: "Cable & Wiring Scrap",
    defaultCondition: "Stripped & Mixed Bundles",
    estimatedWeightKg: 15,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    materials: [
      { name: "Pure Electrolytic Copper", percentage: 68, estKg: 10.2, ratePerKg: 720 },
      { name: "PVC Insulation Plastic", percentage: 32, estKg: 4.8, ratePerKg: 25 }
    ],
    specialHandling: ["Mechanical Stripping (No Burning Allowed)"],
    hazardLevel: "Low",
    minFairValue: 4200,
    maxFairValue: 4800,
    sampleOffers: [
      { recyclerId: "rec-2", name: "EcoMetals Processing Ltd", rating: 4.7, distanceKm: 24, isAuthorized: true, offerPrice: 4650, status: "FAIR", tag: "Highest Metal Purity" }
    ]
  }
];

export const INITIAL_RECYCLER_DEMANDS = [
  {
    id: "dem-101",
    recyclerName: "ABC Recycling Solutions",
    location: "Coimbatore, TN",
    distanceKm: 14,
    productNeeded: "Old Refrigerators",
    category: "Large Household E-Waste",
    qtyRequired: 50,
    unit: "units",
    qtyFulfilled: 27,
    offeredPricePerUnit: 3450,
    preferredCondition: "Non-functional accepted",
    expiresAt: "2026-09-30",
    matchingCollectorsCount: 23,
    status: "ACTIVE",
    badge: "High Demand"
  },
  {
    id: "dem-102",
    recyclerName: "EcoMetals Processing Ltd",
    location: "Madurai, TN",
    distanceKm: 42,
    productNeeded: "Heavy Industrial Copper Wires",
    category: "Cable Scrap",
    qtyRequired: 250,
    unit: "kg",
    qtyFulfilled: 110,
    offeredPricePerUnit: 310,
    preferredCondition: "Stripped or Insulated",
    expiresAt: "2026-10-15",
    matchingCollectorsCount: 41,
    status: "ACTIVE",
    badge: "Instant Payout"
  },
  {
    id: "dem-103",
    recyclerName: "GreenCycle Recovery Hub",
    location: "Dindigul, TN",
    distanceKm: 28,
    productNeeded: "Old Washing Machines",
    category: "Large Household E-Waste",
    qtyRequired: 25,
    unit: "units",
    qtyFulfilled: 18,
    offeredPricePerUnit: 3100,
    preferredCondition: "Any Condition",
    expiresAt: "2026-09-25",
    matchingCollectorsCount: 14,
    status: "ACTIVE",
    badge: "Free Doorstep Pickup"
  },
  {
    id: "dem-104",
    recyclerName: "Silicon Precious Metal Recovery",
    location: "Chennai, TN",
    distanceKm: 180,
    productNeeded: "Computer PCBs & Motherboards",
    category: "IT & Telecommunications",
    qtyRequired: 500,
    unit: "kg",
    qtyFulfilled: 340,
    offeredPricePerUnit: 480,
    preferredCondition: "Unbroken Boards",
    expiresAt: "2026-11-01",
    matchingCollectorsCount: 68,
    status: "ACTIVE",
    badge: "CPCB Certified"
  }
];

export const MOCK_COLLECTOR_LOTS = [
  {
    lotId: "EW-2026-00452",
    product: "Old Refrigerator",
    category: "Large Household E-Waste",
    weightKg: 70,
    condition: "Non-functional",
    fairValueRange: "₹3,000 – ₹3,600",
    collectorLocation: "Peelamedu, Coimbatore",
    status: "Recycler Matched",
    currentOffer: 3400,
    recyclerName: "GreenCycle Recycling Unit",
    collectionDate: "2026-09-08",
    handoverDate: "2026-09-12",
    recoveredMaterials: ["Steel (38.5kg)", "Copper (8.4kg)", "Aluminium (5.6kg)", "Plastic (10.5kg)"],
    timeline: [
      { step: "Collected", date: "08 Sep 2026", status: "completed" },
      { step: "AI Classified", date: "08 Sep 2026", status: "completed" },
      { step: "Fair Value Estimated", date: "09 Sep 2026", status: "completed" },
      { step: "Recycler Matched", date: "09 Sep 2026", status: "current" },
      { step: "Offer Accepted", date: "Pending", status: "upcoming" },
      { step: "Picked Up", date: "Pending", status: "upcoming" },
      { step: "Received by Recycler", date: "Pending", status: "upcoming" },
      { step: "Dismantled", date: "Pending", status: "upcoming" },
      { step: "Materials Recovered", date: "Pending", status: "upcoming" },
      { step: "Recycling Completed", date: "Pending", status: "upcoming" }
    ]
  },
  {
    lotId: "EW-2026-00418",
    product: "Used Gaming Laptop",
    category: "IT & Telecommunications",
    weightKg: 2.3,
    condition: "Dead Motherboard",
    fairValueRange: "₹1,200 – ₹1,600",
    collectorLocation: "Gandhipuram, Coimbatore",
    status: "Recycling Completed",
    currentOffer: 1500,
    recyclerName: "Silicon Recovery Solutions",
    collectionDate: "2026-08-28",
    handoverDate: "2026-08-30",
    recoveredMaterials: ["Gold Contact (0.11kg)", "Aluminium (0.8kg)", "Lithium Cell (0.46kg)"],
    timeline: [
      { step: "Collected", date: "28 Aug 2026", status: "completed" },
      { step: "AI Classified", date: "28 Aug 2026", status: "completed" },
      { step: "Fair Value Estimated", date: "28 Aug 2026", status: "completed" },
      { step: "Recycler Matched", date: "29 Aug 2026", status: "completed" },
      { step: "Offer Accepted", date: "29 Aug 2026", status: "completed" },
      { step: "Picked Up", date: "30 Aug 2026", status: "completed" },
      { step: "Received by Recycler", date: "30 Aug 2026", status: "completed" },
      { step: "Dismantled", date: "31 Aug 2026", status: "completed" },
      { step: "Materials Recovered", date: "01 Sep 2026", status: "completed" },
      { step: "Recycling Completed", date: "02 Sep 2026", status: "completed" }
    ]
  }
];

export const SAFETY_INSTRUCTIONS = [
  {
    id: "safe-fridge",
    title: "Refrigerators & Compressors",
    icon: "ShieldAlert",
    hazardTag: "Refrigerant & Gas Hazard",
    speechText: "Warning for Refrigerators: Do not puncture cooling coils or cut compressor tubes. Freeon and R600 gases are harmful and flammable. Always transfer to authorized technicians who use gas recovery pumps.",
    points: [
      "Never puncture internal cooling coils or sever sealed compressor tubes.",
      "Refrigerant gases (R134a / R600a) must be evacuated using recovery machinery to avoid greenhouse gas release.",
      "Disconnect capacitor terminals before handling motor assemblies."
    ]
  },
  {
    id: "safe-battery",
    title: "Lithium-Ion & Lead Batteries",
    icon: "BatteryWarning",
    hazardTag: "Fire & Chemical Risk",
    speechText: "Warning for Batteries: Do not crush, puncture, or expose lithium batteries to water or high heat. Store in dry, non-conductive containers with insulated tape on battery terminals.",
    points: [
      "Do not crush, puncture, or subject battery cells to moisture or extreme heat.",
      "Cover battery contacts with insulating electrical tape to prevent short circuits.",
      "Store damaged or swollen cells in vermiculite or dry sand fire-retardant bins."
    ]
  },
  {
    id: "safe-crt",
    title: "CRT Monitors & Old Televisions",
    icon: "Tv",
    hazardTag: "Implosion & Toxic Lead",
    speechText: "Warning for CRT Monitors: CRT glass tubes contain high amounts of toxic lead and vacuum pressure. Handle gently without scratching the glass shell to prevent explosive glass implosion.",
    points: [
      "CRT glass funnel contains up to 3 kg of toxic lead glass - do not smash glass open.",
      "Vacuum tube can violently implode if neck assembly is cracked.",
      "High voltage capacitors can retain dangerous charge for days after unplugging."
    ]
  },
  {
    id: "safe-pcb",
    title: "Printed Circuit Boards (PCBs)",
    icon: "Cpu",
    hazardTag: "Dust & Fine Particulates",
    speechText: "Warning for Circuit Boards: Wear protective gloves and dust mask when handling stripped circuit boards. Do not burn wire insulation or solder joints manually.",
    points: [
      "Wear cut-resistant gloves and protective dust masks when sorting sharp circuit boards.",
      "Never burn wire insulation or PCBs in open fires — open burning releases toxic dioxins.",
      "Use mechanical shredding and chemical leaching in certified refining facilities."
    ]
  }
];

export const LOCALES = {
  en: {
    appName: "E-Waste Connect",
    tagline: "Know the value. Find the right recycler. Recycle responsibly.",
    collector: "Collector",
    recycler: "Recycler",
    admin: "Admin Audit",
    scanCTA: "Scan Your E-Waste",
    scanSub: "Know what you have and what it may be worth with AI estimation.",
    activeLots: "Active Lots",
    pendingOffers: "Pending Offers",
    totalEarnings: "Total Earnings",
    itemsRecycled: "Tonnage Recycled",
    recyclerDemandNear: "Recycler Demand Near You",
    viewDemand: "View Demand",
    sellToRecycler: "Sell to Recycler",
    aiScannerTitle: "AI E-Waste Fair-Value Scanner",
    analyzingImage: "AI Engine Analyzing E-Waste Image...",
    productIdentified: "Product Successfully Identified",
    estimatedFairValue: "Estimated Fair Value Range",
    compareOffers: "Compare Recycler Offers",
    acceptOffer: "Accept Offer",
    fairOffer: "FAIR OFFER",
    belowFair: "BELOW FAIR VALUE",
    unfairOffer: "POTENTIALLY UNFAIR OFFER",
    passportTitle: "Digital E-Waste Passport",
    safetyTitle: "Safety & Handling Protocols",
    listenAudio: "Listen to Safety Instructions",
    voiceMode: "Voice & Low Literacy Mode",
    postRequirement: "+ Post Requirement"
  },
  ta: {
    appName: "இ-வேஸ்ட் கனெக்ட் (E-Waste Connect)",
    tagline: "மதிப்பை அறிவீர். சரியான மறுசுழற்சியாளரைக் கண்டறிவீர். பொறுப்புடன் மறுசுழற்சி செய்வீர்.",
    collector: "சேகரிப்பாளர் (Collector)",
    recycler: "மறுசுழற்சியாளர் (Recycler)",
    admin: "நிர்வாகி (Admin)",
    scanCTA: "உங்கள் மின்னணு கழிவை ஸ்கேன் செய்யுங்கள்",
    scanSub: "AI தொழில்நுட்பம் மூலம் கழிவின் நியாயமான மதிப்பை அறிந்து கொள்ளுங்கள்.",
    activeLots: "செயலில் உள்ள கழிவுகள்",
    pendingOffers: "காத்திருக்கும் ஆஃபர்கள்",
    totalEarnings: "மொத்த வருமானம்",
    itemsRecycled: "மறுசுழற்சி செய்யப்பட்ட எடை",
    recyclerDemandNear: "உங்களுக்கு அருகிலுள்ள நிறுவனங்களின் தேவைகள்",
    viewDemand: "தேவையை காண்க",
    sellToRecycler: "விற்பனை செய்க",
    aiScannerTitle: "AI மின்னணு கழிவு ஸ்கேனர்",
    analyzingImage: "AI ஸ்கேன் செய்கிறது...",
    productIdentified: "பொருள் கண்டறியப்பட்டது",
    estimatedFairValue: "கணக்கிடப்பட்ட நியாயமான விலை",
    compareOffers: "ஆஃபர்களை ஒப்பிடுக",
    acceptOffer: "ஆஃபரை ஏற்கவும்",
    fairOffer: "நியாயமான ஆஃபர் 🟢",
    belowFair: "குறைந்த விலை ஆஃபர் 🟡",
    unfairOffer: "மிகக் குறைந்த விலை 🔴",
    passportTitle: "டிஜிட்டல் இ-வேஸ்ட் பாஸ்போர்ட்",
    safetyTitle: "பாதுகாப்பு வழிமுறைகள்",
    listenAudio: "பாதுகாப்பு குரல் வழிமுறையைக் கேட்கவும்",
    voiceMode: "குரல் வழி எளிதான முறை",
    postRequirement: "+ புதிய தேவையை பதிவிடுக"
  },
  hi: {
    appName: "ई-वेस्ट कनेक्ट (E-Waste Connect)",
    tagline: "मूल्य जानें। सही रिसाइकलर ढूंढें। जिम्मेदारी से रिसाइकल करें।",
    collector: "कलेक्टर (Collector)",
    recycler: "रिसाइकलर (Recycler)",
    admin: "एडमिन (Admin)",
    scanCTA: "अपने ई-कचरे को स्कैन करें",
    scanSub: "AI तकनीक से जानें कि आपके ई-कचरे की सही कीमत क्या है।",
    activeLots: "सक्रिय लॉट",
    pendingOffers: "लंबित ऑफर",
    totalEarnings: "कुल कमाई",
    itemsRecycled: "रिसाइकल की गई मात्रा",
    recyclerDemandNear: "आपके पास रिसाइकलर की मांग",
    viewDemand: "मांग देखें",
    sellToRecycler: "बेचें",
    aiScannerTitle: "AI ई-वेस्ट स्कैनर",
    analyzingImage: "AI विश्लेषण कर रहा है...",
    productIdentified: "उत्पाद पहचाना गया",
    estimatedFairValue: "अनुमानित उचित मूल्य",
    compareOffers: "ऑफ़र की तुलना करें",
    acceptOffer: "ऑफ़र स्वीकार करें",
    fairOffer: "उचित ऑफर 🟢",
    belowFair: "उचित से कम 🟡",
    unfairOffer: "संभावित अनुचित ऑफर 🔴",
    passportTitle: "डिजिटल ई-वेस्ट पासपोर्ट",
    safetyTitle: "सुरक्षा निर्देश",
    listenAudio: "सुरक्षा निर्देश सुनें",
    voiceMode: "आवाज सहायता मोड",
    postRequirement: "+ नई मांग पोस्ट करें"
  }
};
