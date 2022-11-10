export const editPoint: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id: string = (e.currentTarget[1] as HTMLInputElement).value;
    const x: number =  Number( (e.currentTarget[2] as HTMLInputElement).value );
    const y: number =  Number( (e.currentTarget[3] as HTMLInputElement).value );
    //Send request to edit point
    console.log(`Requested to edit point  id: ${id} x: ${x} y: ${y}`);

    //Return value
    return {
    }
}

export const addPoint: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id: string = (e.currentTarget[0] as HTMLInputElement).value;
    const x: number =  Number( (e.currentTarget[1] as HTMLInputElement).value );
    const y: number =  Number( (e.currentTarget[2] as HTMLInputElement).value );
    //Send request to edit point
    console.log(`Requested to add point  id: ${id} x: ${x} y: ${y}`);


    //Return value
    return {
    }
}

export const removePoint: (id: string) => void = (id: string) => {
    //Send request to delete point
    console.log(`Requested ${id} to delete`);
}