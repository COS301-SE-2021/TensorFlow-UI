package capstone.TensorflowUI.Node.Response;

import capstone.TensorflowUI.Node.Model.Node;

public class UpdateNodeResponse {
    private Node node;

    public UpdateNodeResponse(Node node) {
        this.node = node;
    }

    public Node getNode() {
        return node;
    }
}
