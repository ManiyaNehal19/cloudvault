"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Label } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { convertFileSize } from "@/lib/utils";

type StorageUsageCardProps = {
  used: number
  totalGB: number
}

const StorageUsageCard: React.FC<StorageUsageCardProps> = ({ used, totalGB }) => {

  const percentUsed = (used / totalGB) * 100

  const data = [
    { name: "Used", value: percentUsed },
    { name: "Remaining", value: 100 - percentUsed },
  ]

  const COLORS = ["#ffffff", "rgba(255,255,255,0.3)"]

  return (
    <Card className="flex items-center justify-between bg-[#125ffa] text-white p-6 rounded-xl">
      <CardContent className="flex items-center gap-6 p-0">
        {/* Donut Chart */}
        <div className="relative w-[120px] h-[120px]">
          <PieChart width={120} height={120}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={45}
              outerRadius={55}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              <Label
                position="center"
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-xl font-bold fill-white"
                        >
                          {percentUsed.toFixed(2)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="text-xs fill-white opacity-80"
                        >
                          Space used
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </div>

        {/* Right side text */}
        <div>
          <p className="text-lg font-semibold">Available Storage</p>
          <p className="text-sm opacity-80">
            {convertFileSize(used)}/ {2} GB
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StorageUsageCard
