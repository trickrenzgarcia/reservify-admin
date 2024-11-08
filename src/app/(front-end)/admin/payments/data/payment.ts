export type ResponsePayment = {
  has_more: boolean;
  data: Payment[];
};

export type Payment = {
  id: string;
  type: string;
  attributes: {
    access_url: string | null;
    amount: number;
    balance_transaction_id: string;
    billing: {
      address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
      };
      email: string;
      name: string;
      phone: string;
    };
    currency: string;
    description: string;
    disputed: boolean;
    external_reference_number: number | string | null;
    fee: number;
    instant_settlement: string | null;
    livemode: boolean;
    net_amount: number;
    origin: string;
    payment_intent_id: string;
    payout: string | null;
    source: {
      id: string;
      type: string;
    };
    statement_descriptor: string;
    status: string;
    tax_amount: number | null;
    metadata: null;
    promotion: null;
    refunds: [];
    taxes: [];
    available_at: number;
    created_at: number;
    credited_at: number;
    paid_at: number;
    updated_at: number;
  };
};
