import {TFNode} from "../node";

export abstract class TFLayers extends TFNode {
	protected constructor(public name: string | undefined = undefined) {
		super(name, "Layers",undefined);
	}


	genericDenseLayerUI(widgetsData,widgetTypes,node,navbar){
		for(let i=0; i<widgetTypes.length;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		for(let i=0; i<widgetTypes.length;++i){
			if(widgetTypes[i]==="units" || widgetTypes[i]=="units?" || widgetTypes[i]=="groups"){
				node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
					if(this.checkIfInputIsPositiveInteger(value,widgetTypes[i]))
						this.changeWidgetValue(value,widgetTypes[i],navbar);
					else
						this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
				});
			}
			if(widgetTypes[i]=="activation" || widgetTypes[i]=="activation?"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
					},{values: ["'linear'","'elu'","'hardSigmoid'","'relu'","'relu6'","'selu'","'sigmoid'","'softmax'","'softplus'","'tanh'","'swish'","'mish'"]});
			}
			if(widgetTypes[i]=="use_bias" || widgetTypes[i]=="use_bias?"){
				node.addWidget("toggle",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				});
			}
			if(widgetTypes[i]=="kernel_initializer?" || widgetTypes[i]=="bias_initializer?"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				},{values: ["'constant'","'glorot_normal'","'glorot_uniform'","'he_Normal'","'he_Uniform'","'identity'","'leCunNormal'",'leCunUniform',"'ones'","'orthogonal'","'random_normal'","'random_uniform'","'truncated_normal'","'variance_scaling'","'zeros'","string"]});
			}
			if(widgetTypes[i]=="kernel_regularizer?" || widgetTypes[i]=="bias_regularizer?" || widgetTypes[i]=="activity_regularizer?"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				},{values: ["'l1l2'","string'","Regularizer"]});
			}
			if(widgetTypes[i]=="kernel_constraint?" || widgetTypes[i]=="bias_constraint?"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				},{values: ["'max_norm'","'min_max_norm'","'non_neg'","'unit_norm'","string"]});
			}
			if(widgetTypes[i]=="data_format?"){
				node.addWidget("text",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				});
			}
			if(widgetTypes[i]=="filters"){
				node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
					if(this.checkIfNumber(value))
						this.changeWidgetValue(value,widgetTypes[i],navbar);
					else
						this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
				});
			}
			if(widgetTypes[i]=="kernel_size" || widgetTypes[i]=="strides" || widgetTypes[i]=="dilation_rate"){
				node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
					if(this.checkIfNumber(value)||this.checkIfWidgetTypeIsAVectorArray(value,widgetTypes[i]))
						this.changeWidgetValue(value,widgetTypes[i],navbar);
					else
						this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
				});
			}
		}
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar);
		});

		console.log(node);
		console.log(this);

		for(let element of node.widgets){

			this.changeWidgetValue(element.value,element.name,navbar);
		}

	}

	checkIfInputIsPositiveInteger(value,type) :boolean{
		if(this.checkIfNumber(value)){
			let numberTest = +value;
			if(numberTest<0){
				if(type==="units"){
					alert("The units value needs to be a positive integer");
				}
				else if(type=="groups"){
					alert("The groups value needs to be a positive integer");
				}
				return false;
			}
		}
		return true;
	}

}
