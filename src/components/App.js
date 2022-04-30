import React, { Component } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";

class App extends Component {

  state = {
    inputValue: '',
    modalImg: '',
    showModal: false,
  }

  getInputValue = inputValue => {
    this.setState({ inputValue: inputValue })
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }))
  }

  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  }

  render() {
    const { modalImg, showModal } = this.state;

    return (
      <>
        <Searchbar onSearch={this.getInputValue} />
        <ImageGallery inputValue={this.state.inputValue} onClick={this.getLargeImg} />
        {showModal && <Modal url={modalImg} onClose={this.toggleModal} />}
      </>
    )
  }
}

export default App;
