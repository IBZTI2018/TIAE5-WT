import React, { Component } from 'react';

class RegisterForm extends Component {
    render() {
        return (
            <div>
                <form>
                <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <select class="custom-select">
                            <option selected="" value="1">Herr</option>
                            <option value="2">Frau</option>
                        </select>
                    </div>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="Vorname" type="text" />
                    </div>
                    
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="Nachname" type="text" />
                    </div>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="E-Mail" type="email" />
                    </div>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="Adresse" type="text" />
                        <input name="" class="form-control" placeholder="Hausnummer" type="number" />
                    </div>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="PLZ" type="number" />
                        <input name="" class="form-control" placeholder="Ort" type="text" />
                        <select class="custom-select">
                            <option selected="" value="CH">Schweiz</option>
                            <option value="FL">Liechtenstein</option>
                            <option value="DE">Deutschland</option>
                            <option value="AT">Österreich</option>
                        </select>
                    </div>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input class="form-control" placeholder="Passwort" type="password" />
                    </div>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input class="form-control" placeholder="Passwort wiederholen" type="password" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">Konto erstellen</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterForm;