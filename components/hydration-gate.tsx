"use client";

import { useEffect } from "react";
import { useBuilder } from "@/lib/store";

/**
 * Triggers persisted-store rehydration once on the client.
 * Because the store uses skipHydration, nothing reads localStorage until this
 * runs in an effect — keeping the first client render identical to the SSR
 * output (items: []) and avoiding a hydration mismatch.
 */
export function HydrationGate() {
  useEffect(() => {
    useBuilder.persist.rehydrate();
  }, []);
  return null;
}
