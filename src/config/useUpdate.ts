import { useState } from "react";

export function useUpdate() {
  const [updateValue, update] = useState(false);

  return () => update(!updateValue);
}
