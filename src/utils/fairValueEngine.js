// E-Waste Connect — Transparent Fair-Value Engine & Reference Data Layer

// 1. Reference Material Scrap Rates (INR per kg)
export const MATERIAL_SCRAP_RATES = {
  copper: 650,       // Pure Copper Winding / Tubing
  goldPcb: 1200,     // High-grade IC / Gold Contact Pins
  aluminium: 180,    // Aluminium Fins / Heatsinks
  steel: 45,         // Steel Frame / Stainless Steel
  plastics: 30,      // ABS / Polypropylene
  glass: 12          // Display / Lead Glass
};

// 2. Known Brand Taxonomy & Resale Value Multipliers
export const BRAND_TAXONOMY = {
  // Tier 1 — Premium Brands (1.20x - 1.35x Resale Factor)
  tier1: {
    name: "Tier 1 (Premium)",
    multiplier: 1.25,
    brands: ["Apple", "Sony", "Samsung", "Dell", "Alienware", "LG", "Bosch", "Voltas", "Dyson", "Bose"]
  },
  // Tier 2 — Standard Popular Brands (0.95x - 1.10x Resale Factor)
  tier2: {
    name: "Tier 2 (Standard)",
    multiplier: 1.0,
    brands: ["HP", "Lenovo", "Asus", "Acer", "Whirlpool", "Panasonic", "Haier", "IFB", "Godrej", "Toshiba", "Philips", "Xiaomi", "OnePlus", "Motorola", "Mi"]
  },
  // Tier 3 — Value / Generic / Unbranded (0.80x Resale Factor)
  tier3: {
    name: "Tier 3 (Generic)",
    multiplier: 0.80,
    brands: ["Generic", "Unbranded", "Other"]
  }
};

// Helper: Match Brand string to Tier
export function getBrandTier(brandName) {
  if (!brandName || typeof brandName !== 'string') {
    return BRAND_TAXONOMY.tier3;
  }
  const clean = brandName.trim().toLowerCase();
  for (const t1 of BRAND_TAXONOMY.tier1.brands) {
    if (clean.includes(t1.toLowerCase())) return BRAND_TAXONOMY.tier1;
  }
  for (const t2 of BRAND_TAXONOMY.tier2.brands) {
    if (clean.includes(t2.toLowerCase())) return BRAND_TAXONOMY.tier2;
  }
  return BRAND_TAXONOMY.tier3;
}

// 3. Category Reference Data (Base Ref Prices, Default Weights & Material Composition)
export const CATEGORY_REFERENCE_DATA = {
  "Mobile Phone": {
    baseRefPrice: 16000,
    defaultWeightKg: 0.18,
    materialBreakdown: { goldPcb: 0.12, copper: 0.28, glass: 0.60 }
  },
  "Laptop": {
    baseRefPrice: 32000,
    defaultWeightKg: 2.1,
    materialBreakdown: { goldPcb: 0.08, aluminium: 0.35, plastics: 0.37, copper: 0.20 }
  }
};

// 4. Calculate Material Scrap Value Rate (INR per kg)
export function getScrapRatePerKg(categoryName) {
  const ref = CATEGORY_REFERENCE_DATA[categoryName] || CATEGORY_REFERENCE_DATA["Mobile Phone"];
  const breakdown = ref.materialBreakdown;
  let rate = 0;
  for (const [matKey, pct] of Object.entries(breakdown)) {
    rate += (MATERIAL_SCRAP_RATES[matKey] || 30) * pct;
  }
  return Math.round(rate);
}

