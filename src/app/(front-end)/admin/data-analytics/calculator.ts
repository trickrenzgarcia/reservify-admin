import { Payment } from "../payments/data/payment";

// Function to calculate payment summaries and generate chart data for one month
export function calculatePaymentsSummary(
  payments: Payment[],
  targetMonth: string
) {
  const chartData: { sales: number; tax: number } = { sales: 0, tax: 0 };

  let totalAmount = 0;
  let totalFee = 0;
  let totalNetAmount = 0;
  let paidPaymentsCount = 0;

  payments.forEach((payment) => {
    const { amount, fee, net_amount, status, created_at } = payment.attributes;
    if (status === "paid") {
      const paymentMonth = new Date(created_at * 1000).toLocaleString(
        "default",
        {
          month: "short",
        }
      );

      // Only process payments from the target month
      if (paymentMonth === targetMonth) {
        totalAmount += amount;
        totalFee += fee;
        totalNetAmount += net_amount;
        paidPaymentsCount += 1;

        // Add amounts to the respective month
        chartData.sales += amount;
        chartData.tax += fee; // Assuming tax is derived from fee
      }
    }
  });

  // Return chart data as a single month entry
  const chartDataArray = [
    {
      month: targetMonth,
      sales: chartData.sales,
      tax: chartData.tax,
    },
  ];

  return {
    chartData: chartDataArray,
    totalAmount,
    totalFee,
    totalNetAmount,
    paidPaymentsCount,
  };
}

// Utility function to format currency
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}
