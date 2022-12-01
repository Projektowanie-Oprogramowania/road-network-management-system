import React from 'react';

interface IExternalPayment {
    onSuccess: () => void;
    onFailure: () => void;
    onAbort: () => void;
}

export const MockExternalPayment: React.FC<IExternalPayment> = () => (
    <div>Opłaty</div>
);
