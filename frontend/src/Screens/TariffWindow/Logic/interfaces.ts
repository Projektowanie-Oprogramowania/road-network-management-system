export const VehicleType = ['PASSENGER', 'TRUCK'];
export const VehicleTypeTranslate: { [key: string]: string } = {
    PASSENGER: 'samochód osobowy',
    TRUCK: 'ciężarówka',
};

export interface Terifficator {
    id: string;
    name: string;
    pricesPerKilometer: {
        [key: string]: number;
    };
}

export interface TerifficatorFormDTO {
    name: string;
    pricesPerKilometer: {
        [key: string]: number;
    };
}
