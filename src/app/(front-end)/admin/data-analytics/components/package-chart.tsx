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

export const description = "A bar chart with an active bar"

const chartData = [
  { 
    package: "Small Group", 
    star1: 5, 
    star2: 4, 
    star3: 12, 
    star4: 6, 
    star5: 4, 
  },
  { 
    package: "Large Group", 
    star1: 8, 
    star2: 3,
    star3: 6, 
    star4: 7, 
    star5: 16, 
  },
  { 
    package: "Exclusive Pack",  
    star1: 3, 
    star2: 8, 
    star3: 6, 
    star4: 4, 
    star5: 2, 
  },
]

const chartConfig = {
  package: {
    label: "Package",
  },
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

export function PackageChartComponent() {
  return (
    <Card className='shadow-none'>
      <CardHeader>
        <CardTitle>Customers Review</CardTitle>
        <CardDescription>View their rates</CardDescription>
      </CardHeader>
      <CardContent className='shadow-none'>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="package"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="star1" stackId="a" fill="var(--color-star3)" radius={[0, 0, 12, 12]} />
            <Bar dataKey="star2" stackId="a" fill="var(--color-star2)" />
            <Bar dataKey="star3" stackId="a" fill="var(--color-star1)" />
            <Bar dataKey="star4" stackId="a" fill="var(--color-star5)" />
            <Bar dataKey="star5" stackId="a" fill="var(--color-star4)" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}