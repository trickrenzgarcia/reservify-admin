"use client"
import { Bar, BarChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from 'react'
import { TrendingUp } from 'lucide-react'
import { Payment } from '../../payments/data/payment'
import { calculatePaymentsSummary, formatCurrency } from '../calculator'

export const description = "A stacked bar chart with a legend"

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  tax: {
    label: "Tax",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export default function BarChartComponent({ payments }: { payments: Payment[] }) {
   // Specify the target month (e.g., "Oct" for October)
   const targetMonth = "Nov"; // Example: this can be dynamic or hardcoded for now
   const { chartData, totalAmount, totalFee, totalNetAmount, paidPaymentsCount } = calculatePaymentsSummary(payments, targetMonth);

   return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Total Sales for {targetMonth}</CardTitle>
        <CardDescription>
          Sales Report for {targetMonth}
        </CardDescription>
      </CardHeader>
      <CardContent className="shadow-none">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Abbreviate month
            />
            <Bar
              dataKey="sales"
              stackId="a"
              fill="var(--color-sales)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="tax"
              stackId="a"
              fill="var(--color-tax)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                        style={{
                          "--color-bg": `var(--color-${name})`,
                        } as React.CSSProperties}
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label || name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {formatCurrency(value as number)}
                        <span className="font-normal text-muted-foreground">
                          PHP
                        </span>
                      </div>
                    </>
                  )}
                />
              }
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {/* Optional growth indicator */}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total revenues for {targetMonth}
        </div>
      </CardFooter>
    </Card>
  );
}
