import React from "react";

interface IForm {
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
    fields: Array<{
        name: string,
        type: string,
    }>
}

export const FormComponent = (props: IForm) => {
    return (
        <form onSubmit={props.onSubmit}>        
        {props.fields.map((v)=> 
            <>
            <label style={{margin: 5}}>
                {v.name}
                <input type={v.type} style={{margin: 5}}/>
            </label>
            </>
        )}
        <input type="submit" value="Submit" />
      </form>
    )
  };