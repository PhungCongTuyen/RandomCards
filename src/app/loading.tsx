"use client";

import { Progress } from "@/components/ui/progress";
import React from "react";

export interface Loading {
  progress: number;
}

export default function Loading({ progress }: Loading) {
  return <Progress value={progress} className="absolute bottom-0" />;
}
