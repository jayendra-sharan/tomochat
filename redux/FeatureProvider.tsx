import { createContext, useContext, useEffect, useState } from "react";
import featureFlagList from "@/config/features.production.json";

const FeatureFlagContext = createContext(featureFlagList);

export default function FeatureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FeatureFlagContext.Provider value={featureFlagList}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export const useFeatureFlag = () => useContext(FeatureFlagContext);
