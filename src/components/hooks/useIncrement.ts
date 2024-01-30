import { useState } from "react";

export function useIncrement(initial = 0) {
    const [state, setState] = useState(initial)
    const increment = () => {
        setState(v => v + 1);
    }
    const decrement = () => {
        setState(v => v - 1);
    }
    return [state, increment, decrement]
}