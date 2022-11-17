import { theme } from '@styles/theme';
import React from 'react';
import './styles.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ISimpleItem {
    id: number;
    label: string;
    choosen: boolean;
    onChoose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export const SimpleComponent: React.FC<ISimpleItem> = ({
    id,
    label,
    choosen,
    onChoose,
    onEdit,
    onDelete,
}) => {
    return (
        <div
            className={
                choosen
                    ? 'SimpleComponent SimpleComponentChoosen'
                    : 'SimpleComponent'
            }
            style={{ display: 'flex', flexDirection: 'row' }}
            tabIndex={id}
        >
            <div style={{ width: 300 }} onClick={onChoose}>
                {label}
            </div>
            <EditIcon onClick={onEdit} />
            <DeleteIcon onClick={onDelete} color="error" />
        </div>
    );
};
