import { theme } from '@styles/theme';
import React from 'react';
import './styles.css';

interface ISimpleItem {
    id: number;
    label: string;
    choosen: boolean;
    onChoose: () => void;
}

export const SimpleComponent: React.FC<ISimpleItem> = ({
    id,
    label,
    choosen,
    onChoose,
}) => {
    return (
        <div
            className={
                choosen
                    ? 'SimpleComponent SimpleComponentChoosen'
                    : 'SimpleComponent'
            }
            tabIndex={id}
            onClick={onChoose}
        >
            {label}
        </div>
    );
};
