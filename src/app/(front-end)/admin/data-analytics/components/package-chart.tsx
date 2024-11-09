"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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
import { CustomerReview } from '@/lib/firebase/types'

export const description = "A bar chart with an active bar"


const chartConfig = {
  star1: {
    label: "1 Star",
    color: "hsl(var(--chart-1))",
  },
  star2: {
    label: "2 Stars",
    color: "hsl(var(--chart-2))",
  },
  star3: {
    label: "3 Stars",
    color: "hsl(var(--chart-3))",
  },
  star4: {
    label: "4 Stars",
    color: "hsl(var(--chart-4))",
  },
  star5: {
    label: "5 Stars",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function PackageChartComponent({ customerReviews }: { customerReviews: CustomerReview[] }) {
  return (
    <Card className='shadow-none'>
      <CardHeader>
        <CardTitle>Customers Review</CardTitle>
        <CardDescription>View their rates</CardDescription>
      </CardHeader>
      <CardContent className='shadow-none'>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={[]}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="star1" 
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="1" stackId="a" fill="var(--color-star3)" radius={[0, 0, 12, 12]} />
            <Bar dataKey="2" stackId="a" fill="var(--color-star2)" />
            <Bar dataKey="3" stackId="a" fill="var(--color-star1)" />
            <Bar dataKey="4" stackId="a" fill="var(--color-star5)" />
            <Bar dataKey="5" stackId="a" fill="var(--color-star4)" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}