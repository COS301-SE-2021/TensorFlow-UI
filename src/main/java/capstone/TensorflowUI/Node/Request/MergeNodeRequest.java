package capstone.TensorflowUI.Node.Request;

import capstone.TensorflowUI.Node.Model.Node;

public class MergeNodeRequest {
    private Node baseNode;
    private Node secondaryNode;

    public MergeNodeRequest(Node baseNode, Node secondaryNode) {
        this.baseNode = baseNode;
        this.secondaryNode = secondaryNode;
    }

    public Node getBaseNode() {
        return baseNode;
    }

    public Node getSecondaryNode() {
        return secondaryNode;
    }
}
