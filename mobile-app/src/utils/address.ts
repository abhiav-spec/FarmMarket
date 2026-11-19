import { type DeliveryAddress } from '@/types';

export function formatAddress(address: DeliveryAddress): string {
  return `${address.line1}, ${address.area}, ${address.district}, ${address.state} - ${address.pincode}`;
}
