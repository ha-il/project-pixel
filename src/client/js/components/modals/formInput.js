const formInput = (prop) => {
  return `
    <div class="form-input">
      <label for=${prop.id}>${prop.labelText}</label>
      <input id=${prop.id} name=${prop.name} type=${prop.type} placeholder=${
    prop.placeholder
  } required>
      ${prop.infoSpan ? `<span>${prop.infoSpan}</span>` : ""}
    </div>
  `;
};

export default formInput;
