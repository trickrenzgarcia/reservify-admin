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
  // Count the ratings
  const ratingCounts = Array(5).fill(0); // Initialize counts for 1 to 5 stars

  customerReviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1] += 1; // Increment the count for the respective rating
    }
  });

  // Prepare data for the chart
  const chartData = ratingCounts.map((count, index) => ({
    star: `${index + 1} Star`,
    count: count,
  }));
  return (
    <Card className='shadow-none'>
      <CardHeader>
        <CardTitle>Customers Review</CardTitle>
        <CardDescription>View their rates</CardDescription>
      </CardHeader>
      <CardContent className='shadow-none'>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="star" 
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" stackId="a" fill="var(--color-star1)" radius={[12, 12, 12, 12]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}