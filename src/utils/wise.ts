const WISE_API_KEY = "404a0391-2d62-4d55-938e-dbfba0ae3d48";
const WISE_API_BASE = "https://api.transferwise.com/v1";

export interface WisePaymentRequest {
  targetAccount: string;
  amount: number;
  currency: string;
  customerEmail?: string;
  reference?: string;
}

export async function createWisePayment({ targetAccount, amount, currency, customerEmail, reference }: WisePaymentRequest) {
  const url = `${WISE_API_BASE}/payments`;
  const body = {
    targetAccount,
    amount,
    currency,
    customerEmail,
    reference,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${WISE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Wise API error: ${response.status} ${error}`);
  }
  return response.json();
} 