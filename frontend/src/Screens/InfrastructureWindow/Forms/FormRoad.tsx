import React from "react";

interface IForm {
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
    fields: Array<{
        name: string,
        type: string,
    }>
}

export const FormRoad = (props: IForm) => {
    return (
        <form onSubmit={props.onSubmit}>        
        {props.fields.map((v)=> 
            <label>
                {v.name}
                <input type={v.type} />
            </label>
        )}
        <input type="submit" value="Submit" />
      </form>
    )
  };