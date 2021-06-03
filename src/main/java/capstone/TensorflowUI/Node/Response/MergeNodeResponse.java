package capstone.TensorflowUI.Node.Response;

import capstone.TensorflowUI.Node.Model.Node;

public class MergeNodeResponse {
    private Node node;

    public MergeNodeResponse(Node node) {
        this.node = node;
    }

    public Node getNode() {
        return node;
    }
}
