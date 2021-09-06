import { Injectable } from '@angular/core';
import {TutorialModalComponent} from "./tutorial-modal/tutorial-modal.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TutorialServiceService {
  constructor(modalService: NgbModal) {
    this.modalService = modalService;
    this.tutorialModal = new TutorialModalComponent(this.modalService);
  }

  modalService : NgbModal;
  tutorialModal : TutorialModalComponent;

  runTutorial() {
    this.tutorialModal.setText("Welcome to TensorFlow UI! We hope you enjoy using our program.\n\n" +
      "This tutorial is designed to walk you through the creation and training of a basic prediction model, predicting the effect different marketing budgets will spend on ");
    this.tutorialModal.open(this.modalService);

    this.tutorialModal.setText("First, we have to create our data points! " +
      "In this case, we'll have an array of numbers representing subscribers gained, and a second array indicating the marketing budget which created the corresponding gain.");
    this.tutorialModal.open(this.modalService);

    // arrays made for temporary use and reference:
    var featuresTrain : Number[] = new Array();
    var labelsTrain : Number[] = new Array();
    var featuresTest : Number[] = new Array();
    var labelsTest : Number[] = new Array();

    featuresTrain.push(60,100,50,90);
    labelsTrain.push(160, 240, 140, 220);

    featuresTest.push(80,30,20,10);
    labelsTest.push(200, 100, 80, 60);

    // TODO: creation of data nodes which represent said arrays

    this.tutorialModal.setText("We'll specifically need to create a training and a testing set - the two will exist as two separate arrays.");
    this.tutorialModal.open(this.modalService);

    this.tutorialModal.setText("Now for the real machine learning work!\n" +
      "We're going to use the simplest model we can, for our simple use-case: " +
      "a Dense network, with only one layer and only one neuron. More complex problems will require more layers and neurons.");
    this.tutorialModal.open(this.modalService);

    // TODO: create model node

    this.tutorialModal.setText("We now have to compile the model, with loss (i.e. accuracy) and optimizer (i.e. improvement) functions.");
    this.tutorialModal.open(this.modalService);

    this.tutorialModal.setText("Time to train the model!");
    this.tutorialModal.open(this.modalService);

    this.tutorialModal.setText("And now for some predictions - the useful part of the model we've built.")
    this.tutorialModal.open(this.modalService);
  }
}
