import { useState } from "react";

const useCounter = (initialCount = 1) => {

    const [count, setCount] = useState(initialCount);


    const increase = () => {
        setCount(prevCount => prevCount+1);
    };

    const decrease = () => {

        if (count > 1) setCount(prevCount => prevCount -1);
    };

    return {count,increase,decrease};
};

export default useCounter;