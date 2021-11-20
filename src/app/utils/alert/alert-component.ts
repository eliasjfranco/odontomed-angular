import { Component } from "@angular/core";

@Component({
    selector: 'dynamic',
    template: `<div class="modal fade show" style="display: block">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class=" modal-tittle">Turno</h5>
                            </div>
                            <div class="modal-body">Agendado con exito! <br><br>Se le enviará la información por correo.</div>
                        </div>
                    </div>`,
    styles:[`.modal{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1055;
        display: none;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        outline: 0;
    }
    .modal-tittle{
        text-align: center;
    }
    .fade{
        transition: opacity .15s linear;
    }
    .modal-dialog-centered{
        display: flex;
        align-items: center;
    }
    .modal-show .modal-dialog{
        transform: none;
    }
    .modal-content{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 0.3rem;
        outline: 0;
    }
    .modal-dialog{
        position: relative;
        width: auto;
        margin: auto;
        pointer-events: none;
    }
    .modal-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1rem;
        border-bottom: 1px solid #dee2e6;
        border-top-left-radius: calc(0.3rem - 1px);
        border-top-right-radius: calc(0.3rem - 1px);
        background-color: aliceblu;
    }
    .modal-body{
        position: relative;
        flex: 1 1 auto;
        padding: 1rem;
    }
    .modal-footer{
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 0;
        align-items: center;
        justify-content: flex-end;
        padding: 0.75rem;
        border-top: 1px solid #dee2e6;
        border-top-left-radius: calc(0.3rem - 1px);
        border-top-right-radius: calc(0.3rem - 1px);
    }`]
})
export class AlertComponent {
}
