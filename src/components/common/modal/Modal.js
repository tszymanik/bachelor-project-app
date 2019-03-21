import React, { Component } from 'react';
import Backdrop from './Backdrop';

class Modal extends Component {
  componentWillMount() {
    document.body.classList.add('modal-open');
  }

  componentWillUnmount() {
    document.body.classList.remove('modal-open');
  }

  render() {
    return (
      <div>
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{this.props.children}</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.hide}>Zamknij</button>
                <button type="button" className="btn btn-primary" onClick={this.props.confirm}>Potwierdź</button>
              </div>
            </div>
          </div>
        </div>
        <Backdrop hide={this.props.hide} />
      </div>
    );
  }
}

export default Modal;
