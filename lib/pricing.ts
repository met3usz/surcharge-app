import { ColorItem, ModelItem, PricingData } from "./data";

export function calculateSurcharge(
  model: ModelItem,
  color: ColorItem,
  pricingData: PricingData
): string | null {
  // 1. Find the price list for the model
  const priceList = pricingData.door_price_lists.find((list) =>
    list.door_models.includes(model.WARTOSC)
  );

  if (!priceList) {
    return null; // Model not found in any price list
  }

  // 2. Determine the color group
  // Expected format: "Name (Group) ..." or just "Name" if no group
  // Examples: "NCS (2) S 8010-Y90R brąz", "NCS (1) S 0502-G50Y"
  let group: number | null = null;
  const groupMatch = color.WARTOSC.match(/\((\d+)\)/);
  
  if (groupMatch) {
    group = parseInt(groupMatch[1], 10);
  } else {
    // Try to extract group from POLSKONE_GRUPA_KOLORU (e.g., "RAL1" -> 1)
    const codeGroupMatch = color.POLSKONE_GRUPA_KOLORU.match(/(\d+)$/);
    if (codeGroupMatch) {
      group = parseInt(codeGroupMatch[1], 10);
    }
  }

  if (!group) {
    // If no group is found, we can't determine the surcharge
    return null;
  }

  // 3. Find the pricing for the group
  const pricing = priceList.color_pricing.find((p) => p.group === group);

  if (!pricing) {
    return null; // Group pricing not found
  }

  // 4. Determine if it's RAL or NCS
  const isRal = color.POLSKONE_GRUPA_KOLORU.startsWith("RAL");
  const isNcs = color.POLSKONE_GRUPA_KOLORU.startsWith("NCS") || color.POLSKONE_GRUPA_KOLORU.startsWith("NSC");

  if (isRal) {
    return pricing.price_ral;
  } else if (isNcs) {
    return pricing.price_ncs;
  }

  return null;
}
