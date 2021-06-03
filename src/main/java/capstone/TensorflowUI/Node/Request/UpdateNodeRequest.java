package capstone.TensorflowUI.Node.Request;

import capstone.TensorflowUI.Node.Model.Node;

import java.util.ArrayList;
import java.util.UUID;

public class UpdateNodeRequest {
    private Node node;

    public UpdateNodeRequest(Node node){
        this.node = node;
    }

    public void addToList(Node node) {
        this.node.addNode(node);
    }

    public void removeFromList(Node node) {
        this.node.removeNode(node);
    }

    public void updateInput(Node input){
        this.node.setInput(input);
    }

    public void updateOutput(Node output){
        this.node.setOutput(output);
    }

    public Node getNode() {
        return node;
    }

}
