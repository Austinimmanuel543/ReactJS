import { useState } from 'react';
const useErrorField = () => {
    const [error, setError] = useState('')
    const handleError = (err) => {
        setError(err);
    }
    return [error, handleError];
}

export default useErrorField