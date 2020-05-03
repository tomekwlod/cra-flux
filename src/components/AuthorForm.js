import React from "react";
import TextInput from "./common/TextInput";

function AuthorForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Name"
        onChange={props.onChange}
        name="name"
        value={props.author.name}
        error={props.errors.name}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

export default AuthorForm;