package capstone.TensorflowUI.Node.Response;

import capstone.TensorflowUI.Node.Model.Node;

public class CreateNodeResponse {
    private final Node node;

    public CreateNodeResponse(Node node_) {
        this.node = node_;
        this.node.setInput("Null");
        this.node.setOutput("Null");
        this.node.setAction("[]");
        this.node.setNodeData("[]");
        this.node.setType("Something");
    }

    public Node getNode() {
        return node;
    }
}
