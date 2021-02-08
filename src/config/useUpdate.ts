import { useState } from "react";

export function useUpdate() {
  const [updateValue, update] = useState(false);

  // Under certain circumstances, it may be necessary to pass
  // in a custom value to trigger the update
  return (custom?: any) => update(custom ?? !updateValue);
}
