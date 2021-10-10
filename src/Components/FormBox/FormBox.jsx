import './FormBox.css';

function FormBox() {
  return (
    <div className="form-box" onSubmit>
        <h1>Formulário</h1>
        <form className="textbox">
            <input type="text" placeholder="Nome" name="name" value="" />
            <input type="text" placeholder="Email" name="email" value="" />
            <input type="text" placeholder="Idade" name="age" value="" />
            <input type="text" placeholder="CEP" name="zipCode" value="" />
            <input type="text" placeholder="Endereço" name="address" value="" />
            <input type="text" placeholder="Complemento" name="complements" value="" />
        </form>

        <button 
        type="submit"
        className="btn"
        value="Salvar">
            Salvar
        </button>{/*onClick={this.handleClick}*/}
    </div>

  );
}

export default FormBox;