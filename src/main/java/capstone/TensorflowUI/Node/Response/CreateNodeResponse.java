package capstone.TensorflowUI.Node.Response;

import capstone.TensorflowUI.Node.Model.Node;

public class CreateNodeResponse {
    private Node node;

    public CreateNodeResponse(Node node_) {
        this.node = node_;
    }

    public Node getNode() {
        return node;
    }
}
