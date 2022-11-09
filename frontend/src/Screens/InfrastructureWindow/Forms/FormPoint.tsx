import React from "react";

export const FormPoint = (props: {onSubmit: React.FormEventHandler<HTMLFormElement>}) => {
    return (
        <form onSubmit={props.onSubmit}>        
            <label>id<input type='text' /></label>
            <label>x<input type='number' /></label>
            <label>y<input type='number' /></label>
        <input type="submit" value="Submit" />
      </form>
    )
  };