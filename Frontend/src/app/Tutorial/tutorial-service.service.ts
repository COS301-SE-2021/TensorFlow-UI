import { Injectable } from '@angular/core';
import {TFModel} from "../tf/model/creation/model";
import {TFTensor} from "../tf/tensor/tensor";
import {TFNode, TFTensorOneD} from "../tf";
import {TFKerasLayerDense} from "../tf/layer/layer_dense";
import {AddNodeCommand} from "../../Command/AddNodeCommand";
import {Store} from "@ngxs/store";
import {TFDense} from "../tf/layers/basic/dense";
import {CodeGeneratorService} from "../code-generator.service";
import {lineConnectors} from "../node-data";
import {TutorialModalMaterialComponent} from "./tutorial-modal-material/tutorial-modal-material/tutorial-modal-material.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class TutorialServiceService {
  private tutorialDialogMat: TutorialModalMaterialComponent;

  constructor(public dialog: MatDialog) {}

  openDialog(text : string) {
    const dialogRef = this.dialog.open(TutorialModalMaterialComponent, {
      data: {tutorialText : text}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  runTutorial(store : Store, head : TFNode, nodes : TFNode[], lines : lineConnectors[], url : string) {
    this.openDialog(
      "Welcome to TensorFlow UI! We hope you enjoy using our program.\n\n" +
      "This tutorial is designed to walk you through the creation and training of a basic prediction model, predicting" +
      " the effect different marketing budgets will spend on the number of subscribers gained."
    );

    this.openDialog(
      "First, we have to create our data points! " +
      "In this case, we'll have an array of numbers representing subscribers gained, and a second array indicating the" +
      " marketing budget which created the corresponding gain."
    );

    // arrays made for temporary use and reference:
    var featuresTrain : number[] = new Array();
    var labelsTrain : number[] = new Array();
    var featuresTest : number[] = new Array();
    var labelsTest : number[] = new Array();

    featuresTrain.push(60,100,50,90);
    labelsTrain.push(160, 240, 140, 220);

    featuresTest.push(80,30,20,10);
    labelsTest.push(200, 100, 80, 60);

    // TODO: creation of data nodes which represent said arrays
    var tfTrainFeatures : TFTensor = new TFTensorOneD(featuresTrain);
    var tfTrainLabels : TFTensor = new TFTensorOneD(labelsTrain);
    var tfTestFeatures : TFTensor = new TFTensorOneD(featuresTest);
    var tfTestLabels : TFTensor = new TFTensorOneD(labelsTest);

    var addNode : AddNodeCommand = new AddNodeCommand(store);
    addNode.execute();

    this.openDialog(
      "We'll specifically need to create a training and a testing set - the two will exist as" +
      " two separate arrays."
    );

    this.openDialog(
      "Now for the real machine learning work!\n" +
      "We're going to use the simplest model we can, for our simple use-case: " +
      "a Dense network, with only one layer and only one neuron. More complex problems will require more layers and neurons."
    );

    //TODO: create layer node using command
    var kerasLayer = new TFDense(1, "");

    var addNode : AddNodeCommand = new AddNodeCommand(store);
    addNode.execute();

    // TODO: create model node using command
    var tfModel : TFModel= new TFModel("basicModel", kerasLayer);

    var addNode : AddNodeCommand = new AddNodeCommand(store);
    addNode.execute();

    this.openDialog(
      "We now have to compile the model, with loss (i.e. accuracy) and optimizer" +
      " (i.e. improvement) functions." +
      "These can be set in the node itself."
    );

    this.openDialog("Model training is done automatically when you run the code.");

    this.openDialog("And now for some predictions - the useful part of the model we've built.");

    const codegen : CodeGeneratorService = new CodeGeneratorService(store);
    codegen.generateFile(head);
    codegen.runFile(head, nodes, lines, url);
  }
}
