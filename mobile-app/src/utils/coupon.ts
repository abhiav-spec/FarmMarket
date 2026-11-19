export function getCouponDiscountPaise(code: string | null, productTotalPaise: number): number {
  if (code === 'WELCOME10' && productTotalPaise >= 50000) {
    return Math.round(productTotalPaise * 0.1);
  }
  if (code === 'FARM50' && productTotalPaise >= 100000) {
    return 5000;
  }
  return 0;
}