// 5. Fair-Value Engine Core Calculation Algorithm
export function calculateFairValue(input) {
  const category = input.category || "Mobile Phone";
  const refData = CATEGORY_REFERENCE_DATA[category] || CATEGORY_REFERENCE_DATA["Mobile Phone"];

  // A. Weight Determination
  const weightKg = parseFloat(input.weightKg) > 0 ? parseFloat(input.weightKg) : refData.defaultWeightKg;

  // B. Material Scrap Baseline Value
  const scrapRatePerKg = getScrapRatePerKg(category);
  const totalScrapValue = weightKg * scrapRatePerKg;

  // C. Brand Tier & Factor
  const brandTier = getBrandTier(input.brand);
  const brandFactor = brandTier.multiplier;

  // D. Condition Assessment Multiplier Calculation
  // Power On
  let powerScore = 0.7;
  if (input.powerOn === "Yes") powerScore = 1.0;
  else if (input.powerOn === "No") powerScore = 0.4;

  // Functions Normally
  let funcScore = 0.6;
  if (input.functionsNormally === "Yes") funcScore = 1.0;
  else if (input.functionsNormally === "Partially") funcScore = 0.7;
  else if (input.functionsNormally === "No") funcScore = 0.3;

  // Physical Damage
  let damageScore = 0.7;
  if (input.physicalDamage === "None") damageScore = 1.0;
  else if (input.physicalDamage === "Minor") damageScore = 0.75;
  else if (input.physicalDamage === "Major") damageScore = 0.45;

  // Age Score
  let ageScore = 0.5;
  if (input.approxAge === "Less than 3 years" || input.approxAge === "<3 years") ageScore = 1.0;
  else if (input.approxAge === "3–5 years" || input.approxAge === "3–5") ageScore = 0.75;
  else if (input.approxAge === "5–10 years" || input.approxAge === "5–10") ageScore = 0.50;
  else if (input.approxAge === "10+ years" || input.approxAge === "15+ years" || input.approxAge === "10–15 years") ageScore = 0.30;

  // Weighted overall condition score (0.0 to 1.0)
  const conditionScore = (powerScore * 0.30) + (funcScore * 0.30) + (damageScore * 0.20) + (ageScore * 0.20);

  // Condition Category Mapping
  let conditionCategory = "SCRAP";
  if (conditionScore >= 0.80) conditionCategory = "GOOD";
  else if (conditionScore >= 0.60) conditionCategory = "FAIR";
  else if (conditionScore >= 0.40) conditionCategory = "DAMAGED";

  // E. Resale Market Baseline Component
  const baseRefPrice = refData.baseRefPrice;
  const workingResaleValue = baseRefPrice * brandFactor * (conditionScore * 0.85);

  // F. Net Estimated Midpoint Valuation
  // Processing & Logistics handling fee scaling
  const processingFee = Math.min(600, Math.max(150, totalScrapValue * 0.08));
  const rawMidpoint = Math.max(totalScrapValue, workingResaleValue) - processingFee;

  // G. Value Range Calculation (±10% bounds rounded to nearest 50)
  const minFairValue = Math.max(150, Math.round((rawMidpoint * 0.90) / 50) * 50);
  const maxFairValue = Math.max(minFairValue + 100, Math.round((rawMidpoint * 1.10) / 50) * 50);

  return {
    category,
    brand: input.brand || "Brand not detected",
    model: input.model || "",
    conditionCategory,
    conditionScorePercent: Math.round(conditionScore * 100),
    weightKg,
    scrapRatePerKg,
    totalScrapValue: Math.round(totalScrapValue),
    workingResaleValue: Math.round(workingResaleValue),
    estimatedMidpoint: Math.round(rawMidpoint),
    minFairValue,
    maxFairValue,
    brandTier: brandTier.name,
    brandFactor,
    isReferenceData: true
  };
}

// 6. Recycler Offer Comparison & Evaluation
export function evaluateRecyclerOffer(offerPrice, minFairValue, maxFairValue) {
  const numericPrice = parseFloat(offerPrice) || 0;
  
  // Thresholds
  const fairThreshold = minFairValue * 0.90;
  const lowThreshold = minFairValue * 0.75;

  if (numericPrice >= fairThreshold) {
    return {
      status: "FAIR",
      symbol: "🟢",
      label: "Fair Offer",
      badgeClass: "badge-fair",
      textColor: "#34D399",
      borderColor: "rgba(16, 185, 129, 0.4)",
      bgColor: "rgba(16, 185, 129, 0.1)",
      explanation: "This offer is within or above the estimated fair market value range for this item."
    };
  } else if (numericPrice >= lowThreshold) {
    return {
      status: "BELOW_TYPICAL",
      symbol: "🟡",
      label: "Below Typical Value",
      badgeClass: "badge-below",
      textColor: "#FBBF24",
      borderColor: "rgba(245, 158, 11, 0.4)",
      bgColor: "rgba(245, 158, 11, 0.1)",
      explanation: "This offer is slightly below typical market value for an appliance in this condition."
    };
  } else {
    return {
      status: "LOW",
      symbol: "🔴",
      label: "Potentially Low Offer",
      badgeClass: "badge-unfair",
      textColor: "#F87171",
      borderColor: "rgba(239, 68, 68, 0.4)",
      bgColor: "rgba(239, 68, 68, 0.1)",
      explanation: "This offer is significantly below estimated fair market value. Authorized recyclers yield higher payouts."
    };
  }
}
